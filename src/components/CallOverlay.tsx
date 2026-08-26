import React, { useState, useEffect, useRef } from "react";
import { ActiveCall, User, VoiceFilterType } from "../types";
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  Volume2,
  VolumeX,
  Radio,
  Sliders,
  Check,
  Disc,
  Activity,
  Bot,
  Zap
} from "lucide-react";
import { translations, getSavedLanguage, Language } from "../i18n";

interface CallOverlayProps {
  call: ActiveCall;
  currentUser: User;
  onEndCall: () => void;
}

interface VoicePreset {
  id: VoiceFilterType;
  labelFr: string;
  labelEn: string;
  descFr: string;
  descEn: string;
  icon: string;
  color: string;
}

const VOICE_PRESETS: VoicePreset[] = [
  {
    id: "natural",
    labelFr: "Voix Naturelle HD",
    labelEn: "HD Natural Voice",
    descFr: "Audio studio purifié & clarté cristalline",
    descEn: "Crystal clear studio sound with noise suppression",
    icon: "🎙️",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "robot",
    labelFr: "Robot Cyberpunk",
    labelEn: "Cyberpunk Robot",
    descFr: "Modulation cybernétique & tonalité synthétique",
    descEn: "Synthetic ring modulation & robotic harmonics",
    icon: "🤖",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "helium",
    labelFr: "Hélium / Aiguë",
    labelEn: "High Pitch / Helium",
    descFr: "Formants ultra-aigus & dynamique perçante",
    descEn: "High-frequency formant boost & chipmunk harmonics",
    icon: "🎈",
    color: "from-amber-400 to-rose-400"
  },
  {
    id: "deep",
    labelFr: "Voix Grave / Basse",
    labelEn: "Deep Bass Voice",
    descFr: "Basses fréquences profondes & résonance imposante",
    descEn: "Deep sub-bass boost & cinematic presence",
    icon: "👹",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "radio",
    labelFr: "Talkie-Walkie",
    labelEn: "Vintage Radio",
    descFr: "Effet radiofréquence vintage & passe-bande",
    descEn: "Bandpass military radio filter & subtle grain",
    icon: "📻",
    color: "from-orange-500 to-amber-600"
  },
  {
    id: "echo",
    labelFr: "Écho Spatial",
    labelEn: "Cosmic Echo",
    descFr: "Réverbération immersive & délai multidirectionnel",
    descEn: "Atmospheric multi-tap delay & space ambience",
    icon: "🌌",
    color: "from-pink-500 to-purple-600"
  },
  {
    id: "anonymous",
    labelFr: "Voix Anonyme",
    labelEn: "Anonymous Modulator",
    descFr: "Tremolo mystérieux & altération d'identité",
    descEn: "Identity masking tremolo & mystery pitch shift",
    icon: "🕵️",
    color: "from-red-500 to-orange-600"
  }
];

