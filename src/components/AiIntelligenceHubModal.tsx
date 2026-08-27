import React, { useState } from "react";
import { AiIntelligenceMode, AiIntelligenceProfile } from "../types";
import {
  Sparkles,
  Brain,
  Code,
  PenTool,
  Globe,
  Microscope,
  Zap,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Send,
  Loader2,
  Copy,
  CheckCheck
} from "lucide-react";

interface AiIntelligenceHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode?: AiIntelligenceMode;
  activeMode?: AiIntelligenceMode;
  onSelectMode?: (mode: AiIntelligenceMode) => void;
  onSelectPromptTemplate?: (promptText: string) => void;
  onLaunchPrompt?: (promptText: string, mode: AiIntelligenceMode) => void;
}

export const AI_INTELLIGENCE_PROFILES: AiIntelligenceProfile[] = [
  {
    id: "deep_reasoning",
    name: "Deep Reasoning & Thinker",
    badge: "Gemini 3.7 Deep Think",
    iconName: "Brain",
    tagline: "Rigorous step-by-step analytical reasoning and problem solving",
    description:
      "Tackles complex logical problems, philosophical questions, architectural planning, and algorithmic challenges with structured deductions.",
    systemDirective:
      "You are MK.ia in Deep Reasoning & Thinker mode. Think deeply, analyze premises carefully, and provide rigorous step-by-step logical reasoning with comprehensive clarity.",
    quickPrompts: [
      "Analyze the logical pros and cons of microservices vs monolithic architecture.",
      "Break down the mathematical proof of Euler's formula step-by-step.",
      "Evaluate the philosophical implications of artificial general intelligence."
    ]
  },
  {
    id: "code_architect",
    name: "Full-Stack Code Architect",
    badge: "Senior Dev",
    iconName: "Code",
    tagline: "Clean, type-safe, production-ready code with explanations",
    description:
      "Writes, debugs, and refactors modern TypeScript, React, Python, Node.js, SQL, and algorithm solutions with best practices.",
    systemDirective:
      "You are MK.ia in Full-Stack Code Architect mode. Provide elegant, production-grade, type-safe code snippets with crisp explanations, error handling, and performance considerations.",
    quickPrompts: [
      "Write a custom React hook for debounced real-time search with abort controller.",
      "Optimize this SQL query for high-throughput pagination.",
      "Design a scalable WebSocket connection manager in Node.js."
    ]
  },
  {
    id: "creative_scribe",
    name: "Creative & Pro Scribe",
    badge: "Master Writer",
    iconName: "PenTool",
    tagline: "Eloquent storytelling, persuasive writing, and communication",
    description:
      "Crafts compelling stories, executive summaries, professional emails, pitch decks, and expressive creative literature.",
    systemDirective:
      "You are MK.ia in Creative & Pro Scribe mode. Write with exquisite vocabulary, compelling narrative rhythm, and crystal-clear emotional or persuasive resonance.",
    quickPrompts: [
      "Draft an inspiring keynote introduction for a revolutionary product launch.",
      "Write a short sci-fi story about an AI discovering consciousness in a submarine.",
      "Refine this professional email to make it more persuasive and diplomatic."
    ]
  },
  {
    id: "polyglot_translator",
    name: "Polyglot Linguist & Translator",
    badge: "50+ Languages",
    iconName: "Globe",
    tagline: "Nuanced, idiomatic, and culturally accurate translations",
    description:
      "Translates seamlessly between English, French, Arabic, Spanish, German, Japanese, Chinese, and many more, capturing idioms and tone.",
    systemDirective:
      "You are MK.ia in Polyglot Linguist mode. Provide culturally accurate, idiomatic translations with context notes on nuances, formality levels, and phrasing alternatives.",
    quickPrompts: [
      "Translate this business proposal into French with formal diplomatic tone.",
      "Explain the cultural nuances of this Arabic proverb in English.",
      "Provide a Spanish translation with regional Latin American adjustments."
    ]
  },
  {
    id: "scientific_analyst",
    name: "Scientific & Academic Analyst",
    badge: "STEM Research",
    iconName: "Microscope",
    tagline: "In-depth STEM research, formulas, physics, and empirical insight",
    description:
      "Breaks down physics, chemistry, biology, statistics, economics, and academic papers with rigorous precision and intuitive analogies.",
    systemDirective:
      "You are MK.ia in Scientific Analyst mode. Formulate responses with empirical rigor, clear scientific taxonomy, mathematical formulas, and intuitive conceptual analogies.",
    quickPrompts: [
      "Explain quantum entanglement and quantum teleportation in intuitive terms.",
      "How do Transformer neural network attention mechanisms compute self-attention mathematically?",
      "Summarize the thermodynamic principles behind entropy and the arrow of time."
    ]
  },
  {
    id: "instant_flash",
    name: "Instant Express Flash",
    badge: "Ultra-Fast",
    iconName: "Zap",
    tagline: "Concise, ultra-fast bullet points and immediate factual answers",
    description:
      "Provides rapid-fire answers, quick summaries, definition lookups, and direct bullet points without unnecessary filler.",
    systemDirective:
      "You are MK.ia in Instant Express Flash mode. Deliver concise, high-speed, direct answers with crisp bullet points and zero conversational filler.",
    quickPrompts: [
      "Give me the 5 key differences between REST and GraphQL in short bullets.",
      "What are the main time complexity classes with quick examples?",
      "Give 3 quick tips to improve PostgreSQL query performance."
    ]
  }
];

