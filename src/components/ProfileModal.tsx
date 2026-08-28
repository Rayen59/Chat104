import React, { useState, useRef, useEffect } from "react";
import { User, AiAutoResponderConfig } from "../types";
import {
  X,
  LogOut,
  Trash2,
  Upload,
  Check,
  Lock,
  Globe,
  EyeOff,
  Eye,
  Shield,
  ShieldCheck,
  Camera,
  BadgeCheck,
  User as UserIcon,
  Mail,
  FileText,
  Bell,
  HardDrive,
  Bot,
  Sparkles,
  Languages,
  Clock,
  Users,
  Settings,
  Palette,
  CheckSquare,
  Square,
  KeyRound,
  ExternalLink,
  Info,
  Copy,
  CheckCircle2
} from "lucide-react";
import { translations, getSavedLanguage, saveLanguage, Language } from "../i18n";
import { APP_THEMES, getSavedTheme, applyTheme, AppTheme } from "../theme";

interface ProfileModalProps {
  currentUser: User;
  allUsers?: User[];
  onClose: () => void;
  onUpdateProfile: (updated: Partial<User>) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onOpenAdmin?: () => void;
}

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://api.dicebear.com/7.x/bottts/svg?seed=wavegram1",
  "https://api.dicebear.com/7.x/bottts/svg?seed=wavegram2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  "https://api.dicebear.com/7.x/identicon/svg?seed=wavegramUser"
];

