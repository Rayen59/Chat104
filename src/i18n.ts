// Internationalization module for MK Wavegram
// Supports 6 languages: English (default), French (Français), Arabic (العربية), Hindi (हिन्दी), Chinese (中文), Russian (Русский)

export type Language = "en" | "fr" | "ar" | "hi" | "zh" | "ru";

export interface Translations {
  // Navigation & Tabs
  chats: string;
  contacts: string;
  people: string;
  groups: string;
  invites: string;
  requests: string;
  search: string;
  all: string;
  directMessages: string;
  groupChats: string;
  officialChannel: string;
  aiAssistant: string;
  savedNotes: string;
  stories: string;
  analytics: string;
  settings: string;
  profile: string;
  logout: string;
  deleteAccount: string;
  online: string;
  offline: string;
  away: string;
  typing: string;

  // Calls
  voiceCall: string;
  videoCall: string;
  startVoiceCall: string;
  startVideoCall: string;
  incomingVoiceCall: string;
  incomingVideoCall: string;
  ringing: string;
  connecting: string;
  connected: string;
  callEnded: string;
  callDuration: string;
  muteMicrophone: string;
  unmuteMicrophone: string;
  turnOnCamera: string;
  turnOffCamera: string;
  endCall: string;
  answerCall: string;
  declineCall: string;
  callBack: string;
  missedCall: string;
  completedCall: string;
  declinedCall: string;
  voiceTransformer: string;
  voiceTransformerDesc: string;
  voiceEffects: string;
  naturalVoice: string;
  robotVoice: string;
  heliumVoice: string;
  deepVoice: string;
  radioVoice: string;
  echoVoice: string;
  anonymousVoice: string;
  alienVoice: string;
  chipmunkVoice: string;
  telephoneVoice: string;
  monitorVoice: string;
  monitorVoiceOn: string;
  monitorVoiceOff: string;
  soundWaves: string;
  audioClarity: string;
  callConnecting: string;
  peerSpeaking: string;
  youAreSpeaking: string;
  remoteMuted: string;
  noEchoNotice: string;

  // Chat Room
  typeMessagePlaceholder: string;
  send: string;
  recordVoiceNote: string;
  stopRecording: string;
  cancelRecording: string;
  reply: string;
  forward: string;
  copy: string;
  edit: string;
  delete: string;
  deleteForMe: string;
  deleteForAll: string;
  saveToGallery: string;
  forwardedMessage: string;
  groupSettings: string;
  members: string;
  announcementsOnly: string;
  createPoll: string;
  luminousDoodle: string;
  stickersAndGifs: string;
  attachMedia: string;
  photoEditor: string;
  muted: string;
  unmuted: string;
  blockUser: string;
  unblockUser: string;
  report: string;

  // AI & Auto-Responder
  aiAutoResponder: string;
  aiAutoResponderDesc: string;
  enableAutoResponder: string;
  triggerWhen: string;
  triggerAway: string;
  triggerAlways: string;
  targetAudience: string;
  audienceEveryone: string;
  audienceDMs: string;
  audienceSpecific: string;
  selectContacts: string;
  responseStyle: string;
  styleCustom: string;
  styleFreedom: string;
  customInstructions: string;
  customInstructionsPlaceholder: string;
  aiLanguage: string;
  autoDetect: string;
  aiAutoReplyTag: string;
  commands: string;
  quickAiHelp: string;
  cmdMK: string;
  cmdSummarize: string;
  cmdTranslate: string;
  cmdReply: string;
  cmdExplain: string;
  cmdCode: string;
  cmdCreative: string;
  cmdPoll: string;

  // Modals & General
  cancel: string;
  save: string;
  close: string;
  confirm: string;
  create: string;
  join: string;
  leave: string;
  inviteCode: string;
  language: string;
  changeLanguage: string;
  english: string;
  french: string;
  arabic: string;
  hindi: string;
  chinese: string;
  russian: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation & Tabs
    chats: "Chats",
    contacts: "Contacts",
    people: "People",
    groups: "Groups",
    invites: "Invites",
    requests: "Requests",
    search: "Search...",
    all: "All",
    directMessages: "Direct Messages",
    groupChats: "Group Chats",
    officialChannel: "MK Official Channel",
    aiAssistant: "MK.ia AI Assistant",
    savedNotes: "Personal Notes",
    stories: "24h Stories",
    analytics: "Analytics & Activity",
    settings: "Settings",
    profile: "My Profile",
    logout: "Log Out",
    deleteAccount: "Delete My Account",
    online: "Online",
    offline: "Offline",
    away: "Away",
    typing: "is typing...",

    // Calls
    voiceCall: "Voice Call",
    videoCall: "Video Call",
    startVoiceCall: "Start Voice Call",
    startVideoCall: "Start Video Call",
    incomingVoiceCall: "Incoming Voice Call...",
    incomingVideoCall: "Incoming Video Call...",
    ringing: "Ringing...",
    connecting: "Connecting audio channels...",
    connected: "Call Connected",
    callEnded: "Call Ended",
    callDuration: "Call Duration",
    muteMicrophone: "Mute Microphone",
    unmuteMicrophone: "Unmute Microphone",
    turnOnCamera: "Turn On Camera",
    turnOffCamera: "Turn Off Camera",
    endCall: "End Call",
    answerCall: "Answer",
    declineCall: "Decline",
    callBack: "Call Back",
    missedCall: "Missed Call",
    completedCall: "Call Ended",
    declinedCall: "Declined Call",
    voiceTransformer: "Voice Transformer & Effects",
    voiceTransformerDesc: "Transform your voice in real-time during the call for the remote caller",
    voiceEffects: "Voice Effects",
    naturalVoice: "HD Natural Voice",
    robotVoice: "Cyber Robot",
    heliumVoice: "High Pitch / Helium",
    deepVoice: "Deep Bass Voice",
    radioVoice: "Vintage Walkie-Talkie",
    echoVoice: "Cosmic Echo",
    anonymousVoice: "Anonymous Modulator",
    alienVoice: "Alien / Extraterrestrial",
    chipmunkVoice: "Chipmunk Harmonic",
    telephoneVoice: "Classic Phone Line",
    monitorVoice: "Voice Loopback",
    monitorVoiceOn: "Voice monitoring enabled",
    monitorVoiceOff: "Voice monitoring disabled",
    soundWaves: "Live Audio Spectrum",
    audioClarity: "HD Audio & Echo Cancellation Active",
    callConnecting: "Establishing peer audio connection...",
    peerSpeaking: "Speaking...",
    youAreSpeaking: "You are speaking",
    remoteMuted: "Remote mic is muted",
    noEchoNotice: "Bidirectional audio connected. Zero loopback echo.",

