import React from "react";
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
  Bot
} from "lucide-react";

interface AiIntelligenceHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: AiIntelligenceMode;
  onSelectMode: (mode: AiIntelligenceMode) => void;
  onSelectPromptTemplate?: (promptText: string) => void;
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
  onSelectMode,
  onSelectPromptTemplate
}) => {
  if (!isOpen) return null;

  const activeProfile =
    AI_INTELLIGENCE_PROFILES.find((p) => p.id === currentMode) || AI_INTELLIGENCE_PROFILES[0];

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

  return (
    <div
      id="ai-intelligence-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="ai-intelligence-modal-container"
        className="w-full max-w-2xl bg-[var(--app-card,#17212b)] border border-[var(--app-border-light,#242f3d)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--app-border-light,#242f3d)] bg-gradient-to-r from-[var(--app-sidebar,#17212b)] to-[var(--app-card,#17212b)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">MK.ia Intelligence Hub</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Gemini Deep AI
                </span>
              </div>
              <p className="text-xs text-[var(--app-text-muted,#7d8b99)]">
                Select an intelligence persona to tailor MK.ia's depth, reasoning style, and expertise.
              </p>
            </div>
          </div>
          <button
            id="close-ai-hub-modal-btn"
            onClick={onClose}
            className="p-2 text-[var(--app-text-muted,#7d8b99)] hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Mode Spotlight Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--app-accent,#3390ec)]/15 via-[var(--app-bg,#0e1621)] to-[var(--app-card,#17212b)] border border-[var(--app-accent,#3390ec)]/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--app-accent,#3390ec)]">
                <Cpu className="w-4 h-4" />
                <span>Active Intelligence Persona</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white">
                {activeProfile.badge}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{activeProfile.name}</h3>
            <p className="text-xs text-[var(--app-text-muted,#7d8b99)] leading-relaxed">
              {activeProfile.tagline}. {activeProfile.description}
            </p>
          </div>

          {/* Grid of Intelligence Modes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted,#7d8b99)] mb-3">
              Choose Intelligence Specialization
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AI_INTELLIGENCE_PROFILES.map((profile) => {
                const isSelected = currentMode === profile.id;
                return (
                  <button
                    key={profile.id}
                    id={`ai-mode-card-${profile.id}`}
                    type="button"
                    onClick={() => onSelectMode(profile.id)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                      isSelected
                        ? "bg-[var(--app-accent,#3390ec)]/15 border-[var(--app-accent,#3390ec)] ring-1 ring-[var(--app-accent,#3390ec)]/60 shadow-lg shadow-blue-500/10"
                        : "bg-[var(--app-bg,#0e1621)] border-[var(--app-border,#131b26)] hover:border-[var(--app-border-light,#242f3d)] hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[var(--app-accent,#3390ec)] text-white shadow-md shadow-blue-500/30"
                              : "bg-white/5 text-[var(--app-text-muted,#7d8b99)] group-hover:text-white"
                          }`}
                        >
                          {getModeIcon(profile.iconName)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{profile.name}</h4>
                          <span className="text-[10px] text-[var(--app-accent,#3390ec)] font-medium">
                            {profile.badge}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[var(--app-accent,#3390ec)] flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--app-text-muted,#7d8b99)] line-clamp-2 leading-relaxed">
                      {profile.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Launch Prompts for active mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted,#7d8b99)] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--app-accent,#3390ec)]" />
              Quick Launch Prompts for {activeProfile.name}
            </label>
            <div className="space-y-2">
              {activeProfile.quickPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  id={`quick-prompt-btn-${idx}`}
                  type="button"
                  onClick={() => {
                    if (onSelectPromptTemplate) {
                      onSelectPromptTemplate(promptText);
                    }
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-[var(--app-bg,#0e1621)] border border-[var(--app-border,#131b26)] hover:border-[var(--app-accent,#3390ec)]/50 hover:bg-white/[0.02] transition-all flex items-center justify-between gap-3 group"
                >
                  <span className="text-xs text-[var(--app-text,#ffffff)]/90 group-hover:text-white font-medium">
                    "{promptText}"
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[var(--app-accent,#3390ec)] text-[var(--app-text-muted,#7d8b99)] group-hover:text-white shrink-0 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--app-border-light,#242f3d)] bg-[var(--app-sidebar,#17212b)]">
          <div className="flex items-center gap-2 text-[11px] text-[var(--app-text-muted,#7d8b99)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Real-time Gemini Model Routing Active</span>
          </div>
          <button
            id="apply-ai-mode-btn"
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--app-accent,#3390ec)] hover:bg-[var(--app-accent-hover,#2481cc)] text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
          >
            <Check className="w-4 h-4" />
            Apply Mode
          </button>
        </div>
      </div>
    </div>
  );
};