export const CallOverlay: React.FC<CallOverlayProps> = ({
  call,
  currentUser,
  onEndCall
}) => {
  const [lang, setLang] = useState<Language>(getSavedLanguage());
  const t = translations[lang];

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(0);
  const [activeVoiceFilter, setActiveVoiceFilter] = useState<VoiceFilterType>(call.voiceFilter || "natural");
  const [showVoiceDrawer, setShowVoiceDrawer] = useState(false);
  const [monitorVoice, setMonitorVoice] = useState(false);
  const [isConnected, setIsConnected] = useState(call.status === "connected");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const monitorGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const filterNodesRef = useRef<any[]>([]);
  const dialToneIntervalRef = useRef<any>(null);

  const otherName = call.callerId === currentUser.id ? call.targetName : call.callerName;
  const otherAvatar = call.callerId === currentUser.id ? "" : call.callerAvatar;

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

  // Outgoing dial tone synthesis when ringing
  useEffect(() => {
    if (call.status === "ringing" && call.callerId === currentUser.id) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playBeep = () => {
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

        playBeep();
        dialToneIntervalRef.current = setInterval(playBeep, 3000);

        return () => {
          if (dialToneIntervalRef.current) clearInterval(dialToneIntervalRef.current);
          ctx.close().catch(() => {});
        };
      } catch (e) {
        console.error("Dial tone error", e);
      }
    }
  }, [call.status, call.callerId, currentUser.id]);

  // Main Audio & Video Pipeline Setup
  useEffect(() => {
    let active = true;

    async function initMediaAndAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          },
          video: call.type === "video" && !isVideoOff
        });

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        micStreamRef.current = stream;

        // Video attachment
        if (call.type === "video" && localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Web Audio Setup
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        sourceNodeRef.current = source;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(isMuted ? 0 : 1, ctx.currentTime);
        gainNodeRef.current = gainNode;

        const monitorGain = ctx.createGain();
        monitorGain.gain.setValueAtTime(monitorVoice ? 0.8 : 0, ctx.currentTime);
        monitorGainRef.current = monitorGain;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        applyVoiceProcessingGraph(activeVoiceFilter, ctx, source, gainNode, analyser, monitorGain);
      } catch (err) {
        console.warn("Microphone / Camera access note:", err);
      }
    }

    initMediaAndAudio();

    return () => {
      active = false;
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [call.type]);

  // Apply or rebuild the audio processing nodes according to the selected voice filter
  const applyVoiceProcessingGraph = (
    preset: VoiceFilterType,
    ctx: AudioContext,
    source: MediaStreamAudioSourceNode,
    mainGain: GainNode,
    analyser: AnalyserNode,
    monitorGain: GainNode
  ) => {
    try {
      // Disconnect previous filter nodes
      filterNodesRef.current.forEach((node) => {
        try {
          node.disconnect();
          if (node.stop) node.stop();
        } catch (e) {}
      });
      filterNodesRef.current = [];

      source.disconnect();
      mainGain.disconnect();
      analyser.disconnect();
      monitorGain.disconnect();

      let lastNode: AudioNode = source;

      if (preset === "natural") {
        // Natural HD: High-pass at 80Hz + Dynamics Compressor
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(80, ctx.currentTime);

        const comp = ctx.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-24, ctx.currentTime);
        comp.knee.setValueAtTime(30, ctx.currentTime);
        comp.ratio.setValueAtTime(4, ctx.currentTime);
        comp.attack.setValueAtTime(0.003, ctx.currentTime);
        comp.release.setValueAtTime(0.25, ctx.currentTime);

        lastNode.connect(hp);
        hp.connect(comp);
        lastNode = comp;
        filterNodesRef.current.push(hp, comp);
      } else if (preset === "robot") {
        // Robot: Ring modulator + Bandpass at 1200Hz
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(60, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.7, ctx.currentTime);

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.setValueAtTime(1200, ctx.currentTime);
        bandpass.Q.setValueAtTime(3, ctx.currentTime);

        osc.connect(oscGain.gain);
        lastNode.connect(oscGain);
        oscGain.connect(bandpass);
        osc.start();

        lastNode = bandpass;
        filterNodesRef.current.push(osc, oscGain, bandpass);
      } else if (preset === "helium") {
        // Helium / High Pitch: High-shelf boost + resonant peak at 2.5kHz
        const highShelf = ctx.createBiquadFilter();
        highShelf.type = "highshelf";
        highShelf.frequency.setValueAtTime(2200, ctx.currentTime);
        highShelf.gain.setValueAtTime(14, ctx.currentTime);

        const peaking = ctx.createBiquadFilter();
        peaking.type = "peaking";
        peaking.frequency.setValueAtTime(3200, ctx.currentTime);
        peaking.Q.setValueAtTime(4, ctx.currentTime);
        peaking.gain.setValueAtTime(12, ctx.currentTime);

        lastNode.connect(highShelf);
        highShelf.connect(peaking);
        lastNode = peaking;
        filterNodesRef.current.push(highShelf, peaking);
      } else if (preset === "deep") {
        // Deep Monster / Basse: Low-shelf boost + sub-bass boost + lowpass
        const lowShelf = ctx.createBiquadFilter();
        lowShelf.type = "lowshelf";
        lowShelf.frequency.setValueAtTime(180, ctx.currentTime);
        lowShelf.gain.setValueAtTime(15, ctx.currentTime);

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.setValueAtTime(950, ctx.currentTime);

        lastNode.connect(lowShelf);
        lowShelf.connect(lowpass);
        lastNode = lowpass;
        filterNodesRef.current.push(lowShelf, lowpass);
      } else if (preset === "radio") {
        // Walkie-Talkie / Vintage Radio: Bandpass 600-3000Hz + subtle waveshaper
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(600, ctx.currentTime);

        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(3000, ctx.currentTime);

        lastNode.connect(hp);
        hp.connect(lp);
        lastNode = lp;
        filterNodesRef.current.push(hp, lp);
      } else if (preset === "echo") {
        // Cosmic Echo: Delay node + feedback gain
        const delay = ctx.createDelay();
        delay.delayTime.setValueAtTime(0.28, ctx.currentTime);

        const feedback = ctx.createGain();
        feedback.gain.setValueAtTime(0.45, ctx.currentTime);

        const merger = ctx.createGain();

        lastNode.connect(merger);
        lastNode.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(merger);

        lastNode = merger;
        filterNodesRef.current.push(delay, feedback, merger);
      } else if (preset === "anonymous") {
        // Anonymous: Tremolo LFO modulation + Formant
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(8, ctx.currentTime);

        const tremGain = ctx.createGain();
        tremGain.gain.setValueAtTime(0.5, ctx.currentTime);

        lfo.connect(tremGain.gain);
        lastNode.connect(tremGain);
        lfo.start();

        lastNode = tremGain;
        filterNodesRef.current.push(lfo, tremGain);
      }

      // Connect to main gain -> analyser
      lastNode.connect(mainGain);
      mainGain.connect(analyser);

      // Connect to monitor gain -> destination (for loopback listening)
      mainGain.connect(monitorGain);
      monitorGain.connect(ctx.destination);
    } catch (e) {
      console.error("Audio filter graph error:", e);
    }
  };

  // Sync Voice Filter Selection
  const handleSelectVoiceFilter = (preset: VoiceFilterType) => {
    setActiveVoiceFilter(preset);
    if (audioCtxRef.current && sourceNodeRef.current && gainNodeRef.current && analyserRef.current && monitorGainRef.current) {
      applyVoiceProcessingGraph(
        preset,
        audioCtxRef.current,
        sourceNodeRef.current,
        gainNodeRef.current,
        analyserRef.current,
        monitorGainRef.current
      );
    }
    // Broadcast to backend
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "voice_filter",
        callId: call.id,
        voiceFilter: preset
      })
    }).catch(() => {});
  };

  // Handle Mute Toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : 1, audioCtxRef.current.currentTime);
    }
    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !nextMuted;
      });
    }
  };

  // Handle Monitor Voice Toggle
  const handleToggleMonitor = () => {
    const nextMonitor = !monitorVoice;
    setMonitorVoice(nextMonitor);
    if (monitorGainRef.current && audioCtxRef.current) {
      monitorGainRef.current.gain.setValueAtTime(nextMonitor ? 0.75 : 0, audioCtxRef.current.currentTime);
    }
  };

  // Handle Video Camera Toggle
  const handleToggleVideo = () => {
    const nextVideoOff = !isVideoOff;
    setIsVideoOff(nextVideoOff);
    if (micStreamRef.current) {
      micStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !nextVideoOff;
      });
    }
  };

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live Canvas Waveform / Audio Spectrum Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderWaveform = () => {
      animationFrameRef.current = requestAnimationFrame(renderWaveform);
      const analyser = analyserRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (!analyser || isMuted) {
        // Idle gentle wave
        ctx.beginPath();
        ctx.strokeStyle = "rgba(51, 144, 236, 0.3)";
        ctx.lineWidth = 2;
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 5) {
          const y = height / 2 + Math.sin((x + Date.now() * 0.003) * 0.05) * 4;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = (width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (height * 0.85);

        // Dynamic neon gradient based on active voice filter
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        if (activeVoiceFilter === "robot") {
          gradient.addColorStop(0, "#10b981");
          gradient.addColorStop(1, "#34d399");
        } else if (activeVoiceFilter === "helium") {
          gradient.addColorStop(0, "#f59e0b");
          gradient.addColorStop(1, "#fb7185");
        } else if (activeVoiceFilter === "deep") {
          gradient.addColorStop(0, "#8b5cf6");
          gradient.addColorStop(1, "#ec4899");
        } else if (activeVoiceFilter === "radio") {
          gradient.addColorStop(0, "#f97316");
          gradient.addColorStop(1, "#eab308");
        } else if (activeVoiceFilter === "echo") {
          gradient.addColorStop(0, "#ec4899");
          gradient.addColorStop(1, "#a855f7");
        } else {
          gradient.addColorStop(0, "#3390ec");
          gradient.addColorStop(1, "#38bdf8");
        }

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(51, 144, 236, 0.6)";

        // Centered mirror equalizer bars
        const yTop = height / 2 - barHeight / 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, yTop, Math.max(2, barWidth - 2), Math.max(4, barHeight), 3) : ctx.rect(x, yTop, barWidth - 2, barHeight);
        ctx.fill();

        x += barWidth + 1;
      }
    };

    renderWaveform();

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
      <div className="w-full max-w-xl bg-[#17212b] border border-[#242f3d] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center p-5 sm:p-7 relative">
        
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
              {lang === "fr" ? activePresetObj.labelFr : activePresetObj.labelEn}
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
                {currentUser.username || "Vous"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {/* Pulsing Avatar with Glow Wave */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#3390ec] to-cyan-400 shadow-[0_0_25px_rgba(51,144,236,0.4)] animate-pulse flex items-center justify-center">
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
                <p className="text-xs text-[#3390ec] mt-0.5 font-medium flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  <span>{t.audioClarity}</span>
                </p>
              </div>
            </div>
          )}

          {/* Live Audio Visualizer Canvas Banner */}
          <div className="absolute bottom-2 left-4 right-4 h-12 flex items-center justify-center pointer-events-none">
            <canvas ref={canvasRef} width={340} height={44} className="w-full h-full opacity-80" />
          </div>
        </div>

        {/* Voice Presets Drawer Modal Popup */}
        {showVoiceDrawer && (
          <div className="w-full mt-3 p-3.5 rounded-2xl bg-[#0e1621] border border-[#3390ec]/30 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Sliders className="w-3.5 h-3.5" />
                <span>{t.voiceTransformer}</span>
              </div>
              
              {/* Monitor Voice Loopback Button */}
              <button
                onClick={handleToggleMonitor}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  monitorVoice
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                    : "bg-[#17212b] text-slate-400 hover:text-white border border-[#242f3d]"
                }`}
                title={monitorVoice ? t.monitorVoiceOn : t.monitorVoiceOff}
              >
                {monitorVoice ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span>{t.monitorVoice}</span>
              </button>
            </div>

            <p className="text-[11px] text-[#7d8b99] mb-3 leading-snug">
              {t.voiceTransformerDesc}
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
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
                      {lang === "fr" ? preset.labelFr : preset.labelEn}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight line-clamp-2">
                      {lang === "fr" ? preset.descFr : preset.descEn}
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
