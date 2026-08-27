import React from "react";
import { ChatTypographyConfig, ChatFontFamily, ChatFontSize, ChatTextStyle } from "../types";
import { Type, Sparkles, Check, RotateCcw, X, Sliders, Eye } from "lucide-react";

interface ChatTypographyModalProps {
  isOpen: boolean;
  onClose: () => void;
  config?: ChatTypographyConfig;
  currentConfig?: ChatTypographyConfig;
  onChangeConfig?: (newConfig: ChatTypographyConfig) => void;
  onSaveConfig?: (newConfig: ChatTypographyConfig) => void;
}

export const DEFAULT_TYPOGRAPHY_CONFIG: ChatTypographyConfig = {
  fontFamily: "plus-jakarta-sans",
  fontSize: "normal",
  textStyle: "standard"
};

interface FontOption {
  id: ChatFontFamily;
  name: string;
  category: string;
  cssClass: string;
  preview: string;
  description: string;
}

const FONT_OPTIONS: FontOption[] = [
  {
    id: "plus-jakarta-sans",
    name: "Plus Jakarta Sans",
    category: "Modern Sans (Default)",
    cssClass: "font-plus-jakarta-sans",
    preview: "Modern, refined & ultra-clear geometric sans",
    description: "Balanced proportions and crisp legibility for all conversations."
  },
  {
    id: "inter",
    name: "Inter",
    category: "Clean Tech UI",
    cssClass: "font-inter",
    preview: "Clean, neutral and sharp digital interface font",
    description: "Designed specifically for computer screens and high readability."
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    category: "Developer Monospace",
    cssClass: "font-jetbrains-mono",
    preview: "const msg = 'Code, terminals & monospaced elegance';",
    description: "Fixed-width coding style with clear punctuation and distinct symbols."
  },
  {
    id: "playfair-display",
    name: "Playfair Display",
    category: "Editorial Serif",
    cssClass: "font-playfair-display",
    preview: "Sophisticated, literary and timeless elegance",
    description: "Classical serif typography with delicate high-contrast strokes."
  },
  {
    id: "caveat",
    name: "Caveat Casual",
    category: "Handwriting & Script",
    cssClass: "font-caveat",
    preview: "Friendly, casual and expressive handwritten charm ✨",
    description: "Spontaneous handwritten rhythm for playful and warm messaging."
  },
  {
    id: "quicksand",
    name: "Quicksand Rounded",
    category: "Soft & Friendly",
    cssClass: "font-quicksand",
    preview: "Soft rounded curves and friendly approachable vibe",
    description: "Gentle terminal curves providing a relaxed, accessible reading flow."
  }
];

const FONT_SIZES: { id: ChatFontSize; label: string; px: string; sizeClass: string }[] = [
  { id: "compact", label: "Compact", px: "13px", sizeClass: "chat-size-compact" },
  { id: "normal", label: "Normal", px: "15px", sizeClass: "chat-size-normal" },
  { id: "large", label: "Large", px: "17px", sizeClass: "chat-size-large" },
  { id: "huge", label: "Huge", px: "20px", sizeClass: "chat-size-huge" }
];

const TEXT_STYLES: { id: ChatTextStyle; label: string; description: string }[] = [
  { id: "standard", label: "Standard", description: "Balanced weight and normal optical tracking." },
  { id: "bold-readable", label: "Bold & Crisp", description: "Slightly weighted for maximum instant readability." },
  { id: "high-contrast", label: "High Contrast", description: "Enhanced text luminosity and crisp edges." },
  { id: "relaxed", label: "Relaxed Spacing", description: "Spacious line-height and airy character tracking." }
];

