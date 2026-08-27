import React, { useState } from "react";
import { ChatTypographyConfig, ChatFontFamily, ChatFontSize, ChatTextStyle } from "../types";
import { Type, Check, RotateCcw, X, Eye, Sparkles, MessageSquare } from "lucide-react";

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

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "plus-jakarta-sans",
    name: "Plus Jakarta Sans",
    category: "Modern Sans (Default)",
    cssClass: "font-plus-jakarta-sans",
    preview: "Modern, crisp & ultra-clear geometric typeface",
    description: "Balanced proportions and sharp legibility for fast chatting."
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

export const FONT_SIZES: { id: ChatFontSize; label: string; px: string; sizeClass: string }[] = [
  { id: "compact", label: "Compact", px: "13px", sizeClass: "chat-size-compact" },
  { id: "normal", label: "Normal", px: "15px", sizeClass: "chat-size-normal" },
  { id: "large", label: "Large", px: "17px", sizeClass: "chat-size-large" },
  { id: "huge", label: "Huge", px: "20px", sizeClass: "chat-size-huge" }
];

export const TEXT_STYLES: { id: ChatTextStyle; label: string; description: string }[] = [
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
  const [customTestText, setCustomTestText] = useState("");

  if (!isOpen) return null;

  const activeConfig = config || currentConfig || DEFAULT_TYPOGRAPHY_CONFIG;

  const updateConfig = (newCfg: ChatTypographyConfig) => {
    try {
      localStorage.setItem("wavegram_chat_typography", JSON.stringify(newCfg));
    } catch {}
    if (onChangeConfig) onChangeConfig(newCfg);
    if (onSaveConfig) onSaveConfig(newCfg);
  };

  const currentFont = FONT_OPTIONS.find((f) => f.id === activeConfig.fontFamily) || FONT_OPTIONS[0];

  const handleReset = () => {
    updateConfig(DEFAULT_TYPOGRAPHY_CONFIG);
  };

  return (
    <div
      id="chat-typography-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="chat-typography-modal-container"
        className="w-full max-w-xl bg-[#17212b] border border-[#242f3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#242f3d] bg-[#17212b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3390ec]/20 flex items-center justify-center text-[#3390ec]">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Writing Style & Typography
                </h2>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#3390ec]/20 text-[#3390ec]">
                  Active
                </span>
              </div>
              <p className="text-xs text-[#7d8b99]">
                Choose your custom typeface, reading size, and text formatting.
              </p>
            </div>
          </div>
          <button
            id="close-typography-modal-btn"
            onClick={onClose}
            className="p-2 text-[#7d8b99] hover:text-white rounded-xl hover:bg-[#202b36] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-[#242f3d]">
          {/* Live Preview Box */}
          <div className="p-4 rounded-2xl bg-[#0e1621] border border-[#242f3d] space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-[#7d8b99]">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Eye className="w-3.5 h-3.5 text-[#3390ec]" />
                Live Chat Bubble Preview
              </span>
              <span className="text-[11px] font-mono text-[#3390ec] bg-[#3390ec]/10 px-2 py-0.5 rounded-md">
                {currentFont.name} • {activeConfig.fontSize}
              </span>
            </div>

            {/* Simulated Chat Bubbles with chosen font */}
            <div
              className={`space-y-2.5 transition-all ${currentFont.cssClass} chat-size-${activeConfig.fontSize} chat-style-${activeConfig.textStyle}`}
            >
              {/* Incoming message */}
              <div className="flex items-end gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                  MK
                </div>
                <div className="p-3 rounded-2xl rounded-bl-xs bg-[#182533] text-white border border-[#242f3d]/60 shadow-sm">
                  <p className="font-semibold text-xs text-[#3390ec] mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#3390ec]" />
                    MK.ia Assistant
                  </p>
                  <p>{currentFont.preview}</p>
                </div>
              </div>

              {/* Outgoing message */}
              <div className="flex items-end justify-end gap-2 max-w-[88%] ml-auto">
                <div className="p-3 rounded-2xl rounded-br-xs bg-[#2b5278] text-white shadow-md">
                  <p>
                    {customTestText.trim()
                      ? customTestText
                      : "Writing styles and typography look crystal clear in all messages! ✨"}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-80 font-sans">
                    <span>Just now</span>
                    <Check className="w-3 h-3 text-cyan-300 inline" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive custom test typing field */}
            <div className="pt-2 border-t border-[#242f3d]/60 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#7d8b99] shrink-0" />
              <input
                type="text"
                value={customTestText}
                onChange={(e) => setCustomTestText(e.target.value)}
                placeholder="Type your own sample text here to test..."
                className="w-full bg-[#17212b] border border-[#242f3d] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-[#7d8b99] focus:outline-none focus:border-[#3390ec]"
              />
              {customTestText && (
                <button
                  type="button"
                  onClick={() => setCustomTestText("")}
                  className="text-[10px] text-[#7d8b99] hover:text-white shrink-0 px-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* 1. Font Family Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7d8b99] mb-2.5">
              1. Choose Font Family
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FONT_OPTIONS.map((f) => {
                const isSelected = activeConfig.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    id={`font-opt-${f.id}`}
                    type="button"
                    onClick={() => updateConfig({ ...activeConfig, fontFamily: f.id })}
                    className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#3390ec]/20 border-[#3390ec] ring-1 ring-[#3390ec]/50 shadow-md"
                        : "bg-[#0e1621] border-[#242f3d] hover:border-[#3390ec]/50 hover:bg-[#202b36]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h4 className="text-xs font-bold text-white">{f.name}</h4>
                        <span className="text-[10px] text-[#7d8b99]">
                          {f.category}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#3390ec] flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className={`text-xs text-slate-200 mt-1 line-clamp-1 ${f.cssClass}`}>
                      {f.preview}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Size Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7d8b99] mb-2.5">
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
                    className={`py-2.5 px-2 text-center rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#3390ec] text-white font-bold border-[#3390ec] shadow-md"
                        : "bg-[#0e1621] text-white border-[#242f3d] hover:border-[#3390ec]/50 hover:bg-[#202b36]/40"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7d8b99] mb-2.5">
              3. Weight & Style Effect
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TEXT_STYLES.map((st) => {
                const isSelected = activeConfig.textStyle === st.id;
                return (
                  <button
                    key={st.id}
                    id={`textstyle-opt-${st.id}`}
                    type="button"
                    onClick={() => updateConfig({ ...activeConfig, textStyle: st.id })}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#3390ec]/20 border-[#3390ec] ring-1 ring-[#3390ec]/50 shadow-md"
                        : "bg-[#0e1621] border-[#242f3d] hover:border-[#3390ec]/50 hover:bg-[#202b36]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{st.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#3390ec]" />}
                    </div>
                    <p className="text-[10px] text-[#7d8b99] mt-0.5 line-clamp-1">
                      {st.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#242f3d] bg-[#17212b]">
          <button
            id="reset-typography-btn"
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#7d8b99] hover:text-white rounded-xl hover:bg-[#202b36] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Default
          </button>

          <button
            id="save-typography-btn"
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#3390ec] hover:bg-[#2481cc] text-white text-xs font-bold shadow-lg shadow-[#3390ec]/25 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