    // Chat Room
    typeMessagePlaceholder: "Write a message or type $ for AI & commands...",
    send: "Send",
    recordVoiceNote: "Record Voice Note",
    stopRecording: "Stop Recording",
    cancelRecording: "Cancel",
    reply: "Reply",
    forward: "Forward",
    copy: "Copy",
    edit: "Edit",
    delete: "Delete",
    deleteForMe: "Delete for me",
    deleteForAll: "Delete for everyone",
    saveToGallery: "Save to Gallery",
    forwardedMessage: "Forwarded message",
    groupSettings: "Group Settings",
    members: "Members",
    announcementsOnly: "Announcement Channel (Read Only)",
    createPoll: "Create Poll",
    luminousDoodle: "Luminous Doodle",
    stickersAndGifs: "Stickers & GIFs",
    attachMedia: "Attach Media",
    photoEditor: "Photo Editor",
    muted: "Conversation Muted",
    unmuted: "Notifications Active",
    blockUser: "Block User",
    unblockUser: "Unblock User",
    report: "Report",

    // AI & Auto-Responder
    aiAutoResponder: "AI Auto-Responder / Absence Assistant",
    aiAutoResponderDesc: "Let MK.ia respond to messages on your behalf with full conversational context when you are absent",
    enableAutoResponder: "Enable AI Auto-Responder",
    triggerWhen: "When to Auto-Reply",
    triggerAway: "When Away / Offline only",
    triggerAlways: "Always (Every message)",
    targetAudience: "Who receives Auto-Replies",
    audienceEveryone: "Everyone (All chats)",
    audienceDMs: "Direct Messages Only",
    audienceSpecific: "Specific Contacts Only",
    selectContacts: "Select Contacts for AI",
    responseStyle: "AI Response Behavior",
    styleCustom: "Custom Instructions / Absence Note",
    styleFreedom: "Full Freedom (Smart Contextual Assistant)",
    customInstructions: "Absence Directives & Context",
    customInstructionsPlaceholder: "e.g. I am in meetings until 4 PM. Politely acknowledge their message, answer simple tech questions, and note down urgent requests.",
    aiLanguage: "AI Response Language",
    autoDetect: "Auto-Detect Language",
    aiAutoReplyTag: "AI Auto-Reply",
    commands: "Commands & AI Shortcuts",
    quickAiHelp: "Type $ or $MK to invoke Gemini AI intelligence",
    cmdMK: "Ask Gemini AI anything directly in this chat",
    cmdSummarize: "Summarize recent conversation history",
    cmdTranslate: "Translate messages to another language",
    cmdReply: "Draft a smart contextual reply",
    cmdExplain: "Break down and explain any concept",
    cmdCode: "Generate or debug code snippet",
    cmdCreative: "Brainstorm creative ideas or write text",
    cmdPoll: "Create an interactive group poll",

