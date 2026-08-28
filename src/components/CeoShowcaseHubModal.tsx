import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Shield,
  ShieldCheck,
  Bot,
  Crown,
  Zap,
  Code2,
  Share2,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Award,
  Globe,
  Radio,
  Layers,
  Heart,
  MessageSquare,
  Users,
  Video,
  Lock,
  Palette,
  Image as ImageIcon,
  Flame,
  FileText,
  BarChart2,
  Terminal,
  Compass,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Eye
} from "lucide-react";
import { getSavedTheme, applyTheme } from "../theme";

interface CeoShowcaseHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CeoShowcaseHubModal: React.FC<CeoShowcaseHubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "ceo" | "features" | "talking_emojis" | "architecture" | "code_snippet">("overview");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTalkingEmoji, setActiveTalkingEmoji] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedFeatureCategory, setSelectedFeatureCategory] = useState<string>("all");

  const VISIT_URL = "https://chat104.onrender.com/";

  useEffect(() => {
    const currentTheme = getSavedTheme();
    setIsDarkMode(currentTheme !== "clean-light");

    const handleThemeChange = (e: any) => {
      if (e.detail?.id) {
        setIsDarkMode(e.detail.id !== "clean-light");
      }
    };
    window.addEventListener("wavegram_theme_change", handleThemeChange);
    return () => window.removeEventListener("wavegram_theme_change", handleThemeChange);
  }, [isOpen]);

  const toggleThemeMode = () => {
    if (isDarkMode) {
      applyTheme("clean-light");
      setIsDarkMode(false);
    } else {
      applyTheme("classic-blue");
      setIsDarkMode(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(VISIT_URL);
    setCopiedLink(true);
    playChime(880, 0.1);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Audio synthesizer for talking emojis and interactions
  const playChime = (freq: number = 520, duration: number = 0.15, type: OscillatorType = "sine") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  };

  // Talking Emojis Voice Generator using SpeechSynthesis + Sound FX
  const speakDialogue = (text: string, voicePitch: number = 1.0, voiceRate: number = 1.0) => {
    if (!soundEnabled) return;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      utterance.lang = "en-US";
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        playChime(440, 0.08, "triangle");
      };
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback sound modulation
      setIsSpeaking(true);
      playChime(600, 0.3, "sine");
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Big Talking Emojis data with black cap security officer, MK.ia robot, CEO crown, etc.
  const TALKING_EMOJIS = [
    {
      id: "security_officer",
      name: "Agent Black Cap",
      title: "Chief Security & Quantum Encryption Officer",
      tag: "SECURITY AGENT 👮‍♂️🧢🕶️",
      avatarEmoji: "👮‍♂️",
      accessoryEmoji: "🧢🕶️🛡️",
      bgGradient: "from-slate-900 via-gray-900 to-black",
      accentColor: "text-amber-400",
      borderColor: "border-amber-500/50",
      speechText: "Greetings! I am Officer Shield with my iconic black cap. At Chat104, every message is fortified with End-to-End Zero-Knowledge encryption and proactive anti-tampering guards. Your privacy and safety are impenetrable!",
      pitch: 0.85,
      rate: 0.95,
      securityPoints: [
        "Zero-Knowledge End-to-End Cryptography",
        "Ephemeral 24-hour self-destructing media",
        "Proactive anti-spam & harassment shielding",
        "Instant block, report & session revoke control"
      ]
    },
    {
      id: "mk_ia_assistant",
      name: "MK.ia Omni Intelligence",
      title: "Gemini 2.5 Multi-Intelligence Core",
      tag: "AI ASSISTANT 🤖⚡🧠",
      avatarEmoji: "🤖",
      accessoryEmoji: "⚡🔬✨",
      bgGradient: "from-cyan-950 via-blue-950 to-indigo-950",
      accentColor: "text-cyan-400",
      borderColor: "border-cyan-500/50",
      speechText: "Hello there! I am MK.ia, your ultra-fast Gemini 2.5 assistant built directly into Chat104. I write code, solve problems, summarize complex discussions, and even auto-reply when you are away!",
      pitch: 1.15,
      rate: 1.05,
      securityPoints: [
        "Deep Reasoning & Mathematical Analysis",
        "Context-Aware Automated Absence Responder",
        "Real-Time Multilingual Translation",
        "Voice, Image & Multimodal Comprehension"
      ]
    },
    {
      id: "ceo_crown",
      name: "Founder Royal Emblem",
      title: "Vision of CEO Med Rayen Bouazizi",
      tag: "EXECUTIVE FOUNDER 👑🚀💎",
      avatarEmoji: "👑",
      accessoryEmoji: "🌟💼✨",
      bgGradient: "from-amber-950 via-yellow-950 to-stone-950",
      accentColor: "text-yellow-400",
      borderColor: "border-yellow-500/50",
      speechText: "Welcome to Chat104, envisioned and engineered by CEO Med Rayen Bouazizi. We are building the world's most seamless, intelligent, and private communication ecosystem.",
      pitch: 1.0,
      rate: 0.98,
      securityPoints: [
        "Architected & Designed by Med Rayen Bouazizi",
        "High-Performance Cloud Infrastructure on Render",
        "Global Scalability & Ultra-Low Latency SSE",
        "100% Focused on User Delight and Power"
      ]
    },
    {
      id: "speed_rocket",
      name: "Hypersonic Sync Rocket",
      title: "Real-Time 45ms Engine",
      tag: "SPEED & REAL-TIME 🚀💨🔥",
      avatarEmoji: "🚀",
      accessoryEmoji: "💨🔥⚡",
      bgGradient: "from-rose-950 via-red-950 to-orange-950",
      accentColor: "text-orange-400",
      borderColor: "border-orange-500/50",
      speechText: "Blast off! Chat104 handles live typing broadcasts, instant read receipts, and real-time audio/video signaling at hypersonic speed across the globe.",
      pitch: 1.25,
      rate: 1.15,
      securityPoints: [
        "Server-Sent Events (SSE) Live Feed",
        "Sub-50ms message delivery guarantee",
        "Peer-to-Peer WebRTC High-Fidelity Streaming",
        "Adaptive network compression"
      ]
    }
  ];

  // Full feature matrix of Chat104
  const FEATURES = [
    {
      category: "messaging",
      title: "Ultra-Fast Live Messaging",
      icon: MessageSquare,
      desc: "Real-time communication with Markdown styling, voice audio notes, file sharing, replies, forwards, and inline media previews.",
      badge: "Core Engine"
    },
    {
      category: "ai",
      title: "MK.ia Deep Intelligence (Gemini 2.5)",
      icon: Bot,
      desc: "Instant conversational partner with 6 specialized modes (Deep Reasoning, Full-Stack Coder, Creative Writer, Summary Genius, Multilingual Translator, Executive Strategist).",
      badge: "AI Powered"
    },
    {
      category: "ai",
      title: "Smart AI Auto-Responder",
      icon: Sparkles,
      desc: "Customizable personal AI assistant that answers incoming direct messages when you are away or offline based on custom instructions.",
      badge: "Autonomous"
    },
    {
      category: "groups",
      title: "Supergroups & Broadcast Channels",
      icon: Users,
      desc: "Create communities with thousands of members, custom admin roles, permissions, announcement-only mode, and group media repositories.",
      badge: "Community"
    },
    {
      category: "calls",
      title: "HD Video & Voice Calls",
      icon: Video,
      desc: "Crystal-clear 1-on-1 and group voice/video conferencing with screen sharing, audio waveform visualizer, and end-to-end encryption.",
      badge: "WebRTC HD"
    },
    {
      category: "stories",
      title: "24h Stories & Status Updates",
      icon: Flame,
      desc: "Share ephemeral visual moments with custom text, glow filters, stickers, viewers tracking, and direct story replies.",
      badge: "Social"
    },
    {
      category: "creative",
      title: "Glow Doodle Studio & Replay",
      icon: Palette,
      desc: "Neon glow drawing canvas with dynamic particle brushes, stroke replay player, and instant sticker export.",
      badge: "Creative Lab"
    },
    {
      category: "creative",
      title: "GIF & Custom Sticker Studio",
      icon: ImageIcon,
      desc: "Integrated Giphy search, custom text sticker generator, emoji creator, and instant quick-reaction palette.",
      badge: "Media"
    },
    {
      category: "security",
      title: "E2E Quantum-Safe Encryption",
      icon: Lock,
      desc: "Client-side private cryptography, secret chats, auto-destruct timers, and zero-knowledge data transmission.",
      badge: "Security"
    },
    {
      category: "customization",
      title: "Multi-Theme & Typography Studio",
      icon: Sun,
      desc: "Instant Dark & Light mode toggle, 8+ hand-crafted color schemes (Cyberpunk, OLED, Midnight, Amber, Rose), and 6 custom pro fonts.",
      badge: "Aesthetics"
    },
    {
      category: "productivity",
      title: "Cloud Notes & Smart Bookmarks",
      icon: FileText,
      desc: "Personal encrypted scratchpad with color tagging, search, pinned notes, and quick transfer to any conversation.",
      badge: "Productivity"
    },
    {
      category: "analytics",
      title: "Analytics & Usage Insights",
      icon: BarChart2,
      desc: "Interactive dashboards displaying message velocity, peak activity hours, top emojis, media distribution, and storage metrics.",
      badge: "Insights"
    }
  ];

  const filteredFeatures = selectedFeatureCategory === "all"
    ? FEATURES
    : FEATURES.filter((f) => f.category === selectedFeatureCategory);

  // Full architecture & code representation string
  const ARCHITECTURE_CODE = `/**
 * =========================================================================
 * CHAT104 / MK WAVEGRAM - PRODUCTION ARCHITECTURAL SPECIFICATION
 * =========================================================================
 * @founder     : Med Rayen Bouazizi (CEO & Chief Architect)
 * @live_url    : https://chat104.onrender.com/
 * @version     : 4.5.0-Enterprise
 * @security    : Zero-Knowledge E2E Encryption + Officer Shield Black Cap
 * @intelligence: Gemini 2.5 Multi-Intelligence Engine (MK.ia)
 * =========================================================================
 */

export interface Chat104AppManifest {
  name: "Chat104 - MK Wavegram";
  founder: {
    name: "Med Rayen Bouazizi";
    title: "Founder & Chief Executive Officer (CEO)";
    email: "rayenbouazizi337@gmail.com";
    vision: "To create the fastest, most private, AI-augmented messenger on Earth.";
  };
  liveDeployment: "https://chat104.onrender.com/";
  architecture: {
    frontend: ["React 18", "TypeScript", "Tailwind CSS", "Lucide Icons", "Web Audio Synth"];
    backend: ["Node.js Express", "Server-Sent Events (SSE)", "WebRTC Signaling", "File Streams"];
    aiEngine: ["Google Gen AI SDK", "Gemini 2.5 Flash", "Deep Reasoning", "Auto-Responder"];
    themeEngine: ["Light / Dark Mode Switcher", "Dynamic CSS Variables", "Typography Customizer"];
    security: ["Black Cap Shield Agent", "E2E Message Encryption", "Session Revocation"];
  };
  features: [
    "Real-Time 1-on-1 & Supergroup Chats",
    "MK.ia Deep Reasoning AI Assistant ($MK, @MK.ia)",
    "Autonomous AI Absence Auto-Responder",
    "HD Video & Voice Calls with Screen Sharing",
    "24h Ephemeral Stories with Glow Doodles & Replay",
    "GIF & Custom Sticker Studio",
    "Encrypted Cloud Notes & Saved Messages",
    "Deep Conversation Analytics & Live Metrics",
    "Security Officer Agent 👮‍♂️🧢 with Black Cap Protections"
  ];
}

console.log("⚡ Chat104 initialized successfully under leadership of CEO Med Rayen Bouazizi!");
`;

  if (!isOpen) return null;

  return (
    <div
      id="ceo-showcase-hub-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className={`relative w-full max-w-5xl my-auto rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#0f172a] border-slate-700 text-slate-100 shadow-cyan-950/40"
            : "bg-slate-50 border-slate-200 text-slate-900 shadow-blue-900/10"
        }`}
      >
        {/* Top Header Bar */}
        <div
          className={`p-4 sm:p-6 border-b flex flex-wrap items-center justify-between gap-4 transition-colors ${
            isDarkMode ? "bg-slate-900/90 border-slate-800" : "bg-white/95 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/40">
              <Crown className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>Chat104</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black tracking-wider uppercase shadow-sm">
                    CEO Edition
                  </span>
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  v4.5 Live
                </span>
              </div>
              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Created & Directed by <span className="font-bold text-cyan-400">CEO Med Rayen Bouazizi</span>
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Dark / Light Mode Switcher */}
            <button
              id="showcase-theme-toggle-btn"
              onClick={toggleThemeMode}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700"
                  : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
              }`}
              title="Toggle Light / Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span className="hidden sm:inline">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              id="showcase-sound-toggle-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                soundEnabled
                  ? isDarkMode ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300" : "bg-blue-50 border-blue-200 text-blue-700"
                  : isDarkMode ? "bg-slate-800 border-slate-700 text-slate-500" : "bg-slate-100 border-slate-300 text-slate-400"
              }`}
              title={soundEnabled ? "Mute Emojis Voice" : "Enable Emojis Voice"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Direct Visit Button */}
            <a
              id="showcase-visit-btn"
              href={VISIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/30 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Modal */}
            <button
              id="showcase-close-btn"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isDarkMode ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-200 text-slate-600 hover:text-black"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`px-4 sm:px-6 py-2.5 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${
            isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-slate-100/80 border-slate-200"
          }`}
        >
          {[
            { id: "overview", label: "Overview & Showcase", icon: Sparkles },
            { id: "ceo", label: "CEO Med Rayen Bouazizi", icon: Crown },
            { id: "talking_emojis", label: "Talking Emojis & Security Officer", icon: ShieldCheck },
            { id: "features", label: "All Features Matrix", icon: Layers },
            { id: "architecture", label: "System Architecture", icon: Laptop },
            { id: "code_snippet", label: "Code Manifest", icon: Code2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => {
                  playChime(600, 0.05);
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40"
                    : isDarkMode
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* TAB 1: OVERVIEW & SHOWCASE */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Hero Banner */}
              <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 bg-gradient-to-br from-indigo-950 via-slate-900 to-black border border-cyan-500/30 text-white shadow-2xl">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                      <span>Next-Gen Enterprise Messenger</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                      Chat104 & MK Wavegram
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      The all-in-one ultra-fast messaging cloud equipped with <strong>MK.ia Gemini 2.5 Intelligence</strong>, <strong>Officer Shield Security 👮‍♂️🧢</strong>, real-time WebRTC audio/video calls, ephemeral stories, and autonomous AI responders.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={VISIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Open Live Web App</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 text-white font-bold text-sm transition-all cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                        <span>{copiedLink ? "Link Copied!" : "Copy Official Link"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Visit Card / QR Preview */}
                  <div className="w-full md:w-auto p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl flex flex-col items-center text-center space-y-3 shrink-0 backdrop-blur-md">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 shadow-lg ring-4 ring-yellow-400/30">
                      <Crown className="w-9 h-9" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Official Host URL</h4>
                      <p className="text-[11px] font-mono text-cyan-300 break-all max-w-[200px] mt-0.5">
                        chat104.onrender.com
                      </p>
                    </div>
                    <div className="w-full pt-2 border-t border-slate-800">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Live & Online 24/7
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO & Creator Highlight Card */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDarkMode
                    ? "bg-slate-900/80 border-slate-800 shadow-xl"
                    : "bg-white border-slate-200 shadow-lg"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white text-3xl font-black shadow-xl ring-4 ring-purple-500/30">
                      MR
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-amber-400 text-slate-950 shadow-md">
                      <Crown className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2 text-center md:text-left flex-1">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <h3 className="text-2xl font-black tracking-tight">Med Rayen Bouazizi</h3>
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-black uppercase">
                        Creator & CEO
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Chief Executive Officer, system visionary, and lead architect of <strong>Chat104 & MK Wavegram</strong>. Pioneering secure, AI-augmented, and ultra-scalable communication tools for the next generation of online collaboration.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                        ✉️ rayenbouazizi337@gmail.com
                      </span>
                      <button
                        onClick={() => setActiveTab("ceo")}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View CEO Biography & Vision</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Interactive Highlight Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold mb-1">Agent Black Cap Security 👮‍♂️</h4>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Zero-Knowledge E2E encryption, anti-spam sentry, self-destruct timers, and granular privacy controls designed for absolute peace of mind.
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold mb-1">MK.ia Gemini 2.5 Core 🤖</h4>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Integrated conversational intelligence, deep reasoning, code generation, multimodal analysis, and smart autonomous auto-responders.
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-3">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold mb-1">Glow Doodles & Stories 🎨</h4>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Neon canvas with particle brush physics, animated stroke replay player, 24-hour stories, stickers creator, and 8+ dynamic pro themes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CEO MED RAYEN BOUAZIZI */}
          {activeTab === "ceo" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Executive Profile Card */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-900 via-indigo-950/40 to-black border-slate-800 text-white"
                    : "bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Avatar & Badges */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl ring-4 ring-amber-400/40">
                        MRB
                      </div>
                      <div className="absolute -top-3 -right-3 p-2 rounded-2xl bg-amber-400 text-slate-950 shadow-xl ring-2 ring-white">
                        <Crown className="w-6 h-6 animate-bounce" />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="inline-block text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md">
                        FOUNDER & CEO
                      </span>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <h2 className="text-3xl font-black tracking-tight">Med Rayen Bouazizi</h2>
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                          VERIFIED CREATOR
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-cyan-400 mt-1">
                        Chief Executive Officer & Head of Engineering @ Chat104 / MK Wavegram
                      </p>
                    </div>

                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                      "My vision for Chat104 was born from a fundamental belief: communication should be lightning-fast, visually breathtaking, strictly secure, and empowered by next-generation artificial intelligence without compromising human intimacy or privacy."
                    </p>

                    {/* Highlights & Accolades */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className={`p-3 rounded-2xl border text-center ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-200"}`}>
                        <div className="text-lg font-black text-amber-400">100%</div>
                        <div className="text-[11px] font-medium text-slate-400">Architecture</div>
                      </div>
                      <div className={`p-3 rounded-2xl border text-center ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-200"}`}>
                        <div className="text-lg font-black text-cyan-400">&lt;45ms</div>
                        <div className="text-[11px] font-medium text-slate-400">Sync Latency</div>
                      </div>
                      <div className={`p-3 rounded-2xl border text-center ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-200"}`}>
                        <div className="text-lg font-black text-indigo-400">Gemini 2.5</div>
                        <div className="text-[11px] font-medium text-slate-400">Core AI Engine</div>
                      </div>
                      <div className={`p-3 rounded-2xl border text-center ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-200"}`}>
                        <div className="text-lg font-black text-emerald-400">24/7</div>
                        <div className="text-[11px] font-medium text-slate-400">Cloud Uptime</div>
                      </div>
                    </div>

                    {/* Official Contact & Links */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3 border-t border-slate-800">
                      <a
                        href="mailto:rayenbouazizi337@gmail.com"
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition-all"
                      >
                        <span>✉️ rayenbouazizi337@gmail.com</span>
                      </a>
                      <a
                        href={VISIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md flex items-center gap-1.5 transition-all"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Visit chat104.onrender.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO Masterplan & Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <h4 className="text-base font-bold flex items-center gap-2 text-cyan-400 mb-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>Core Philosophy of CEO Med Rayen Bouazizi</span>
                  </h4>
                  <ul className={`text-xs space-y-2.5 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Uncompromised Velocity</strong>: Zero lag UI with SSE broadcasting for instant feedback.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Autonomous Intelligence</strong>: MK.ia works alongside you, helping draft replies and providing deep reasoning.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Complete Privacy Sovereignty</strong>: Users own their communications with zero tracking and full export capability.</span>
                    </li>
                  </ul>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <h4 className="text-base font-bold flex items-center gap-2 text-indigo-400 mb-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>Global Deployment & Roadmap</span>
                  </h4>
                  <ul className={`text-xs space-y-2.5 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Render Cloud Cluster</strong>: Hosted 24/7 on robust Linux container infrastructure at chat104.onrender.com.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Global P2P Mesh</strong>: WebRTC direct data channels for ultra-low latency voice/video conferencing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Continuous Evolution</strong>: Frequent firmware and feature updates driven directly by community feedback.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TALKING BIG EMOJIS & BLACK CAP SECURITY OFFICER */}
          {activeTab === "talking_emojis" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black">
                  <span>Interactive Audio & Voice Dialogue 🔊</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight">Expressive Talking Big Emojis</h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Click on any talking emoji character below to trigger dynamic speech synthesis, animated visual states, and hear their security & system briefings!
                </p>
              </div>

              {/* Emoji Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TALKING_EMOJIS.map((char, idx) => {
                  const isSelected = activeTalkingEmoji === idx;
                  return (
                    <button
                      key={char.id}
                      id={`emoji-btn-${char.id}`}
                      onClick={() => {
                        setActiveTalkingEmoji(idx);
                        speakDialogue(char.speechText, char.pitch, char.rate);
                      }}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? `bg-gradient-to-b ${char.bgGradient} ${char.borderColor} shadow-xl scale-102 ring-2 ring-amber-400/50`
                          : isDarkMode
                          ? "bg-slate-900/60 border-slate-800 hover:bg-slate-800/80"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-4xl sm:text-5xl mb-2 filter drop-shadow-md">
                        {char.avatarEmoji}
                      </div>
                      <div className={`text-xs font-black truncate ${isSelected ? "text-white" : ""}`}>
                        {char.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {char.tag}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Character Stage */}
              {(() => {
                const current = TALKING_EMOJIS[activeTalkingEmoji];
                return (
                  <div
                    className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden bg-gradient-to-br ${current.bgGradient} ${current.borderColor} text-white shadow-2xl transition-all`}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Big Character Avatar */}
                      <div className="flex flex-col items-center space-y-3 shrink-0">
                        <div className="relative">
                          <div
                            className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-slate-950/80 border-2 ${current.borderColor} flex items-center justify-center shadow-2xl text-6xl sm:text-7xl select-none transition-transform duration-200 ${
                              isSpeaking ? "scale-110 animate-pulse" : "hover:scale-105"
                            }`}
                          >
                            <span>{current.avatarEmoji}</span>
                            {/* Black Cap / Accessory overlay */}
                            <span className="absolute -top-3 text-3xl filter drop-shadow-lg">
                              {current.accessoryEmoji}
                            </span>
                          </div>

                          {/* Sound wave badge */}
                          {isSpeaking && (
                            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1 shadow-lg animate-bounce">
                              <Volume2 className="w-3 h-3" />
                              <span>Speaking...</span>
                            </div>
                          )}
                        </div>

                        <div className="text-center">
                          <span className={`text-xs font-black px-3 py-1 rounded-full bg-slate-950/60 border ${current.borderColor} ${current.accentColor}`}>
                            {current.tag}
                          </span>
                        </div>
                      </div>

                      {/* Speech Bubble & Points */}
                      <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                          <h4 className="text-2xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                            <span>{current.name}</span>
                          </h4>
                          <p className={`text-xs font-semibold ${current.accentColor} mt-0.5`}>
                            {current.title}
                          </p>
                        </div>

                        {/* Speech Bubble */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-700/60 text-slate-100 text-sm leading-relaxed relative shadow-inner">
                          <div className="absolute -left-2 top-6 w-3 h-3 bg-slate-950 border-l border-b border-slate-700 rotate-45 hidden md:block" />
                          <p className="italic font-medium">
                            "{current.speechText}"
                          </p>
                        </div>

                        {/* Voice Control Buttons */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                          <button
                            id="trigger-speak-btn"
                            onClick={() => speakDialogue(current.speechText, current.pitch, current.rate)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Play Voice Speech</span>
                          </button>

                          {isSpeaking && (
                            <button
                              onClick={stopSpeaking}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-xs transition-all cursor-pointer"
                            >
                              <Pause className="w-4 h-4" />
                              <span>Stop Speech</span>
                            </button>
                          )}
                        </div>

                        {/* Security & Feature Bullet Points */}
                        <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {current.securityPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-slate-300">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${current.accentColor} shrink-0`} />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: COMPLETE FEATURES MATRIX */}
          {activeTab === "features" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: "all", label: "All Features (12)" },
                  { id: "messaging", label: "Messaging" },
                  { id: "ai", label: "MK.ia AI & Gemini" },
                  { id: "groups", label: "Groups & Channels" },
                  { id: "calls", label: "Audio/Video Calls" },
                  { id: "stories", label: "Stories & Social" },
                  { id: "creative", label: "Creative & Doodles" },
                  { id: "security", label: "Security" },
                  { id: "customization", label: "Themes & Fonts" },
                  { id: "productivity", label: "Productivity" },
                  { id: "analytics", label: "Analytics" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playChime(650, 0.05);
                      setSelectedFeatureCategory(cat.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedFeatureCategory === cat.id
                        ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20"
                        : isDarkMode
                        ? "bg-slate-800 text-slate-400 hover:text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all hover:scale-101 flex flex-col justify-between ${
                        isDarkMode
                          ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900"
                          : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {feat.badge}
                          </span>
                        </div>

                        <h4 className="text-base font-bold mb-1.5">{feat.title}</h4>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          {feat.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                        <span>Status: Active</span>
                        <span>v4.5</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM ARCHITECTURE */}
          {activeTab === "architecture" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDarkMode ? "bg-slate-900/80 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <h3 className="text-2xl font-black tracking-tight mb-2 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <span>Full-Stack Architecture & Cloud Pipeline</span>
                </h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"} mb-6`}>
                  Designed by CEO Med Rayen Bouazizi for enterprise scalability, resilience, and real-time execution on Cloud Run & Render.
                </p>

                {/* Pipeline Flow Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">1</span>
                      <span>Client Presentation</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      React 18 + Vite + Tailwind CSS with dynamic CSS color variables, Web Audio API sound synthesis, and Lucide vector icons.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">2</span>
                      <span>SSE & Real-Time Sync</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Express backend with persistent Server-Sent Events (SSE) broadcasting typing, thinking, calls, and message events in &lt;45ms.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">3</span>
                      <span>Gemini 2.5 Multi-AI</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      Server-side Gemini 2.5 SDK integration powering MK.ia responses, automated absence replies, multimodal reasoning, and translation.
                    </p>
                  </div>
                </div>

                {/* Cloud & Domain Info */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h5 className="text-xs font-black text-white">Live Official Deployment</h5>
                      <a
                        href={VISIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 underline font-mono font-bold hover:text-cyan-200"
                      >
                        {VISIT_URL}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied" : "Copy Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CODE MANIFEST SNIPPET */}
          {activeTab === "code_snippet" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black tracking-tight">Code Representation & Manifest</h3>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Architectural TypeScript specification defining all capabilities, CEO metadata, and endpoints.
                  </p>
                </div>
                <button
                  id="copy-code-manifest-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(ARCHITECTURE_CODE);
                    setCopiedCode(true);
                    playChime(880, 0.1);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied Manifest!" : "Copy Code"}</span>
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0b1120] text-cyan-300 font-mono text-xs p-4 sm:p-6 overflow-x-auto shadow-2xl max-h-[420px] leading-relaxed">
                <pre>{ARCHITECTURE_CODE}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div
          className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-medium ${
            isDarkMode ? "bg-slate-900/90 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>© 2026 Chat104. Founded by</span>
            <span className="font-bold text-cyan-400">CEO Med Rayen Bouazizi</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={VISIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>chat104.onrender.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