const SUPPORTED_LANGUAGES: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" }
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  currentUser,
  allUsers = [],
  onClose,
  onUpdateProfile,
  onLogout,
  onDeleteAccount,
  onOpenAdmin
}) => {
  const [lang, setLang] = useState<Language>(getSavedLanguage());
  const t = translations[lang] || translations.en;

  const [activeSection, setActiveSection] = useState<"general" | "themes" | "ai_responder" | "privacy" | "language">("general");

  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [customAvatar, setCustomAvatar] = useState("");
  const [status, setStatus] = useState<"online" | "offline" | "away" | "busy">(currentUser.status || "online");
  const [isPrivate, setIsPrivate] = useState<boolean>(!!currentUser.isPrivate);
  const [hideEmail, setHideEmail] = useState<boolean>(!!currentUser.hideEmail);

  // Theme State
  const [currentThemeId, setCurrentThemeId] = useState<string>(getSavedTheme());

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (e.detail?.id) {
        setCurrentThemeId(e.detail.id);
      }
    };
    window.addEventListener("wavegram_theme_change", handleThemeChange);
    return () => window.removeEventListener("wavegram_theme_change", handleThemeChange);
  }, []);

  // AI Auto-Responder State
  const initialAi = currentUser.aiAutoResponder || {};
  const [aiEnabled, setAiEnabled] = useState<boolean>(!!initialAi.enabled);
  const [aiTrigger, setAiTrigger] = useState<"when_away" | "when_offline" | "always">(
    initialAi.triggerWhen === "always" ? "always" : initialAi.triggerWhen === "offline_only" ? "when_offline" : "when_away"
  );
  const [aiTarget, setAiTarget] = useState<"all" | "specific_contacts">(
    initialAi.targetAudience === "specific_users" ? "specific_contacts" : "all"
  );
  const [aiAllowedUserIds, setAiAllowedUserIds] = useState<string[]>(initialAi.allowedUserIds || []);
  const [aiCustomInstructions, setAiCustomInstructions] = useState<string>(initialAi.customInstructions || "");
  const [aiLanguage, setAiLanguage] = useState<string>(initialAi.language || "auto");
  const [contactSearch, setContactSearch] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const isAdmin =
    currentUser.role === "admin" ||
    currentUser.id === "user_admin_mk" ||
    (currentUser.email || "").toLowerCase().includes("addmmin@gmail.com") ||
    (currentUser.email || "").toLowerCase().includes("admin@gmail.com") ||
    (currentUser.email || "").toLowerCase().includes("admin@wavegram.com");

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setAvatar(base64Url);
        setCustomAvatar(base64Url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    saveLanguage(newLang);
  };

  const handleSelectTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    applyTheme(themeId);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 1500);
  };

  const updateAndSaveAiResponder = async (updatedFields: {
    enabled?: boolean;
    trigger?: "when_away" | "when_offline" | "always";
    target?: "all" | "specific_contacts";
    allowedUserIds?: string[];
    customInstructions?: string;
    language?: string;
  }) => {
    const isEn = updatedFields.enabled !== undefined ? updatedFields.enabled : aiEnabled;
    const trig = updatedFields.trigger !== undefined ? updatedFields.trigger : aiTrigger;
    const targ = updatedFields.target !== undefined ? updatedFields.target : aiTarget;
    const allowed = updatedFields.allowedUserIds !== undefined ? updatedFields.allowedUserIds : aiAllowedUserIds;
    const customInst = updatedFields.customInstructions !== undefined ? updatedFields.customInstructions : aiCustomInstructions;
    const langVal = updatedFields.language !== undefined ? updatedFields.language : aiLanguage;

    if (updatedFields.enabled !== undefined) setAiEnabled(updatedFields.enabled);
    if (updatedFields.trigger !== undefined) setAiTrigger(updatedFields.trigger);
    if (updatedFields.target !== undefined) setAiTarget(updatedFields.target);
    if (updatedFields.allowedUserIds !== undefined) setAiAllowedUserIds(updatedFields.allowedUserIds);
    if (updatedFields.customInstructions !== undefined) setAiCustomInstructions(updatedFields.customInstructions);
    if (updatedFields.language !== undefined) setAiLanguage(updatedFields.language);

    const aiConfig: AiAutoResponderConfig = {
      enabled: isEn,
      triggerWhen: trig === "always" ? "always" : trig === "when_offline" ? "offline_only" : "away_or_offline",
      targetAudience: targ === "specific_contacts" ? "specific_users" : "everyone",
      allowedUserIds: allowed,
      responseStyle: customInst.trim() ? "custom_instructions" : "full_freedom",
      customInstructions: customInst.trim(),
      language: langVal,
      updatedAt: new Date().toISOString()
    };

    try {
      await fetch("/api/users/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          username: username.trim(),
          avatar: customAvatar.trim() || avatar,
          bio,
          status,
          isPrivate,
          hideEmail,
          aiAutoResponder: aiConfig
        })
      });

      onUpdateProfile({
        aiAutoResponder: aiConfig
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 1500);
    } catch (e) {
      console.error("Auto-save AI responder error:", e);
    }
  };

  const toggleAllowedUser = (userId: string) => {
    const updated = aiAllowedUserIds.includes(userId)
      ? aiAllowedUserIds.filter((id) => id !== userId)
      : [...aiAllowedUserIds, userId];
    updateAndSaveAiResponder({ allowedUserIds: updated });
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    const selectedAvatar = customAvatar.trim() || avatar;

    const aiConfig: AiAutoResponderConfig = {
      enabled: aiEnabled,
      triggerWhen: aiTrigger === "always" ? "always" : aiTrigger === "when_offline" ? "offline_only" : "away_or_offline",
      targetAudience: aiTarget === "specific_contacts" ? "specific_users" : "everyone",
      allowedUserIds: aiAllowedUserIds,
      responseStyle: aiCustomInstructions.trim() ? "custom_instructions" : "full_freedom",
      customInstructions: aiCustomInstructions.trim(),
      language: aiLanguage,
      updatedAt: new Date().toISOString()
    };

    try {
      const res = await fetch("/api/users/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          username: username.trim(),
          avatar: selectedAvatar,
          bio,
          status,
          isPrivate,
          hideEmail,
          aiAutoResponder: aiConfig
        })
      });

      if (res.ok) {
        onUpdateProfile({
          username: username.trim(),
          avatar: selectedAvatar,
          bio,
          status,
          isPrivate,
          hideEmail,
          aiAutoResponder: aiConfig
        });
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2000);
      }
    } catch (e) {
      console.error("Error saving profile:", e);
    } finally {
      setSaving(false);
    }
  };

  const otherUsers = allUsers.filter((u) => u.id !== currentUser.id && u.id !== "user_mk_ia");
  const filteredContacts = otherUsers.filter(
    (u) =>
      (u.username || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
      (u.bio || "").toLowerCase().includes(contactSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#17212b] border border-[#101921] rounded-2xl text-white shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-[#101921] shrink-0 bg-[#17212b]">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#3390ec]" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Settings & Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7d8b99] hover:text-white hover:bg-[#202b36] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0e1621] border-b border-[#101921] overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setActiveSection("general")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeSection === "general"
                ? "bg-[#3390ec] text-white shadow-md"
                : "text-[#7d8b99] hover:text-white hover:bg-[#202b36]"
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("themes")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeSection === "themes"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30"
                : "text-cyan-300 hover:bg-cyan-950/40 hover:text-cyan-200"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-cyan-300" />
            <span>Themes</span>
            <span className="px-1.5 py-0.2 text-[9px] bg-cyan-500/30 text-cyan-200 rounded-md font-extrabold">
              8
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("ai_responder")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeSection === "ai_responder"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40"
                : "text-purple-300 hover:bg-purple-950/40 hover:text-purple-200"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Auto-Responder</span>
            {aiEnabled && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("privacy")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeSection === "privacy"
                ? "bg-[#3390ec] text-white shadow-md"
                : "text-[#7d8b99] hover:text-white hover:bg-[#202b36]"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("language")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeSection === "language"
                ? "bg-[#3390ec] text-white shadow-md"
                : "text-[#7d8b99] hover:text-white hover:bg-[#202b36]"
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Language</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-[#242f3d]">
          
          {/* SECTION 1: GENERAL PROFILE */}
          {activeSection === "general" && (
            <div className="space-y-4 animate-in fade-in">
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 p-4 bg-[#0e1621] border border-[#101921] rounded-2xl">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#242f3d] ring-2 ring-[#3390ec]/40 shadow-md">
                    <img src={customAvatar || avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#3390ec] hover:bg-[#2481cc] text-white shadow-lg border-2 border-[#17212b] transition-transform active:scale-95 cursor-pointer"
                    title="Change Profile Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-white truncate">{username || currentUser.username}</h3>
                    <BadgeCheck className="w-4 h-4 text-[#3390ec] shrink-0" />
                    {isAdmin && (
                      <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md shrink-0">
                        Admin 👑
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7d8b99] truncate mt-0.5">
                    {hideEmail ? "Email Hidden" : currentUser.email}
                  </p>
                  
                  {/* Status Dropdown Indicator */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <label className="text-[11px] text-[#7d8b99] font-bold uppercase tracking-wider">Status:</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="bg-[#17212b] border border-[#242f3d] text-xs font-semibold rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-[#3390ec] cursor-pointer"
                    >
                      <option value="online">🟢 Online</option>
                      <option value="away">🟡 Away (AI Auto-Responder active)</option>
                      <option value="busy">🔴 Busy</option>
                      <option value="offline">⚪ Offline</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Avatar Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#7d8b99] uppercase tracking-wider">
                    Choose Avatar Preset
                  </label>
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="text-xs text-[#3390ec] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom</span>
                  </button>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
                  {AVATAR_PRESETS.map((presetUrl, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        setAvatar(presetUrl);
                        setCustomAvatar("");
                      }}
                      className={`w-10 h-10 rounded-full overflow-hidden shrink-0 transition-transform cursor-pointer ${
                        avatar === presetUrl && !customAvatar
                          ? "ring-2 ring-[#3390ec] scale-110 shadow-lg shadow-blue-500/20"
                          : "opacity-75 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <img src={presetUrl} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleGalleryUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-[#7d8b99] mb-1.5 uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#0e1621] border border-[#101921] rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-[#7d8b99] focus:outline-none focus:border-[#3390ec] transition-colors font-medium"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-[#7d8b99] mb-1.5 uppercase tracking-wider">
                  Bio / Status Message
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Hey there! I am using MK Wavegram."
                  className="w-full bg-[#0e1621] border border-[#101921] rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-[#7d8b99] focus:outline-none focus:border-[#3390ec] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Admin Panel Quick Access for Logged-In Admin */}
              {isAdmin && onOpenAdmin && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Launch Admin Control Panel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: THEMES CUSTOMIZATION */}
          {activeSection === "themes" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-[#0e1621] border border-[#101921] rounded-2xl">
                <div className="flex items-center gap-2.5 mb-1">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">Application Themes & Styling</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Select your favorite visual atmosphere. Theme colors, sidebars, accent hues, and message bubble backgrounds update in real time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {APP_THEMES.map((theme: AppTheme) => {
                  const isSelected = currentThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? "border-[#3390ec] bg-[#1a2938] shadow-lg ring-1 ring-[#3390ec]"
                          : "border-[#101921] bg-[#0e1621] hover:bg-[#15202b] hover:border-[#242f3d]"
                      }`}
                    >
                      {/* Top Bar with Name & Selection Check */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-bold text-xs text-white truncate">{theme.name}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-extrabold bg-[#242f3d] text-slate-300">
                            {theme.category}
                          </span>
                        </div>
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#3390ec] flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Check className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-slate-400 shrink-0" />
                        )}
                      </div>

                      {/* Color Palette Swatches */}
                      <div className="flex items-center gap-2 my-2.5 p-2 rounded-xl bg-black/30 border border-white/5">
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: theme.previewColors.bg }}
                          title="Background"
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: theme.previewColors.sidebar }}
                          title="Sidebar"
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: theme.previewColors.accent }}
                          title="Accent Tone"
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: theme.previewColors.bubbleOut }}
                          title="Outgoing Message"
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: theme.previewColors.bubbleIn }}
                          title="Incoming Message"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {theme.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3: AI AUTO-RESPONDER */}
          {activeSection === "ai_responder" && (
            <div className="space-y-4 animate-in fade-in">
              {/* Feature Hero Card */}
              <div className="p-4 bg-gradient-to-br from-purple-950/60 via-[#10162b] to-[#0c1020] border border-purple-500/40 rounded-2xl shadow-xl">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-md">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>MK Gemini AI Auto-Responder</span>
                        <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-md">
                          SMART AGENT
                        </span>
                      </h4>
                      <p className="text-xs text-purple-200/70 mt-0.5">
                        Let Gemini AI intelligently converse and respond on your behalf during your absence.
                      </p>
                    </div>
                  </div>
                  
                  {/* Master Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={aiEnabled}
                      onChange={(e) => updateAndSaveAiResponder({ enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              {/* Trigger Conditions */}
              <div className="space-y-2 p-3.5 bg-[#0e1621] border border-[#101921] rounded-2xl">
                <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>When Should AI Respond?</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => updateAndSaveAiResponder({ trigger: "when_away" })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      aiTrigger === "when_away"
                        ? "bg-purple-950/70 border-purple-500 text-purple-200 shadow-md"
                        : "bg-[#17212b] border-[#242f3d] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs">🟡 Away / Offline</div>
                    <div className="text-[10px] opacity-70 mt-0.5">Responds when status is Away or Offline</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateAndSaveAiResponder({ trigger: "when_offline" })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      aiTrigger === "when_offline"
                        ? "bg-purple-950/70 border-purple-500 text-purple-200 shadow-md"
                        : "bg-[#17212b] border-[#242f3d] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs">⚪ Offline Only</div>
                    <div className="text-[10px] opacity-70 mt-0.5">Only when fully disconnected</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateAndSaveAiResponder({ trigger: "always" })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      aiTrigger === "always"
                        ? "bg-purple-950/70 border-purple-500 text-purple-200 shadow-md"
                        : "bg-[#17212b] border-[#242f3d] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs">⚡ Always (24/7)</div>
                    <div className="text-[10px] opacity-70 mt-0.5">Co-pilot for all incoming messages</div>
                  </button>
                </div>
              </div>

              {/* Target Audience Scope */}
              <div className="space-y-2 p-3.5 bg-[#0e1621] border border-[#101921] rounded-2xl">
                <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Who Can AI Talk To?</span>
                </label>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => updateAndSaveAiResponder({ target: "all" })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      aiTarget === "all"
                        ? "bg-purple-950/70 border-purple-500 text-purple-200 shadow-md"
                        : "bg-[#17212b] border-[#242f3d] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs">🌐 Everyone</div>
                    <div className="text-[10px] opacity-70 mt-0.5">Any contact or group member</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateAndSaveAiResponder({ target: "specific_contacts" })}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      aiTarget === "specific_contacts"
                        ? "bg-purple-950/70 border-purple-500 text-purple-200 shadow-md"
                        : "bg-[#17212b] border-[#242f3d] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs">👥 Specific Contacts</div>
                    <div className="text-[10px] opacity-70 mt-0.5">Selected people only ({aiAllowedUserIds.length})</div>
                  </button>
                </div>

                {/* Contacts Multi-Picker if specific_contacts */}
                {aiTarget === "specific_contacts" && (
                  <div className="mt-3 pt-3 border-t border-[#1a2332] space-y-2">
                    <input
                      type="text"
                      placeholder="Search contacts to whitelist..."
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      className="w-full bg-[#17212b] border border-[#242f3d] rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    
                    <div className="max-h-36 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-purple-900/40">
                      {filteredContacts.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-2">No contacts found</p>
                      ) : (
                        filteredContacts.map((u) => {
                          const isSelected = aiAllowedUserIds.includes(u.id);
                          return (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => toggleAllowedUser(u.id)}
                              className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-left cursor-pointer ${
                                isSelected
                                  ? "bg-purple-950/80 border border-purple-500/50 text-purple-200"
                                  : "hover:bg-[#17212b] text-slate-300"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img src={u.avatar} alt={u.username} className="w-6 h-6 rounded-full object-cover shrink-0" />
                                <div className="min-w-0 truncate">
                                  <div className="text-xs font-semibold truncate">{u.username}</div>
                                  <div className="text-[10px] text-slate-400 truncate">{u.email}</div>
                                </div>
                              </div>
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-purple-400 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-600 shrink-0" />
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Instructions / Knowledge Prompt */}
              <div className="space-y-2 p-3.5 bg-[#0e1621] border border-[#101921] rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span>Custom Absence Instructions / Persona</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Optional</span>
                </div>
                <textarea
                  rows={3}
                  value={aiCustomInstructions}
                  onChange={(e) => setAiCustomInstructions(e.target.value)}
                  onBlur={() => updateAndSaveAiResponder({ customInstructions: aiCustomInstructions })}
                  placeholder="e.g. Tell friends I'm traveling in Tokyo until next week, or leave blank to let AI reply naturally with contextual awareness."
                  className="w-full bg-[#17212b] border border-[#242f3d] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                />
                <p className="text-[11px] text-slate-400">
                  Gemini AI reads conversation history and crafts polite, context-aware answers representing you.
                </p>
              </div>

              {/* Language Preference */}
              <div className="p-3.5 bg-[#0e1621] border border-[#101921] rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI Response Language</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Automatic detection or enforce a primary language
                  </div>
                </div>
                <select
                  value={aiLanguage}
                  onChange={(e) => updateAndSaveAiResponder({ language: e.target.value })}
                  className="bg-[#17212b] border border-[#242f3d] text-xs font-bold rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="auto">🌐 Auto-detect</option>
                  <option value="en">🇬🇧 English</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="ar">🇸🇦 العربية</option>
                  <option value="hi">🇮🇳 हिन्दी</option>
                  <option value="zh">🇨🇳 中文</option>
                  <option value="ru">🇷🇺 Русский</option>
                </select>
              </div>
            </div>
          )}

          {/* SECTION 4: PRIVACY */}
          {activeSection === "privacy" && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-3.5 bg-[#0e1621] border border-[#101921] rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#242f3d] text-[#3390ec]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Private Profile</div>
                    <div className="text-xs text-[#7d8b99]">Require approval for new incoming chats</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3390ec] focus:ring-[#3390ec] bg-[#17212b] border-[#101921] cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-[#0e1621] border border-[#101921] rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#242f3d] text-[#3390ec]">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Hide Email Address</div>
                    <div className="text-xs text-[#7d8b99]">Keep email private from public search</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hideEmail}
                  onChange={(e) => setHideEmail(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3390ec] focus:ring-[#3390ec] bg-[#17212b] border-[#101921] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* SECTION 6: APPLICATION LANGUAGE */}
          {activeSection === "language" && (
            <div className="space-y-3 animate-in fade-in">
              <p className="text-xs text-slate-400 mb-2">
                Select your preferred interface language. The entire application (menus, chat controls, AI tools, and notifications) will translate instantly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleLanguageChange(l.code)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      lang === l.code
                        ? "bg-[#3390ec]/20 border-[#3390ec] text-white shadow-md ring-1 ring-[#3390ec]"
                        : "bg-[#0e1621] border-[#101921] text-slate-300 hover:bg-[#202b36]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{l.flag}</span>
                      <div>
                        <div className="font-bold text-sm">{l.nativeName}</div>
                        <div className="text-xs text-slate-400">{l.name}</div>
                      </div>
                    </div>
                    {lang === l.code && <Check className="w-4 h-4 text-[#3390ec]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Buttons */}
        <div className="p-4 bg-[#0e1621] border-t border-[#101921] shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {savedToast && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>Changes saved successfully!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#242f3d] hover:bg-[#202b36] text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="px-5 py-2 bg-[#3390ec] hover:bg-[#2481cc] text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              {saving ? (
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Account Bottom Options (Log Out / Delete) */}
        <div className="px-4 py-2.5 bg-[#0b101b] border-t border-[#101921] flex items-center justify-between text-xs shrink-0">
          <button
            type="button"
            onClick={onLogout}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#7d8b99]" />
            <span>Log Out</span>
          </button>

          {showConfirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-rose-300 text-[11px]">Delete all data?</span>
              <button
                type="button"
                onClick={onDeleteAccount}
                className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] rounded-md transition cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="px-2 py-1 bg-[#242f3d] text-slate-300 text-[10px] rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="text-rose-400/80 hover:text-rose-300 flex items-center gap-1 transition-colors font-medium text-[11px] cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete Account</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
