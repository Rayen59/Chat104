import React, { useState, useEffect, useRef } from "react";
import { ActiveCall, User, VoiceFilterType } from "../types";
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sliders,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Radio,
  Bot,
  Zap,
  PhoneCall
} from "lucide-react";
import { translations, getSavedLanguage, Language } from "../i18n";

interface CallOverlayProps {
  call: ActiveCall;
  currentUser: User;
  onEndCall: () => void;
}

interface VoicePreset {
  id: VoiceFilterType;
  label: string;
  desc: string;
  icon: string;
  color: string;
}

const VOICE_PRESETS: VoicePreset[] = [
  {
    id: "natural",
    label: "HD Natural Voice",
    desc: "Studio grade clarity & intelligent noise suppression",
    icon: "🎙️",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "robot",
    label: "Cyber Robot",
    desc: "Synthetic ring modulation & robotic harmonics",
    icon: "🤖",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "helium",
    label: "High Pitch / Helium",
    desc: "High-frequency formant boost & chipmunk harmonics",
    icon: "🎈",
    color: "from-amber-400 to-rose-400"
  },
  {
    id: "deep",
    label: "Deep Bass Voice",
    desc: "Deep sub-bass boost & cinematic presence",
    icon: "👹",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "radio",
    label: "Vintage Walkie-Talkie",
    desc: "Military bandpass radio filter & subtle grain",
    icon: "📻",
    color: "from-orange-500 to-amber-600"
  },
  {
    id: "echo",
    label: "Cosmic Echo",
    desc: "Atmospheric multi-tap delay & spatial ambience",
    icon: "🌌",
    color: "from-pink-500 to-purple-600"
  },
  {
    id: "anonymous",
    label: "Anonymous Modulator",
    desc: "Identity masking tremolo & mystery pitch shift",
    icon: "🕵️",
    color: "from-red-500 to-orange-600"
  },
  {
    id: "alien",
    label: "Alien Extraterrestrial",
    desc: "Dual-carrier frequency shift & sci-fi resonance",
    icon: "👽",
    color: "from-lime-400 to-emerald-600"
  },
  {
    id: "chipmunk",
    label: "Chipmunk Harmonic",
    desc: "Ultra-fast treble formant & cute harmonic peaking",
    icon: "🐿️",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "telephone",
    label: "Classic Phone Line",
    desc: "Authentic 300Hz-3.4kHz landline frequency filter",
    icon: "☎️",
    color: "from-slate-400 to-zinc-600"
  }
];