export const ChatTypographyModal: React.FC<ChatTypographyModalProps> = ({
  isOpen,
  onClose,
  config,
  currentConfig,
  onChangeConfig,
  onSaveConfig
}) => {
  if (!isOpen) return null;

  const activeConfig = config || currentConfig || DEFAULT_TYPOGRAPHY_CONFIG;
  const updateConfig = (newCfg: ChatTypographyConfig) => {
    if (onChangeConfig) onChangeConfig(newCfg);
    if (onSaveConfig) onSaveConfig(newCfg);
  };

  const currentFont = FONT_OPTIONS.find((f) => f.id === activeConfig.fontFamily) || FONT_OPTIONS[0];

  const handleReset = () => {
    updateConfig({
      fontFamily: "plus-jakarta-sans",
      fontSize: "normal",
      textStyle: "standard"
    });
  };

  return (
    <div
      id="chat-typography-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="chat-typography-modal-container"
        className="w-full max-w-xl bg-[var(--app-card,#17212b)] border border-[var(--app-border-light,#242f3d)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--app-border-light,#242f3d)] bg-[var(--app-sidebar,#17212b)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--app-accent,#3390ec)]/15 flex items-center justify-center text-[var(--app-accent,#3390ec)]">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--app-text,#ffffff)] flex items-center gap-2">
                Chat Typography & Style
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--app-accent,#3390ec)]/20 text-[var(--app-accent,#3390ec)]">
                  Customizer
                </span>
              </h2>
              <p className="text-xs text-[var(--app-text-muted,#7d8b99)]">
                Personalize your reading font, text size, and writing presentation.
              </p>
            </div>
          </div>
          <button
            id="close-typography-modal-btn"
            onClick={onClose}
            className="p-2 text-[var(--app-text-muted,#7d8b99)] hover:text-[var(--app-text,#ffffff)] rounded-xl hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Live Preview Box */}
          <div className="p-4 rounded-2xl bg-[var(--app-bg,#0e1621)] border border-[var(--app-border-light,#242f3d)] space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--app-text-muted,#7d8b99)]">
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5 text-[var(--app-accent,#3390ec)]" />
                Live Conversation Preview
              </span>
              <span className="text-[11px] font-mono opacity-70">
                {currentFont.name} • {config.fontSize}
              </span>
            </div>

            {/* Simulated Chat Bubbles with chosen font */}
            <div
              className={`space-y-2.5 transition-all ${currentFont.cssClass} chat-size-${activeConfig.fontSize} chat-style-${activeConfig.textStyle}`}
            >
              {/* Incoming message */}
              <div className="flex items-end gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  MK
                </div>
                <div className="p-3.5 rounded-2xl rounded-bl-sm bg-[var(--app-bubble-in,#182533)] text-[var(--app-bubble-in-text,#ffffff)] border border-[var(--app-border-light,#242f3d)]/50 shadow-sm">
                  <p className="font-semibold text-xs text-[var(--app-accent,#3390ec)] mb-1">
                    MK.ia Assistant ⚡
                  </p>
                  <p>{currentFont.preview}</p>
                </div>
              </div>

              {/* Outgoing message */}
              <div className="flex items-end justify-end gap-2 max-w-[85%] ml-auto">
                <div className="p-3.5 rounded-2xl rounded-br-sm bg-[var(--app-bubble-out,#2b5278)] text-[var(--app-bubble-out-text,#ffffff)] shadow-sm">
                  <p>Looks fantastic! This writing style makes reading discussions so pleasant. ✨</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-80 font-sans">
                    <span>11:58 AM</span>
                    <Check className="w-3 h-3 text-cyan-300 inline" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Font Family Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted,#7d8b99)] mb-3">
              1. Choose Font Family
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FONT_OPTIONS.map((f) => {
                const isSelected = activeConfig.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    id={`font-opt-${f.id}`}
                    type="button"
                    onClick={() => updateConfig({ ...activeConfig, fontFamily: f.id })}
                    className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[var(--app-accent,#3390ec)]/15 border-[var(--app-accent,#3390ec)] ring-1 ring-[var(--app-accent,#3390ec)]/50 shadow-md"
                        : "bg-[var(--app-bg,#0e1621)] border-[var(--app-border,#131b26)] hover:border-[var(--app-border-light,#242f3d)] hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <h4 className="text-sm font-bold text-[var(--app-text,#ffffff)]">{f.name}</h4>
                        <span className="text-[10px] text-[var(--app-text-muted,#7d8b99)] font-sans">
                          {f.category}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[var(--app-accent,#3390ec)] flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className={`text-xs text-[var(--app-text,#ffffff)]/80 mt-1 line-clamp-1 ${f.cssClass}`}>
                      {f.preview}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Size Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted,#7d8b99)] mb-3">
              2. Text Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {FONT_SIZES.map((s) => {
                const isSelected = activeConfig.fontSize === s.id;
                return (
                  <button
                    key={s.id}
                    id={`fontsize-opt-${s.id}`}
                    type="button"
                    onClick={() => updateConfig({ ...activeConfig, fontSize: s.id })}
                    className={`py-3 px-2 text-center rounded-xl border transition-all ${
                      isSelected
                        ? "bg-[var(--app-accent,#3390ec)] text-white font-bold border-[var(--app-accent,#3390ec)] shadow-md"
                        : "bg-[var(--app-bg,#0e1621)] text-[var(--app-text,#ffffff)] border-[var(--app-border,#131b26)] hover:border-[var(--app-border-light,#242f3d)]"
                    }`}
                  >
                    <div className="text-xs font-semibold">{s.label}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{s.px}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Text Style / Contrast */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--app-text-muted,#7d8b99)] mb-3">
              3. Contrast & Spacing Effect
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TEXT_STYLES.map((st) => {
                const isSelected = activeConfig.textStyle === st.id;
                return (
                  <button
                    key={st.id}
                    id={`textstyle-opt-${st.id}`}
                    type="button"
                    onClick={() => updateConfig({ ...activeConfig, textStyle: st.id })}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-[var(--app-accent,#3390ec)]/15 border-[var(--app-accent,#3390ec)] ring-1 ring-[var(--app-accent,#3390ec)]/50"
                        : "bg-[var(--app-bg,#0e1621)] border-[var(--app-border,#131b26)] hover:border-[var(--app-border-light,#242f3d)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--app-text,#ffffff)]">{st.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--app-accent,#3390ec)]" />}
                    </div>
                    <p className="text-[11px] text-[var(--app-text-muted,#7d8b99)] mt-0.5 line-clamp-1">
                      {st.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--app-border-light,#242f3d)] bg-[var(--app-sidebar,#17212b)]">
          <button
            id="reset-typography-btn"
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[var(--app-text-muted,#7d8b99)] hover:text-[var(--app-text,#ffffff)] rounded-xl hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>

          <button
            id="save-typography-btn"
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--app-accent,#3390ec)] hover:bg-[var(--app-accent-hover,#2481cc)] text-white text-xs font-bold shadow-lg shadow-[var(--app-accent,#3390ec)]/25 transition-all"
          >
            <Check className="w-4 h-4" />
            Apply Typography
          </button>
        </div>
      </div>
    </div>
  );
};