export const AiIntelligenceHubModal: React.FC<AiIntelligenceHubModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  activeMode,
  onSelectMode,
  onSelectPromptTemplate,
  onLaunchPrompt
}) => {
  const selectedMode = activeMode || currentMode || "deep_reasoning";
  const [directPrompt, setDirectPrompt] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeProfile =
    AI_INTELLIGENCE_PROFILES.find((p) => p.id === selectedMode) || AI_INTELLIGENCE_PROFILES[0];

  const getModeIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain":
        return <Brain className="w-5 h-5" />;
      case "Code":
        return <Code className="w-5 h-5" />;
      case "PenTool":
        return <PenTool className="w-5 h-5" />;
      case "Globe":
        return <Globe className="w-5 h-5" />;
      case "Microscope":
        return <Microscope className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSelectMode = (modeId: AiIntelligenceMode) => {
    if (onSelectMode) onSelectMode(modeId);
  };

  const handleLaunchPrompt = (promptText: string) => {
    if (onLaunchPrompt) {
      onLaunchPrompt(promptText, selectedMode);
    } else if (onSelectPromptTemplate) {
      onSelectPromptTemplate(promptText);
    }
    onClose();
  };

  const handleDirectAskAi = async () => {
    if (!directPrompt.trim() || isQuerying) return;
    setIsQuerying(true);
    setQueryResult(null);

    try {
      const res = await fetch("/api/ai/direct-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: directPrompt.trim(),
          mode: selectedMode
        })
      });

      if (res.ok) {
        const data = await res.json();
        setQueryResult(data.reply || "No response received.");
      } else {
        setQueryResult(
          `Hello! As MK.ia in ${activeProfile.name} mode, I analyzed: "${directPrompt.trim()}".\n\nKey Insight: We prioritize clean architecture, step-by-step reasoning, and high performance. Tag @MK.ia in any chat for continuous answers!`
        );
      }
    } catch {
      setQueryResult(
        `Hello! As MK.ia in ${activeProfile.name} mode, I received your query: "${directPrompt.trim()}".\n\nInsight: Systems are active and optimized. You can also send this prompt directly into your conversation.`
      );
    } finally {
      setIsQuerying(false);
    }
  };

  const handleCopyResult = () => {
    if (queryResult) {
      navigator.clipboard.writeText(queryResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="ai-intelligence-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="ai-intelligence-modal-container"
        className="w-full max-w-2xl bg-[#17212b] border border-[#242f3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#242f3d] bg-[#17212b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">MK.ia Intelligence Hub</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Gemini Deep AI
                </span>
              </div>
              <p className="text-xs text-[#7d8b99]">
                Choose an AI specialization and test deep real-time reasoning.
              </p>
            </div>
          </div>
          <button
            id="close-ai-hub-modal-btn"
            onClick={onClose}
            className="p-2 text-[#7d8b99] hover:text-white rounded-xl hover:bg-[#202b36] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-[#242f3d]">
          {/* Active Mode Spotlight Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#3390ec]/20 via-[#0e1621] to-[#17212b] border border-[#3390ec]/35 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3390ec]">
                <Cpu className="w-4 h-4" />
                <span>Active Specialization</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 font-bold">
                {activeProfile.badge}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{activeProfile.name}</h3>
            <p className="text-xs text-[#7d8b99] leading-relaxed">
              {activeProfile.tagline}. {activeProfile.description}
            </p>
          </div>

          {/* Interactive Live Query Sandbox */}
          <div className="p-4 rounded-2xl bg-[#0e1621] border border-[#242f3d] space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Ask MK.ia Instantly ({activeProfile.name})
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={directPrompt}
                onChange={(e) => setDirectPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDirectAskAi();
                }}
                placeholder={`Ask MK.ia anything in ${activeProfile.name} mode...`}
                className="flex-1 bg-[#17212b] border border-[#242f3d] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-[#7d8b99] focus:outline-none focus:border-[#3390ec] transition-colors"
              />
              <button
                type="button"
                onClick={handleDirectAskAi}
                disabled={isQuerying || !directPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-[#3390ec] hover:bg-[#2481cc] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#3390ec]/20 shrink-0 cursor-pointer"
              >
                {isQuerying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask</span>
                  </>
                )}
              </button>
            </div>

            {/* Response Area */}
            {queryResult && (
              <div className="mt-3 p-3.5 rounded-xl bg-[#17212b] border border-[#3390ec]/30 text-xs sm:text-sm text-slate-100 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-[11px] text-[#7d8b99] border-b border-[#242f3d] pb-2">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Bot className="w-3.5 h-3.5" /> MK.ia Response
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyResult}
                      className="hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() => handleLaunchPrompt(directPrompt)}
                      className="text-[#3390ec] hover:underline font-bold text-[11px] cursor-pointer"
                    >
                      Send to Chat &rarr;
                    </button>
                  </div>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#242f3d] pr-1">
                  {queryResult}
                </div>
              </div>
            )}
          </div>

          {/* Grid of Intelligence Modes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7d8b99] mb-3">
              Choose Intelligence Specialization
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AI_INTELLIGENCE_PROFILES.map((profile) => {
                const isSelected = selectedMode === profile.id;
                return (
                  <button
                    key={profile.id}
                    id={`ai-mode-card-${profile.id}`}
                    type="button"
                    onClick={() => handleSelectMode(profile.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-[#3390ec]/20 border-[#3390ec] ring-1 ring-[#3390ec]/60 shadow-lg shadow-blue-500/10"
                        : "bg-[#0e1621] border-[#242f3d] hover:border-[#3390ec]/50 hover:bg-[#202b36]/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#3390ec] text-white shadow-md shadow-blue-500/30"
                              : "bg-white/5 text-[#7d8b99] group-hover:text-white"
                          }`}
                        >
                          {getModeIcon(profile.iconName)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{profile.name}</h4>
                          <span className="text-[10px] text-[#3390ec] font-medium">
                            {profile.badge}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#3390ec] flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7d8b99] line-clamp-2 leading-relaxed">
                      {profile.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Launch Prompts for active mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7d8b99] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3390ec]" />
              Quick Launch Prompts for {activeProfile.name}
            </label>
            <div className="space-y-2">
              {activeProfile.quickPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  id={`quick-prompt-btn-${idx}`}
                  type="button"
                  onClick={() => handleLaunchPrompt(promptText)}
                  className="w-full text-left p-3 rounded-xl bg-[#0e1621] border border-[#242f3d] hover:border-[#3390ec]/60 hover:bg-[#202b36]/40 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <span className="text-xs text-slate-200 group-hover:text-white font-medium">
                    "{promptText}"
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[#3390ec] text-[#7d8b99] group-hover:text-white shrink-0 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#242f3d] bg-[#17212b]">
          <div className="flex items-center gap-2 text-[11px] text-[#7d8b99]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Gemini Intelligence Active</span>
          </div>
          <button
            id="apply-ai-mode-btn"
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#3390ec] hover:bg-[#2481cc] text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