    // Modals & General
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    confirm: "Confirm",
    create: "Create",
    join: "Join",
    leave: "Leave",
    inviteCode: "Invite Code",
    language: "Language",
    changeLanguage: "Change Language",
    english: "English",
    french: "Français",
    arabic: "العربية",
    hindi: "हिन्दी",
    chinese: "中文",
    russian: "Русский"
  },
  fr: {
    // Navigation & Onglets
    chats: "Discussions",
    contacts: "Contacts",
    people: "Contacts",
    groups: "Groupes",
    invites: "Invitations",
    requests: "Invitations",
    search: "Rechercher...",
    all: "Tous",
    directMessages: "Messages privés",
    groupChats: "Groupes & Salons",
    officialChannel: "Canal officiel MK",
    aiAssistant: "Assistant MK.ia",
    savedNotes: "Notes personnelles",
    stories: "Histoires 24h",
    analytics: "Statistiques & Activité",
    settings: "Paramètres",
    profile: "Mon Profil",
    logout: "Se déconnecter",
    deleteAccount: "Supprimer mon compte",
    online: "En ligne",
    offline: "Hors ligne",
    away: "Absent(e)",
    typing: "est en train d'écrire...",

    // Appels
    voiceCall: "Appel vocal",
    videoCall: "Appel vidéo",
    startVoiceCall: "Lancer un appel vocal",
    startVideoCall: "Lancer un appel vidéo",
    incomingVoiceCall: "Appel vocal entrant...",
    incomingVideoCall: "Appel vidéo entrant...",
    ringing: "Appel en cours... Sonnerie...",
    connecting: "Connexion des canaux audio...",
    connected: "Appel Connecté",
    callEnded: "Appel terminé",
    callDuration: "Durée de l'appel",
    muteMicrophone: "Couper le micro",
    unmuteMicrophone: "Activer le micro",
    turnOnCamera: "Allumer la caméra",
    turnOffCamera: "Éteindre la caméra",
    endCall: "Raccrocher",
    answerCall: "Répondre",
    declineCall: "Refuser",
    callBack: "Rappeler",
    missedCall: "Appel manqué",
    completedCall: "Appel terminé",
    declinedCall: "Appel refusé",
    voiceTransformer: "Modulateur de Voix & Effets",
    voiceTransformerDesc: "Transformez votre voix en temps réel pour le correspondant",
    voiceEffects: "Effets Vocaux",
    naturalVoice: "Voix Naturelle HD",
    robotVoice: "Robot Cyber",
    heliumVoice: "Voix Aiguë / Hélium",
    deepVoice: "Voix Grave / Basse Profonde",
    radioVoice: "Talkie-Walkie Vintage",
    echoVoice: "Écho Cosmique",
    anonymousVoice: "Voix Anonyme",
    alienVoice: "Extraterrestre / Alien",
    chipmunkVoice: "Voix Écureuil Aiguë",
    telephoneVoice: "Téléphone Fixe Rétro",
    monitorVoice: "Retour vocal",
    monitorVoiceOn: "Écoute de ma voix modulée activée",
    monitorVoiceOff: "Écoute de ma voix modulée désactivée",
    soundWaves: "Spectre audio en direct",
    audioClarity: "Audio HD & Annulation d'écho active",
    callConnecting: "Établissement du flux audio bidirectionnel...",
    peerSpeaking: "Parle...",
    youAreSpeaking: "Vous parlez",
    remoteMuted: "Microphone distant coupé",
    noEchoNotice: "Audio bidirectionnel connecté. Zéro écho.",

    // Salon de Discussion
    typeMessagePlaceholder: "Écrivez un message ou tapez $ pour l'IA et les commandes...",
    send: "Envoyer",
    recordVoiceNote: "Enregistrer une note vocale",
    stopRecording: "Arrêter l'enregistrement",
    cancelRecording: "Annuler",
    reply: "Répondre",
    forward: "Transférer",
    copy: "Copier",
    edit: "Modifier",
    delete: "Supprimer",
    deleteForMe: "Supprimer pour moi",
    deleteForAll: "Supprimer pour tout le monde",
    saveToGallery: "Enregistrer dans la galerie",
    forwardedMessage: "Message transféré",
    groupSettings: "Paramètres du groupe",
    members: "Membres",
    announcementsOnly: "Canal d'annonces (lecture seule)",
    createPoll: "Créer un sondage",
    luminousDoodle: "Dessin lumineux",
    stickersAndGifs: "Stickers & GIFs",
    attachMedia: "Joindre un fichier",
    photoEditor: "Éditeur de photo",
    muted: "Notifications en sourdine",
    unmuted: "Notifications activées",
    blockUser: "Bloquer l'utilisateur",
    unblockUser: "Débloquer l'utilisateur",
    report: "Signaler",

    // IA & Répondeur Automatique
    aiAutoResponder: "Répondeur IA / Assistant d'absence",
    aiAutoResponderDesc: "Laissez MK.ia répondre intelligemment à vos messages en comprenant le contexte lorsque vous êtes absent",
    enableAutoResponder: "Activer le répondeur IA",
    triggerWhen: "Quand répondre automatiquement",
    triggerAway: "En cas d'absence / Hors ligne uniquement",
    triggerAlways: "Toujours (Tous les messages)",
    targetAudience: "Destinataires autorisés",
    audienceEveryone: "Tout le monde (Tous les contacts)",
    audienceDMs: "Messages privés uniquement",
    audienceSpecific: "Contacts spécifiques uniquement",
    selectContacts: "Choisir les contacts pour l'IA",
    responseStyle: "Comportement de l'IA",
    styleCustom: "Consignes personnalisées d'absence",
    styleFreedom: "Liberté totale (Assistant contextuel intelligent)",
    customInstructions: "Consignes et message d'absence",
    customInstructionsPlaceholder: "Ex: Je suis en réunion jusqu'à 16h. Réponds poliment, réponds aux questions techniques et note les urgences.",
    aiLanguage: "Langue des réponses de l'IA",
    autoDetect: "Détection automatique",
    aiAutoReplyTag: "Réponse Auto IA",
    commands: "Commandes & Raccourcis IA",
    quickAiHelp: "Tapez $ ou $MK pour invoquer l'intelligence Gemini",
    cmdMK: "Poser une question à l'IA Gemini dans cette discussion",
    cmdSummarize: "Résumer les messages récents",
    cmdTranslate: "Traduire les messages de la discussion",
    cmdReply: "Générer une suggestion de réponse intelligente",
    cmdExplain: "Expliquer un concept en profondeur",
    cmdCode: "Générer ou déboguer du code",
    cmdCreative: "Générer des idées créatives ou un texte",
    cmdPoll: "Créer un sondage interactif",

    // Fenêtres Modales & Général
    cancel: "Annuler",
    save: "Enregistrer",
    close: "Fermer",
    confirm: "Confirmer",
    create: "Créer",
    join: "Rejoindre",
    leave: "Quitter",
    inviteCode: "Code d'invitation",
    language: "Langue",
    changeLanguage: "Changer de langue",
    english: "English",
    french: "Français",
    arabic: "العربية",
    hindi: "हिन्दी",
    chinese: "中文",
    russian: "Русский"
  },
  ar: {
    // Navigation & Tabs
    chats: "المحادثات",
    contacts: "جهات الاتصال",
    people: "الأشخاص",
    groups: "المجموعات",
    invites: "الدعوات",
    requests: "الطلبات",
    search: "بحث...",
    all: "الكل",
    directMessages: "الرسائل المباشرة",
    groupChats: "مجموعات الدردشة",
    officialChannel: "قناة MK الرسمية",
    aiAssistant: "مساعد MK.ia الذكي",
    savedNotes: "الملاحظات الشخصية",
    stories: "القصص 24 ساعة",
    analytics: "الإحصائيات والنشاط",
    settings: "الإعدادات",
    profile: "ملفي الشخصي",
    logout: "تسجيل الخروج",
    deleteAccount: "حذف حسابي",
    online: "متصل الآن",
    offline: "غير متصل",
    away: "غائب",
    typing: "يكتب الآن...",

    // Calls
    voiceCall: "مكالمة صوتية",
    videoCall: "مكالمة فيديو",
    startVoiceCall: "بدء مكالمة صوتية",
    startVideoCall: "بدء مكالمة فيديو",
    incomingVoiceCall: "مكالمة صوتية واردة...",
    incomingVideoCall: "مكالمة فيديو واردة...",
    ringing: "جارٍ الاتصال... رنين...",
    connecting: "جارٍ ربط القنوات الصوتية...",
    connected: "المكالمة متصلة",
    callEnded: "انتهت المكالمة",
    callDuration: "مدة المكالمة",
    muteMicrophone: "كتم الميكروفون",
    unmuteMicrophone: "تشغيل الميكروفون",
    turnOnCamera: "تشغيل الكاميرا",
    turnOffCamera: "إيقاف الكاميرا",
    endCall: "إنهاء المكالمة",
    answerCall: "رد",
    declineCall: "رفض",
    callBack: "إعادة الاتصال",
    missedCall: "مكالمة فائتة",
    completedCall: "مكالمة منتهية",
    declinedCall: "مكالمة مرفوضة",
    voiceTransformer: "مغير الصوت والتأثيرات",
    voiceTransformerDesc: "غيّر صوتك فورياً أثناء المكالمة للطرف الآخر",
    voiceEffects: "تأثيرات الصوت",
    naturalVoice: "صوت طبيعي فائق الجودة",
    robotVoice: "روبوت سايبر",
    heliumVoice: "صوت هيليوم حاد",
    deepVoice: "صوت عميق رخيم",
    radioVoice: "جهاز لاسلكي عتيق",
    echoVoice: "صدى فضائي",
    anonymousVoice: "صوت مجهول",
    alienVoice: "كائن فضائي",
    chipmunkVoice: "سنجاب مرح",
    telephoneVoice: "هاتف أرضي قديم",
    monitorVoice: "استماع لصوتي",
    monitorVoiceOn: "تفعيل سماع الصوت المعدل",
    monitorVoiceOff: "تعطيل سماع الصوت المعدل",
    soundWaves: "موجات الصوت الحية",
    audioClarity: "صوت HD وعزل الصدى مفعل",
    callConnecting: "جارٍ تأسيس اتصال النظير...",
    peerSpeaking: "يتحدث...",
    youAreSpeaking: "أنت تتحدث",
    remoteMuted: "الطرف الآخر كتم الميكروفون",
    noEchoNotice: "صوت ثنائي الاتجاه بدون صدى.",

    // Chat Room
    typeMessagePlaceholder: "اكتب رسالة أو اكتب $ للأوامر والذكاء الاصطناعي...",
    send: "إرسال",
    recordVoiceNote: "تسجيل ملاحظة صوتية",
    stopRecording: "إيقاف التسجيل",
    cancelRecording: "إلغاء",
    reply: "رد",
    forward: "إعادة توجيه",
    copy: "نسخ",
    edit: "تعديل",
    delete: "حذف",
    deleteForMe: "حذف لدي فقط",
    deleteForAll: "حذف لدى الجميع",
    saveToGallery: "حفظ في المعرض",
    forwardedMessage: "رسالة موجهة",
    groupSettings: "إعدادات المجموعة",
    members: "الأعضاء",
    announcementsOnly: "قناة إعلانات (للقراءة فقط)",
    createPoll: "إنشاء استطلاع",
    luminousDoodle: "رسم مضيء",
    stickersAndGifs: "ملصقات وصور متحركة",
    attachMedia: "إرفاق ملف",
    photoEditor: "محرر الصور",
    muted: "المحادثة مكتومة",
    unmuted: "الإشعارات مفعلة",
    blockUser: "حظر المستخدم",
    unblockUser: "إلغاء الحظر",
    report: "إبلاغ",

    // AI & Auto-Responder
    aiAutoResponder: "الرد الآلي بالذكاء الاصطناعي / مساعد الغياب",
    aiAutoResponderDesc: "اجعل MK.ia يرد على الرسائل بالنيابة عنك مع فهم سياق المحادثة الكامل أثناء غيابك",
    enableAutoResponder: "تفعيل الرد الآلي بالذكاء الاصطناعي",
    triggerWhen: "متى يتم الرد التلقائي",
    triggerAway: "عند الغياب / غير متصل فقط",
    triggerAlways: "دائماً (لكل رسالة)",
    targetAudience: "من يستلم الردود الآلية",
    audienceEveryone: "الجميع (كل المحادثات)",
    audienceDMs: "الرسائل الخاصة فقط",
    audienceSpecific: "جهات اتصال محددة فقط",
    selectContacts: "تحديد جهات الاتصال للذكاء الاصطناعي",
    responseStyle: "طريقة وسلوك الذكاء الاصطناعي",
    styleCustom: "تعليمات مخصصة / مذكرة غياب",
    styleFreedom: "حرية كاملة (مساعد ذكي يقرأ السياق ويرد)",
    customInstructions: "تعليمات وتوجيهات الغياب",
    customInstructionsPlaceholder: "مثال: أنا في اجتماع حتى 4 عصراً. رحب بالمرسل بلطف وأجب على الاستفسارات وسجل الرسائل الهامة.",
    aiLanguage: "لغة ردود الذكاء الاصطناعي",
    autoDetect: "اكتشاف اللغة تلقائياً",
    aiAutoReplyTag: "رد آلي من الذكاء الاصطناعي",
    commands: "الأوامر واختصارات الذكاء الاصطناعي",
    quickAiHelp: "اكتب $ أو $MK لاستدعاء ذكاء Gemini",
    cmdMK: "اسأل ذكاء Gemini الاصطناعي مباشرة في هذه المحادثة",
    cmdSummarize: "تلخيص المحادثة الأخيرة بذكاء",
    cmdTranslate: "ترجمة المحادثة إلى أي لغة",
    cmdReply: "اقتراح رد ذكي ملائم للسياق",
    cmdExplain: "شرح وتبسيط أي فكرة أو مفهوم",
    cmdCode: "كتابة وفحص وشرح الأكواد البرمجية",
    cmdCreative: "عصف ذهني وأفكار إبداعية",
    cmdPoll: "إنشاء استطلاع رأي تفاعلي",

    // Modals & General
    cancel: "إلغاء",
    save: "حفظ",
    close: "إغلاق",
    confirm: "تأكيد",
    create: "إنشاء",
    join: "انضمام",
    leave: "مغادرة",
    inviteCode: "رمز الدعوة",
    language: "اللغة",
    changeLanguage: "تغيير اللغة",
    english: "English",
    french: "Français",
    arabic: "العربية",
    hindi: "हिन्दी",
    chinese: "中文",
    russian: "Русский"
  },
  hi: {
    // Navigation & Tabs
    chats: "चैट्स",
    contacts: "संपर्क",
    people: "लोग",
    groups: "समूह",
    invites: "निमंत्रण",
    requests: "अनुरोध",
    search: "खोजें...",
    all: "सभी",
    directMessages: "सीधे संदेश",
    groupChats: "समूह चैट",
    officialChannel: "MK आधिकारिक चैनल",
    aiAssistant: "MK.ia AI सहायक",
    savedNotes: "व्यक्तिगत नोट्स",
    stories: "24 घंटे की स्टोरीज",
    analytics: "एनालिटिक्स और गतिविधि",
    settings: "सेटिंग्स",
    profile: "मेरी प्रोफ़ाइल",
    logout: "लॉग आउट",
    deleteAccount: "खाता हटाएं",
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन",
    away: "अनुपस्थित",
    typing: "टाइप कर रहे हैं...",

    // Calls
    voiceCall: "वॉयस कॉल",
    videoCall: "वीडियो कॉल",
    startVoiceCall: "वॉयस कॉल शुरू करें",
    startVideoCall: "वीडियो कॉल शुरू करें",
    incomingVoiceCall: "आने वाली वॉयस कॉल...",
    incomingVideoCall: "आने वाली वीडियो कॉल...",
    ringing: "घंटी बज रही है...",
    connecting: "ऑडियो चैनल कनेक्ट हो रहे हैं...",
    connected: "कॉल कनेक्टेड",
    callEnded: "कॉल समाप्त",
    callDuration: "कॉल की अवधि",
    muteMicrophone: "माइक म्यूट करें",
    unmuteMicrophone: "माइक अनम्यूट करें",
    turnOnCamera: "कैमरा चालू करें",
    turnOffCamera: "कैमरा बंद करें",
    endCall: "कॉल काटें",
    answerCall: "उत्तर दें",
    declineCall: "अस्वीकार करें",
    callBack: "वापस कॉल करें",
    missedCall: "मिस्ड कॉल",
    completedCall: "कॉल समाप्त",
    declinedCall: "अस्वीकृत कॉल",
    voiceTransformer: "वॉयस ट्रांसफ़ॉर्मर और इफेक्ट्स",
    voiceTransformerDesc: "कॉल के दौरान अपनी आवाज़ रीयल-टाइम में बदलें",
    voiceEffects: "वॉयस इफेक्ट्स",
    naturalVoice: "HD प्राकृतिक आवाज़",
    robotVoice: "साइबर रोबोट",
    heliumVoice: "हीलियम हाई पिच",
    deepVoice: "गहरी बेस आवाज़",
    radioVoice: "विंटेज वॉकी-टॉकी",
    echoVoice: "कॉस्मिक इको",
    anonymousVoice: "अनाम मॉड्युलेटर",
    alienVoice: "एलियन आवाज़",
    chipmunkVoice: "चिपमंक आवाज़",
    telephoneVoice: "क्लासिक फ़ोन लाइन",
    monitorVoice: "वॉयस लूपबैक",
    monitorVoiceOn: "वॉयस मॉनिटरिंग सक्षम",
    monitorVoiceOff: "वॉयस मॉनिटरिंग अक्षम",
    soundWaves: "लाइव ऑडियो स्पेक्ट्रम",
    audioClarity: "HD ऑडियो और इको रद्दीकरण सक्रिय",
    callConnecting: "ऑडियो कनेक्शन स्थापित हो रहा है...",
    peerSpeaking: "बोल रहे हैं...",
    youAreSpeaking: "आप बोल रहे हैं",
    remoteMuted: "रिमोट माइक म्यूट है",
    noEchoNotice: "द्विदिश ऑडियो कनेक्टेड। शून्य इको।",

    // Chat Room
    typeMessagePlaceholder: "संदेश लिखें या AI और कमांड के लिए $ टाइप करें...",
    send: "भेजें",
    recordVoiceNote: "वॉयस नोट रिकॉर्ड करें",
    stopRecording: "रिकॉर्डिंग रोकें",
    cancelRecording: "रद्द करें",
    reply: "उत्तर दें",
    forward: "फॉरवर्ड करें",
    copy: "कॉपी करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    deleteForMe: "मेरे लिए हटाएं",
    deleteForAll: "सभी के लिए हटाएं",
    saveToGallery: "गैलरी में सहेजें",
    forwardedMessage: "फॉरवर्ड किया गया संदेश",
    groupSettings: "समूह सेटिंग्स",
    members: "सदस्य",
    announcementsOnly: "घोषणा चैनल (केवल पढ़ने के लिए)",
    createPoll: "पोल बनाएं",
    luminousDoodle: "चमकदार डूडल",
    stickersAndGifs: "स्टिकर और GIF",
    attachMedia: "मीडिया संलग्न करें",
    photoEditor: "फ़ोटो संपादक",
    muted: "म्यूट किया गया",
    unmuted: "सूचनाएं सक्रिय",
    blockUser: "उपयोगकर्ता को ब्लॉक करें",
    unblockUser: "अनब्लॉक करें",
    report: "रिपोर्ट करें",

    // AI & Auto-Responder
    aiAutoResponder: "AI ऑटो-रिस्पॉन्डर / अनुपस्थिति सहायक",
    aiAutoResponderDesc: "आपकी अनुपस्थिति में MK.ia को पूरी बातचीत के संदर्भ के साथ जवाब देने दें",
    enableAutoResponder: "AI ऑटो-रिस्पॉन्डर सक्षम करें",
    triggerWhen: "कब ऑटो-रिप्लाई करें",
    triggerAway: "केवल अनुपस्थित / ऑफ़लाइन होने पर",
    triggerAlways: "हमेशा (हर संदेश पर)",
    targetAudience: "ऑटो-रिप्लाई किसे प्राप्त होगा",
    audienceEveryone: "सभी को (सभी चैट)",
    audienceDMs: "केवल सीधे संदेश (DMs)",
    audienceSpecific: "केवल विशिष्ट संपर्कों को",
    selectContacts: "AI के लिए संपर्क चुनें",
    responseStyle: "AI प्रतिक्रिया व्यवहार",
    styleCustom: "कस्टम निर्देश / अनुपस्थिति नोट",
    styleFreedom: "पूर्ण स्वतंत्रता (स्मार्ट प्रासंगिक सहायक)",
    customInstructions: "अनुपस्थिति निर्देश और संदर्भ",
    customInstructionsPlaceholder: "उदा: मैं शाम 4 बजे तक मीटिंग में हूँ। संदेश का विनम्रता से उत्तर दें और जरूरी बातें नोट करें।",
    aiLanguage: "AI प्रतिक्रिया भाषा",
    autoDetect: "स्वचालित भाषा पहचान",
    aiAutoReplyTag: "AI ऑटो-रिप्लाई",
    commands: "कमांड्स और AI शॉर्टकट",
    quickAiHelp: "Gemini AI को आमंत्रित करने के लिए $ या $MK लिखें",
    cmdMK: "सीधे इस चैट में Gemini AI से कुछ भी पूछें",
    cmdSummarize: "हाल की बातचीत का संक्षिप्त सारांश",
    cmdTranslate: "बातचीत का अन्य भाषा में अनुवाद",
    cmdReply: "स्मार्ट प्रासंगिक उत्तर का मसौदा बनाएं",
    cmdExplain: "किसी भी विषय या विचार को विस्तार से समझें",
    cmdCode: "कोड लिखें, जांचें और समझें",
    cmdCreative: "रचनात्मक विचार और लेखन बनाएं",
    cmdPoll: "इंटरैक्टिव पोल बनाएं",

    // Modals & General
    cancel: "रद्द करें",
    save: "सहेजें",
    close: "बंद करें",
    confirm: "पुष्टि करें",
    create: "बनाएं",
    join: "शामिल हों",
    leave: "छोड़ें",
    inviteCode: "निमंत्रण कोड",
    language: "भाषा",
    changeLanguage: "भाषा बदलें",
    english: "English",
    french: "Français",
    arabic: "العربية",
    hindi: "हिन्दी",
    chinese: "中文",
    russian: "Русский"
  },
  zh: {
    // Navigation & Tabs
    chats: "聊天",
    contacts: "联系人",
    people: "用户",
    groups: "群组",
    invites: "邀请",
    requests: "好友请求",
    search: "搜索...",
    all: "全部",
    directMessages: "私聊消息",
    groupChats: "群聊",
    officialChannel: "MK 官方频道",
    aiAssistant: "MK.ia AI 智能助手",
    savedNotes: "个人笔记",
    stories: "24小时动态",
    analytics: "数据与动态",
    settings: "设置",
    profile: "个人资料",
    logout: "退出登录",
    deleteAccount: "注销账户",
    online: "在线",
    offline: "离线",
    away: "离开",
    typing: "正在输入...",

    // Calls
    voiceCall: "语音通话",
    videoCall: "视频通话",
    startVoiceCall: "发起语音通话",
    startVideoCall: "发起视频通话",
    incomingVoiceCall: "来电语音通话...",
    incomingVideoCall: "来电视频通话...",
    ringing: "正在呼叫... 响铃中...",
    connecting: "正在连接音频通道...",
    connected: "通话已连接",
    callEnded: "通话已结束",
    callDuration: "通话时长",
    muteMicrophone: "静音麦克风",
    unmuteMicrophone: "开启麦克风",
    turnOnCamera: "开启摄像头",
    turnOffCamera: "关闭摄像头",
    endCall: "挂断通话",
    answerCall: "接听",
    declineCall: "拒绝",
    callBack: "回拨",
    missedCall: "未接来电",
    completedCall: "已结束通话",
    declinedCall: "已拒绝通话",
    voiceTransformer: "变声器与声音特效",
    voiceTransformerDesc: "在通话过程中为对方实时变换声音",
    voiceEffects: "声音特效",
    naturalVoice: "高清原声",
    robotVoice: "赛博机器人",
    heliumVoice: "高音/氦气声",
    deepVoice: "深沉低音",
    radioVoice: "复古对讲机",
    echoVoice: "宇宙回声",
    anonymousVoice: "匿名变调",
    alienVoice: "外星人音效",
    chipmunkVoice: "花栗鼠音效",
    telephoneVoice: "经典电话机",
    monitorVoice: "监听自己的变声",
    monitorVoiceOn: "已启用变声监听",
    monitorVoiceOff: "已禁用变声监听",
    soundWaves: "实时音频频谱",
    audioClarity: "高清音频与回声消除已启动",
    callConnecting: "正在建立点对点音频连接...",
    peerSpeaking: "对方正在讲话...",
    youAreSpeaking: "您正在讲话",
    remoteMuted: "对方已静音",
    noEchoNotice: "双向高清音频连接，零回声。",

    // Chat Room
    typeMessagePlaceholder: "输入消息，或输入 $ 使用 AI 与命令...",
    send: "发送",
    recordVoiceNote: "录制语音消息",
    stopRecording: "停止录制",
    cancelRecording: "取消",
    reply: "回复",
    forward: "转发",
    copy: "复制",
    edit: "编辑",
    delete: "删除",
    deleteForMe: "仅对我删除",
    deleteForAll: "对所有人删除",
    saveToGallery: "保存到相册",
    forwardedMessage: "转发的消息",
    groupSettings: "群组设置",
    members: "成员",
    announcementsOnly: "公告频道 (只读)",
    createPoll: "创建投票",
    luminousDoodle: "荧光画板",
    stickersAndGifs: "贴纸与 GIF",
    attachMedia: "添加附件",
    photoEditor: "图片编辑器",
    muted: "已静音",
    unmuted: "通知已开启",
    blockUser: "屏蔽用户",
    unblockUser: "取消屏蔽",
    report: "举报",

    // AI & Auto-Responder
    aiAutoResponder: "AI 自动回复 / 离开助手",
    aiAutoResponderDesc: "在您离开时，让 MK.ia 结合完整对话上下文智能为您代答消息",
    enableAutoResponder: "启用 AI 自动回复",
    triggerWhen: "触发时机",
    triggerAway: "仅在离开 / 离线时",
    triggerAlways: "始终回复 (所有消息)",
    targetAudience: "自动回复对象",
    audienceEveryone: "所有人 (所有聊天)",
    audienceDMs: "仅限私聊",
    audienceSpecific: "仅限指定联系人",
    selectContacts: "选择 AI 代答联系人",
    responseStyle: "AI 回复行为模式",
    styleCustom: "自定义指示 / 离开便签",
    styleFreedom: "完全自由 (智能上下文助手)",
    customInstructions: "离开指示与上下文要求",
    customInstructionsPlaceholder: "例如：我正在开会直到下午4点。请礼貌答复，解答技术疑问并记录紧急事务。",
    aiLanguage: "AI 回复语言",
    autoDetect: "自动识别语言",
    aiAutoReplyTag: "AI 自动代答",
    commands: "命令与 AI 快捷方式",
    quickAiHelp: "输入 $ 或 $MK 唤醒 Gemini 深度智能",
    cmdMK: "在当前聊天中向 Gemini AI 提问任何内容",
    cmdSummarize: "智能总结最近的对话历史",
    cmdTranslate: "将对话内容翻译为其他语言",
    cmdReply: "根据上下文起草智能回复",
    cmdExplain: "深入浅出解析概念或问题",
    cmdCode: "编写、检查并解释代码",
    cmdCreative: "进行创意头脑风暴或文案创作",
    cmdPoll: "快速发起群互动投票",

    // Modals & General
    cancel: "取消",
    save: "保存",
    close: "关闭",
    confirm: "确认",
    create: "创建",
    join: "加入",
    leave: "退出",
    inviteCode: "邀请码",
    language: "语言",
    changeLanguage: "切换语言",
    english: "English",
    french: "Français",
    arabic: "العربية",
    hindi: "हिन्दी",
    chinese: "中文",
    russian: "Русский"
  },
  ru: {
    // Navigation & Tabs
    chats: "Чаты",
    contacts: "Контакты",
    people: "Люди",
    groups: "Группы",
    invites: "Приглашения",
    requests: "Запросы",
    search: "Поиск...",
    all: "Все",
    directMessages: "Личные сообщения",
    groupChats: "Групповые чаты",
    officialChannel: "Официальный канал MK",
    aiAssistant: "MK.ia AI Ассистент",
    savedNotes: "Личные заметки",
    stories: "Истории 24ч",
    analytics: "Аналитика и активность",
    settings: "Настройки",
    profile: "Мой профиль",
    logout: "Выйти",
    deleteAccount: "Удалить аккаунт",
    online: "В сети",
    offline: "Не в сети",
    away: "Отошел",
    typing: "печатает...",

    // Calls
    voiceCall: "Голосовой звонок",
    videoCall: "Видеозвонок",
    startVoiceCall: "Начать голосовой звонок",
    startVideoCall: "Начать видеозвонок",
    incomingVoiceCall: "Входящий голосовой звонок...",
    incomingVideoCall: "Входящий видеозвонок...",
    ringing: "Вызов... Гудки...",
    connecting: "Подключение аудиоканалов...",
    connected: "Соединение установлено",
    callEnded: "Звонок завершен",
    callDuration: "Длительность",
    muteMicrophone: "Выключить микрофон",
    unmuteMicrophone: "Включить микрофон",
    turnOnCamera: "Включить камеру",
    turnOffCamera: "Выключить камеру",
    endCall: "Завершить",
    answerCall: "Ответить",
    declineCall: "Отклонить",
    callBack: "Перезвонить",
    missedCall: "Пропущенный звонок",
    completedCall: "Завершенный звонок",
    declinedCall: "Отклоненный звонок",
    voiceTransformer: "Преобразователь голоса и эффекты",
    voiceTransformerDesc: "Меняйте голос в реальном времени во время звонка для собеседника",
    voiceEffects: "Голосовые эффекты",
    naturalVoice: "HD Натуральный голос",
    robotVoice: "Кибер-робот",
    heliumVoice: "Гелиевый высокий голос",
    deepVoice: "Глубокий бас",
    radioVoice: "Винтажная рация",
    echoVoice: "Космическое эхо",
    anonymousVoice: "Анонимный модулятор",
    alienVoice: "Инопланетянин",
    chipmunkVoice: "Бурундук",
    telephoneVoice: "Старый телефон",
    monitorVoice: "Самопрослушивание",
    monitorVoiceOn: "Прослушивание своего голоса включено",
    monitorVoiceOff: "Прослушивание своего голоса выключено",
    soundWaves: "Аудиоспектр в реальном времени",
    audioClarity: "HD Аудио и шумоподавление активны",
    callConnecting: "Установка прямого аудиосоединения...",
    peerSpeaking: "Говорит...",
    youAreSpeaking: "Вы говорите",
    remoteMuted: "Собеседник отключил микрофон",
    noEchoNotice: "Двустороннее аудио без эха.",

    // Chat Room
    typeMessagePlaceholder: "Напишите сообщение или введите $ для AI и команд...",
    send: "Отправить",
    recordVoiceNote: "Записать голосовое",
    stopRecording: "Остановить запись",
    cancelRecording: "Отмена",
    reply: "Ответить",
    forward: "Переслать",
    copy: "Копировать",
    edit: "Изменить",
    delete: "Удалить",
    deleteForMe: "Удалить у меня",
    deleteForAll: "Удалить у всех",
    saveToGallery: "Сохранить в галерею",
    forwardedMessage: "Пересланное сообщение",
    groupSettings: "Настройки группы",
    members: "Участники",
    announcementsOnly: "Канал объявлений (только чтение)",
    createPoll: "Создать опрос",
    luminousDoodle: "Светящийся рисунок",
    stickersAndGifs: "Стикеры и GIF",
    attachMedia: "Прикрепить файл",
    photoEditor: "Редактор фото",
    muted: "Без звука",
    unmuted: "Уведомления включены",
    blockUser: "Заблокировать",
    unblockUser: "Разблокировать",
    report: "Пожаловаться",

    // AI & Auto-Responder
    aiAutoResponder: "AI Автоответчик / Ассистент отсутствия",
    aiAutoResponderDesc: "Позвольте MK.ia отвечать на сообщения от вашего имени с пониманием контекста во время вашего отсутствия",
    enableAutoResponder: "Включить AI Автоответчик",
    triggerWhen: "Когда отвечать автоматически",
    triggerAway: "Только когда отошел / не в сети",
    triggerAlways: "Всегда (на каждое сообщение)",
    targetAudience: "Кто получает автоответы",
    audienceEveryone: "Все (все чаты)",
    audienceDMs: "Только личные сообщения",
    audienceSpecific: "Только выбранные контакты",
    selectContacts: "Выбрать контакты для AI",
    responseStyle: "Поведение AI ответов",
    styleCustom: "Пользовательские инструкции / заметка",
    styleFreedom: "Полная свобода (Умный контекстный ассистент)",
    customInstructions: "Инструкции и контекст отсутствия",
    customInstructionsPlaceholder: "Например: Я на совещании до 16:00. Вежливо поприветствуй, ответь на технические вопросы и запиши важное.",
    aiLanguage: "Язык ответов AI",
    autoDetect: "Автоопределение языка",
    aiAutoReplyTag: "AI Автоответ",
    commands: "Команды и AI ярлыки",
    quickAiHelp: "Введите $ или $MK для вызова Gemini AI",
    cmdMK: "Спросить Gemini AI прямо в этом чате",
    cmdSummarize: "Сделать краткую сводку последних сообщений",
    cmdTranslate: "Перевести сообщения на другой язык",
    cmdReply: "Сформировать умный ответ по контексту",
    cmdExplain: "Подробно объяснить любую концепцию",
    cmdCode: "Написать, проверить или разобрать код",
    cmdCreative: "Придумать идеи или написать текст",
    cmdPoll: "Создать интерактивный опрос",

    // Modals & General
    cancel: "Отмена",
    save: "Сохранить",
    close: "Закрыть",
    confirm: "Подтвердить",
    create: "Создать",
    join: "Присоединиться",
    leave: "Покинуть",
    inviteCode: "Код приглашения",
    language: "Язык",
    changeLanguage: "Сменить язык",
    english: "English",
    french: "Français",
    arabic: "العربية",
    hindi: "हिन्दी",
    chinese: "中文",
    russian: "Русский"
  }
};

export const getSavedLanguage = (): Language => {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("wavegram_lang");
    // Ensure English is forced when requested or as crisp default
    if (saved === "en" || saved === "ar" || saved === "hi" || saved === "zh" || saved === "ru") {
      return saved as Language;
    }
    // Set and persist English as default
    localStorage.setItem("wavegram_lang", "en");
    return "en";
  }
  return "en";
};

export const setSavedLanguage = (lang: Language): void => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("wavegram_lang", lang);
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("wavegram_lang_change", { detail: lang }));
  }
};

export const saveLanguage = setSavedLanguage;