export const CallOverlay: React.FC<CallOverlayProps> = ({
  call,
  currentUser,
  onEndCall
}) => {
  const [lang, setLang] = useState<Language>(getSavedLanguage());
  const t = translations[lang] || translations.en;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(0);
  const [activeVoiceFilter, setActiveVoiceFilter] = useState<VoiceFilterType>(call.voiceFilter || "natural");
  const [showVoiceDrawer, setShowVoiceDrawer] = useState(false);
  const [isConnected, setIsConnected] = useState(call.status === "connected");
  const [remoteSpeaking, setRemoteSpeaking] = useState(false);
  const [localSpeaking, setLocalSpeaking] = useState(false);
  const [peerVoiceFilter, setPeerVoiceFilter] = useState<VoiceFilterType>("natural");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Web Audio pipeline refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rawMicStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const localGainNodeRef = useRef<GainNode | null>(null);
  const localAnalyserRef = useRef<AnalyserNode | null>(null);
  const processedStreamDestRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const filterNodesRef = useRef<any[]>([]);
  const dialToneIntervalRef = useRef<any>(null);

  // WebRTC Peer Connection ref
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  const isCaller = call.callerId === currentUser.id;
  const otherName = isCaller ? call.targetName : call.callerName;
  const otherAvatar = isCaller ? "" : call.callerAvatar;
  const isAiCall = call.targetId === "user_mk_ai" || call.targetId === "user_wia_ai" || otherName.toLowerCase().includes("mk.ia");

  // Listen to language changes
  useEffect(() => {
    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };
    window.addEventListener("wavegram_lang_change", handleLangChange);
    return () => window.removeEventListener("wavegram_lang_change", handleLangChange);
  }, []);

  // Update connection status if call props change
  useEffect(() => {
    if (call.status === "connected") {
      setIsConnected(true);
    }
  }, [call.status]);

  // Outgoing dial tone when ringing (stops immediately when connected)
  useEffect(() => {
    if (call.status === "ringing" && isCaller && !isConnected) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        
        const playTone = () => {
          if (ctx.state === "suspended") ctx.resume();
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = "sine";
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(480, ctx.currentTime);

          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 1.2);
          osc2.stop(ctx.currentTime + 1.2);
        };

        playTone();
        dialToneIntervalRef.current = setInterval(playTone, 3200);

        return () => {
          if (dialToneIntervalRef.current) clearInterval(dialToneIntervalRef.current);
          ctx.close().catch(() => {});
        };
      } catch (e) {
        console.warn("Dial tone notice:", e);
      }
    }
  }, [call.status, isCaller, isConnected]);

  // Setup Web Audio graph with DSP Voice Filters
  // IMPORTANT: Local microphone is routed ONLY to the processed stream destination (and Analyser for UI visualizer).
  // Local microphone is NEVER connected to ctx.destination, completely eliminating self-echo!
  const buildVoiceFilterGraph = (
    filter: VoiceFilterType,
    ctx: AudioContext,
    source: MediaStreamAudioSourceNode,
    mainGain: GainNode,
    analyser: AnalyserNode,
    streamDest: MediaStreamAudioDestinationNode
  ) => {
    try {
      // Disconnect and clean previous nodes
      filterNodesRef.current.forEach((n) => {
        try {
          n.disconnect();
          if (n.stop) n.stop();
        } catch (e) {}
      });
      filterNodesRef.current = [];

      source.disconnect();
      mainGain.disconnect();
      analyser.disconnect();

      let lastNode: AudioNode = source;

      if (filter === "natural") {
        // High-pass filter to eliminate low frequency rumble + dynamics compressor for studio clarity
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(90, ctx.currentTime);

        const comp = ctx.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-24, ctx.currentTime);
        comp.knee.setValueAtTime(25, ctx.currentTime);
        comp.ratio.setValueAtTime(4, ctx.currentTime);
        comp.attack.setValueAtTime(0.003, ctx.currentTime);
        comp.release.setValueAtTime(0.25, ctx.currentTime);

        lastNode.connect(hp);
        hp.connect(comp);
        lastNode = comp;
        filterNodesRef.current.push(hp, comp);
      } else if (filter === "robot") {
        // Cyberpunk Robot: Ring Modulation + Sawtooth Harmonic Carrier + Bandpass
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(65, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.7, ctx.currentTime);

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.setValueAtTime(1150, ctx.currentTime);
        bandpass.Q.setValueAtTime(3.5, ctx.currentTime);

        osc.connect(oscGain.gain);
        lastNode.connect(oscGain);
        oscGain.connect(bandpass);
        osc.start();

        lastNode = bandpass;
        filterNodesRef.current.push(osc, oscGain, bandpass);
      } else if (filter === "helium") {
        // High Pitch / Helium: Resonant high peaking filter & treble shelf boost
        const highShelf = ctx.createBiquadFilter();
        highShelf.type = "highshelf";
        highShelf.frequency.setValueAtTime(2000, ctx.currentTime);
        highShelf.gain.setValueAtTime(15, ctx.currentTime);

        const peak = ctx.createBiquadFilter();
        peak.type = "peaking";
        peak.frequency.setValueAtTime(3400, ctx.currentTime);
        peak.Q.setValueAtTime(4.5, ctx.currentTime);
        peak.gain.setValueAtTime(14, ctx.currentTime);

        lastNode.connect(highShelf);
        highShelf.connect(peak);
        lastNode = peak;
        filterNodesRef.current.push(highShelf, peak);
      } else if (filter === "deep") {
        // Deep Monster / Cinematic Bass: Low-shelf sub-bass boost + low-pass filter
        const lowShelf = ctx.createBiquadFilter();
        lowShelf.type = "lowshelf";
        lowShelf.frequency.setValueAtTime(160, ctx.currentTime);
        lowShelf.gain.setValueAtTime(16, ctx.currentTime);

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.setValueAtTime(850, ctx.currentTime);

        lastNode.connect(lowShelf);
        lowShelf.connect(lowpass);
        lastNode = lowpass;
        filterNodesRef.current.push(lowShelf, lowpass);
      } else if (filter === "radio") {
        // Walkie-Talkie Radio: Narrow bandpass 650Hz - 2800Hz with harmonic drive
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(650, ctx.currentTime);

        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(2800, ctx.currentTime);

        lastNode.connect(hp);
        hp.connect(lp);
        lastNode = lp;
        filterNodesRef.current.push(hp, lp);
      } else if (filter === "echo") {
        // Cosmic Echo: Multi-tap spatial delay line
        const delay = ctx.createDelay();
        delay.delayTime.setValueAtTime(0.26, ctx.currentTime);

        const feedback = ctx.createGain();
        feedback.gain.setValueAtTime(0.42, ctx.currentTime);

        const merger = ctx.createGain();

        lastNode.connect(merger);
        lastNode.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(merger);

        lastNode = merger;
        filterNodesRef.current.push(delay, feedback, merger);
      } else if (filter === "anonymous") {
        // Anonymous: Tremolo LFO modulation with phase detuning
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(8.5, ctx.currentTime);

        const tremGain = ctx.createGain();
        tremGain.gain.setValueAtTime(0.5, ctx.currentTime);

        lfo.connect(tremGain.gain);
        lastNode.connect(tremGain);
        lfo.start();

        lastNode = tremGain;
        filterNodesRef.current.push(lfo, tremGain);
      } else if (filter === "alien") {
        // Alien: Dual sinusoidal ring mod
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.65, ctx.currentTime);

        const peak = ctx.createBiquadFilter();
        peak.type = "peaking";
        peak.frequency.setValueAtTime(1800, ctx.currentTime);
        peak.gain.setValueAtTime(8, ctx.currentTime);

        osc.connect(oscGain.gain);
        lastNode.connect(oscGain);
        oscGain.connect(peak);
        osc.start();

        lastNode = peak;
        filterNodesRef.current.push(osc, oscGain, peak);
      } else if (filter === "chipmunk") {
        // Chipmunk: Extreme high frequency formant
        const peak1 = ctx.createBiquadFilter();
        peak1.type = "peaking";
        peak1.frequency.setValueAtTime(2800, ctx.currentTime);
        peak1.Q.setValueAtTime(5, ctx.currentTime);
        peak1.gain.setValueAtTime(18, ctx.currentTime);

        const highpass = ctx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.setValueAtTime(450, ctx.currentTime);

        lastNode.connect(highpass);
        highpass.connect(peak1);
        lastNode = peak1;
        filterNodesRef.current.push(highpass, peak1);
      } else if (filter === "telephone") {
        // ITU-T G.711 300Hz - 3400Hz Telephone standard
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(300, ctx.currentTime);

        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(3400, ctx.currentTime);

        lastNode.connect(hp);
        hp.connect(lp);
        lastNode = lp;
        filterNodesRef.current.push(hp, lp);
      }

      // Connect to gain -> analyser -> stream destination
      lastNode.connect(mainGain);
      mainGain.connect(analyser);
      mainGain.connect(streamDest);

      // NOTICE: We do NOT connect to ctx.destination here!
      // This prevents the caller from hearing their own voice (zero echo).
    } catch (err) {
      console.warn("Voice filter DSP setup note:", err);
    }
  };

  // Main Media & WebRTC Pipeline Initialization
  useEffect(() => {
    let isMounted = true;

    async function initCall() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          },
          video: call.type === "video" && !isVideoOff
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        rawMicStreamRef.current = stream;

        // Local video element attachment
        if (call.type === "video" && localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Web Audio Context setup
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        sourceNodeRef.current = source;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(isMuted ? 0 : 1, ctx.currentTime);
        localGainNodeRef.current = gainNode;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;
        localAnalyserRef.current = analyser;

        const streamDest = ctx.createMediaStreamDestination();
        processedStreamDestRef.current = streamDest;

        // Apply selected DSP Voice Filter to outgoing stream
        buildVoiceFilterGraph(activeVoiceFilter, ctx, source, gainNode, analyser, streamDest);

        // WebRTC RTCPeerConnection Setup
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" }
          ]
        });
        peerConnectionRef.current = pc;

        // Add processed audio track to peer connection
        streamDest.stream.getAudioTracks().forEach((track) => {
          pc.addTrack(track, streamDest.stream);
        });

        // Add video track if video call
        if (call.type === "video") {
          stream.getVideoTracks().forEach((vTrack) => {
            pc.addTrack(vTrack, stream);
          });
        }

        // Handle remote incoming stream (User B's audio playing through User A's speaker!)
        pc.ontrack = (event) => {
          if (remoteAudioRef.current && event.streams[0]) {
            remoteAudioRef.current.srcObject = event.streams[0];
            remoteAudioRef.current.play().catch(() => {});
            setIsConnected(true);
          }
        };

        // ICE candidate exchange
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            fetch("/api/calls/signal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "webrtc_candidate",
                callId: call.id,
                callerId: currentUser.id,
                targetId: otherName,
                candidate: event.candidate
              })
            }).catch(() => {});
          }
        };

        // If this user initiated the call, create SDP offer
        if (isCaller) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          fetch("/api/calls/signal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "webrtc_offer",
              callId: call.id,
              callerId: currentUser.id,
              targetId: otherName,
              offer
            })
          }).catch(() => {});
        }

        // Cross-tab BroadcastChannel for instant local testing
        try {
          const channel = new BroadcastChannel(`wavegram_call_${call.id}`);
          broadcastChannelRef.current = channel;

          channel.onmessage = (e) => {
            if (e.data?.type === "speech_active") {
              if (e.data.userId !== currentUser.id) {
                setRemoteSpeaking(e.data.isSpeaking);
              }
            } else if (e.data?.type === "voice_filter_change") {
              if (e.data.userId !== currentUser.id) {
                setPeerVoiceFilter(e.data.filter);
              }
            }
          };
        } catch (e) {}

      } catch (err) {
        console.warn("Call media initialization note:", err);
      }
    }

    initCall();

    return () => {
      isMounted = false;
      if (rawMicStreamRef.current) {
        rawMicStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [call.id, call.type]);

  // WebRTC Signaling Listener via Server-Sent Events / EventSource
  useEffect(() => {
    const handleSseMessage = async (e: any) => {
      try {
        const raw = e.detail !== undefined ? e.detail : e.data;
        if (!raw) return;
        const data = typeof raw === "string" ? JSON.parse(raw) : raw;
        const pc = peerConnectionRef.current;
        if (!pc) return;

        if (data.type === "webrtc_offer" && data.callId === call.id && data.callerId !== currentUser.id) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          fetch("/api/calls/signal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "webrtc_answer",
              callId: call.id,
              callerId: currentUser.id,
              targetId: data.callerId,
              answer
            })
          }).catch(() => {});
        } else if (data.type === "webrtc_answer" && data.callId === call.id && data.callerId !== currentUser.id) {
          if (pc.signalingState !== "stable") {
            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          }
        } else if (data.type === "webrtc_candidate" && data.callId === call.id && data.callerId !== currentUser.id) {
          if (data.candidate) {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(() => {});
          }
        } else if (data.type === "call_voice_filter" && data.callId === call.id) {
          setPeerVoiceFilter(data.voiceFilter);
        }
      } catch (err) {}
    };

    window.addEventListener("wavegram_sse_call_signal", handleSseMessage);
    return () => window.removeEventListener("wavegram_sse_call_signal", handleSseMessage);
  }, [call.id, currentUser.id]);

  // AI Conversational Voice (When calling MK.ia AI bot, AI speaks back in real audio!)
  useEffect(() => {
    if (!isAiCall || !isConnected) return;

    let aiSpeechTimeout: any = null;

    // AI Greets caller
    const greetingText = lang === "fr" 
      ? "Bonjour ! Je vous entends parfaitement sur Wavegram. Comment puis-je vous aider aujourd'hui ?"
      : "Hello! I can hear you crystal clear on Wavegram. How can I help you today?";

    aiSpeechTimeout = setTimeout(() => {
      speakAiResponse(greetingText);
    }, 1200);

    return () => {
      if (aiSpeechTimeout) clearTimeout(aiSpeechTimeout);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [isAiCall, isConnected, lang]);

  const speakAiResponse = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "fr" ? "fr-FR" : "en-US";
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => setRemoteSpeaking(true);
      utterance.onend = () => setRemoteSpeaking(false);
      utterance.onerror = () => setRemoteSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("AI Speech error:", e);
    }
  };

  // Change Voice Filter in real-time
  const handleSelectVoiceFilter = (filterId: VoiceFilterType) => {
    setActiveVoiceFilter(filterId);

    if (
      audioCtxRef.current &&
      sourceNodeRef.current &&
      localGainNodeRef.current &&
      localAnalyserRef.current &&
      processedStreamDestRef.current
    ) {
      buildVoiceFilterGraph(
        filterId,
        audioCtxRef.current,
        sourceNodeRef.current,
        localGainNodeRef.current,
        localAnalyserRef.current,
        processedStreamDestRef.current
      );
    }

    // Broadcast filter change to server & peer
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "voice_filter",
        callId: call.id,
        voiceFilter: filterId
      })
    }).catch(() => {});

    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage({
        type: "voice_filter_change",
        userId: currentUser.id,
        filter: filterId
      });
    }
  };

  // Mute / Unmute Microphone
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (localGainNodeRef.current && audioCtxRef.current) {
      localGainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : 1, audioCtxRef.current.currentTime);
    }
    if (rawMicStreamRef.current) {
      rawMicStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !nextMuted;
      });
    }
  };

  // Toggle Video Camera
  const handleToggleVideo = () => {
    const nextVideoOff = !isVideoOff;
    setIsVideoOff(nextVideoOff);
    if (rawMicStreamRef.current) {
      rawMicStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !nextVideoOff;
      });
    }
  };

  // Call duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time Canvas Waveform Visualizer & Voice Activity Detection (VAD)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let voiceSilenceCount = 0;

    const renderWave = () => {
      animationFrameRef.current = requestAnimationFrame(renderWave);
      const analyser = localAnalyserRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (!analyser || isMuted) {
        // Idle gentle waveform
        ctx.beginPath();
        ctx.strokeStyle = "rgba(51, 144, 236, 0.35)";
        ctx.lineWidth = 2;
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 6) {
          const y = height / 2 + Math.sin((x + Date.now() * 0.003) * 0.06) * 3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        setLocalSpeaking(false);
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // Voice Activity Detection
      let totalEnergy = 0;
      for (let i = 0; i < bufferLength; i++) {
        totalEnergy += dataArray[i];
      }
      const avgEnergy = totalEnergy / bufferLength;
      const isVoiceActive = avgEnergy > 18;

      if (isVoiceActive) {
        voiceSilenceCount = 0;
        setLocalSpeaking(true);
      } else {
        voiceSilenceCount++;
        if (voiceSilenceCount > 25) {
          setLocalSpeaking(false);
        }
      }

      const barWidth = (width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (height * 0.85);

        // Neon gradient corresponding to active voice filter
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        if (activeVoiceFilter === "robot") {
          gradient.addColorStop(0, "#10b981");
          gradient.addColorStop(1, "#34d399");
        } else if (activeVoiceFilter === "helium" || activeVoiceFilter === "chipmunk") {
          gradient.addColorStop(0, "#f59e0b");
          gradient.addColorStop(1, "#fb7185");
        } else if (activeVoiceFilter === "deep") {
          gradient.addColorStop(0, "#8b5cf6");
          gradient.addColorStop(1, "#ec4899");
        } else if (activeVoiceFilter === "radio" || activeVoiceFilter === "telephone") {
          gradient.addColorStop(0, "#f97316");
          gradient.addColorStop(1, "#eab308");
        } else if (activeVoiceFilter === "echo" || activeVoiceFilter === "alien") {
          gradient.addColorStop(0, "#ec4899");
          gradient.addColorStop(1, "#a855f7");
        } else {
          gradient.addColorStop(0, "#3390ec");
          gradient.addColorStop(1, "#38bdf8");
        }

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(51, 144, 236, 0.5)";

        // Centered mirror equalizer bars
        const yTop = height / 2 - barHeight / 2;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, yTop, Math.max(2, barWidth - 2), Math.max(4, barHeight), 3);
        } else {
          ctx.rect(x, yTop, barWidth - 2, barHeight);
        }
        ctx.fill();

        x += barWidth + 1;
      }
    };

    renderWave();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeVoiceFilter, isMuted]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const activePresetObj = VOICE_PRESETS.find((p) => p.id === activeVoiceFilter) || VOICE_PRESETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-4 text-white select-none animate-in fade-in duration-300">
      
      {/* Hidden remote audio element playing the other person's voice */}
      <audio ref={remoteAudioRef} autoPlay playsInline className="hidden" />

      <div className="w-full max-w-xl bg-[#17212b] border border-[#242f3d] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center p-5 sm:p-7 relative">
        
        {/* Top Status Header */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e1621] border border-[#242f3d] text-xs font-semibold">
            <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-[#42ab58] animate-pulse" : "bg-amber-400 animate-ping"}`} />
            <span className="text-slate-200">
              {isConnected ? t.connected : t.ringing}
            </span>
            <span className="text-[#3390ec] font-mono ml-2">{formatDuration(callDurationSeconds)}</span>
          </div>

          {/* Voice Filter Tag Button */}
          <button
            onClick={() => setShowVoiceDrawer(!showVoiceDrawer)}
            className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
              activeVoiceFilter !== "natural"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-cyan-300/40 text-white shadow-cyan-500/20 ring-1 ring-cyan-400/40"
                : "bg-[#0e1621] border-[#242f3d] text-slate-300 hover:bg-[#242f3d]"
            }`}
          >
            <span>{activePresetObj.icon}</span>
            <span className="truncate max-w-[130px]">
              {activePresetObj.label}
            </span>
            <Sliders className="w-3 h-3 ml-0.5 text-cyan-300" />
          </button>
        </div>

        {/* Main Center Stage */}
        <div className="my-2 flex flex-col items-center justify-center relative w-full h-64 sm:h-72 rounded-2xl bg-[#0e1621] border border-[#242f3d] overflow-hidden shadow-inner">
          {call.type === "video" && !isVideoOff ? (
            <div className="w-full h-full relative">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#17212b]/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white border border-white/10 shadow-lg">
                {currentUser.username || "You"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {/* Pulsing Avatar with Glow Wave */}
              <div className="relative">
                <div className={`w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#3390ec] to-cyan-400 shadow-[0_0_30px_rgba(51,144,236,0.45)] flex items-center justify-center transition-all ${
                  remoteSpeaking ? "scale-110 ring-4 ring-emerald-400 shadow-emerald-500/40 animate-pulse" : ""
                }`}>
                  <img
                    src={
                      otherAvatar ||
                      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(otherName)}`
                    }
                    alt={otherName}
                    className="w-full h-full rounded-full object-cover bg-[#242f3d]"
                  />
                </div>
                {isMuted && (
                  <div className="absolute bottom-0 right-0 bg-rose-600 p-1.5 rounded-full ring-2 ring-[#0e1621] shadow-md">
                    <MicOff className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">{otherName}</h3>
                
                {/* Real-time speech status indicators */}
                <div className="mt-1 flex items-center justify-center gap-2">
                  {remoteSpeaking ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 animate-pulse">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{otherName} is speaking...</span>
                    </span>
                  ) : localSpeaking && !isMuted ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1 animate-pulse">
                      <Mic className="w-3.5 h-3.5" />
                      <span>You are speaking</span>
                    </span>
                  ) : (
                    <p className="text-xs text-[#3390ec] font-medium flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      <span>{t.audioClarity}</span>
                    </p>
                  )}
                </div>

                {peerVoiceFilter !== "natural" && (
                  <div className="mt-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-400/30">
                      🎙️ Remote Voice Filter: {peerVoiceFilter}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Live Audio Visualizer Canvas */}
          <div className="absolute bottom-2 left-4 right-4 h-12 flex items-center justify-center pointer-events-none">
            <canvas ref={canvasRef} width={340} height={44} className="w-full h-full opacity-85" />
          </div>
        </div>

        {/* Voice Presets Drawer Popup */}
        {showVoiceDrawer && (
          <div className="w-full mt-3 p-3.5 rounded-2xl bg-[#0e1621] border border-[#3390ec]/30 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Sliders className="w-3.5 h-3.5" />
                <span>{t.voiceTransformer}</span>
              </div>
              <span className="text-[10px] text-slate-400">10 Studio FX Filters</span>
            </div>

            <p className="text-[11px] text-[#7d8b99] mb-3 leading-snug">
              {t.voiceTransformerDesc}
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
              {VOICE_PRESETS.map((preset) => {
                const isSelected = activeVoiceFilter === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectVoiceFilter(preset.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col gap-1 cursor-pointer active:scale-95 ${
                      isSelected
                        ? "bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border-cyan-400 shadow-md ring-1 ring-cyan-400/40"
                        : "bg-[#17212b] hover:bg-[#242f3d] border-[#242f3d]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base">{preset.icon}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-300" />}
                    </div>
                    <span className="text-xs font-bold text-white truncate">
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight line-clamp-2">
                      {preset.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Call Action Controls Bar */}
        <div className="flex items-center justify-center gap-4 mt-5">
          {/* Mute Mic Button */}
          <button
            onClick={handleToggleMute}
            className={`p-4 rounded-full transition-all shadow-lg active:scale-95 cursor-pointer ${
              isMuted
                ? "bg-rose-600 hover:bg-rose-500 text-white ring-2 ring-rose-400/50"
                : "bg-[#242f3d] hover:bg-[#2e3b4d] text-slate-100"
            }`}
            title={isMuted ? t.unmuteMicrophone : t.muteMicrophone}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Video Camera Button */}
          {call.type === "video" && (
            <button
              onClick={handleToggleVideo}
              className={`p-4 rounded-full transition-all shadow-lg active:scale-95 cursor-pointer ${
                isVideoOff
                  ? "bg-rose-600 hover:bg-rose-500 text-white ring-2 ring-rose-400/50"
                : "bg-[#242f3d] hover:bg-[#2e3b4d] text-slate-100"
              }`}
              title={isVideoOff ? t.turnOnCamera : t.turnOffCamera}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          {/* Voice Transformer Toggle Drawer */}
          <button
            onClick={() => setShowVoiceDrawer(!showVoiceDrawer)}
            className={`p-4 rounded-full transition-all shadow-lg active:scale-95 cursor-pointer ${
              showVoiceDrawer
                ? "bg-[#3390ec] text-white ring-2 ring-cyan-300"
                : "bg-[#242f3d] hover:bg-[#2e3b4d] text-cyan-300"
            }`}
            title={t.voiceTransformer}
          >
            <Sliders className="w-5 h-5" />
          </button>

          {/* End Call Button */}
          <button
            onClick={onEndCall}
            className="p-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl transition-transform active:scale-95 cursor-pointer ring-2 ring-rose-400/40"
            title={t.endCall}
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
