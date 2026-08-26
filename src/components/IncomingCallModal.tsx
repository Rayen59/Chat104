import React, { useEffect, useRef, useState } from "react";
import { ActiveCall } from "../types";
import { Phone, PhoneOff, Video, Sparkles } from "lucide-react";
import { translations, getSavedLanguage, Language } from "../i18n";

interface IncomingCallModalProps {
  call: ActiveCall;
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  call,
  onAccept,
  onDecline
}) => {
  const [lang, setLang] = useState<Language>(getSavedLanguage());
  const t = translations[lang];
  const ringtoneIntervalRef = useRef<any>(null);

  useEffect(() => {
    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };
    window.addEventListener("wavegram_lang_change", handleLangChange);
    return () => window.removeEventListener("wavegram_lang_change", handleLangChange);
  }, []);

  // Web Audio Ringtone Melody
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();

      const playRingtoneChime = () => {
        if (ctx.state === "suspended") ctx.resume();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.15 + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 0.4);
        });
      };

      playRingtoneChime();
      ringtoneIntervalRef.current = setInterval(playRingtoneChime, 2500);

      return () => {
        if (ringtoneIntervalRef.current) clearInterval(ringtoneIntervalRef.current);
        ctx.close().catch(() => {});
      };
    } catch (e) {
      console.warn("Ringtone error:", e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 select-none animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-sm bg-[#17212b] border border-[#242f3d] rounded-3xl p-6 sm:p-7 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative flex flex-col items-center text-center">
        
        {/* Call Type Badge */}
        <div className="px-3.5 py-1 rounded-full bg-[#0e1621] border border-[#242f3d] text-[#3390ec] text-xs font-bold mb-5 flex items-center gap-1.5 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>
            {call.type === "video" ? t.incomingVideoCall : t.incomingVoiceCall}
          </span>
        </div>

        {/* Pulsing Glowing Avatar */}
        <div className="relative w-24 h-24 mb-5">
          <div className="absolute inset-0 rounded-full bg-[#3390ec]/30 animate-ping" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#3390ec] to-cyan-400 opacity-60 blur-sm animate-pulse" />
          <img
            src={
              call.callerAvatar ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                call.callerName
              )}`
            }
            alt={call.callerName}
            className="w-full h-full rounded-full object-cover bg-[#242f3d] ring-2 ring-[#3390ec] shadow-2xl relative z-10"
          />
        </div>

        {/* Caller Name & Ringing state */}
        <h3 className="text-xl font-extrabold text-white mb-1 tracking-wide">{call.callerName}</h3>
        <p className="text-xs text-[#7d8b99] mb-6 font-medium">
          {t.ringing}
        </p>

        {/* Accept / Decline Action Buttons */}
        <div className="flex items-center justify-center gap-4 w-full">
          <button
            onClick={onDecline}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ring-1 ring-rose-400/40"
          >
            <PhoneOff className="w-4 h-4" />
            <span>{t.declineCall}</span>
          </button>

          <button
            onClick={onAccept}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#42ab58] hover:bg-[#3ba04f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 animate-pulse cursor-pointer ring-1 ring-emerald-300/40"
          >
            {call.type === "video" ? (
              <Video className="w-4 h-4" />
            ) : (
              <Phone className="w-4 h-4" />
            )}
            <span>{t.answerCall}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
