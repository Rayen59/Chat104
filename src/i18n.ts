// Internationalization module for MK Wavegram
// Supports French (Français) as primary language and English (Anglais)

export type Language = "fr" | "en";

export interface Translations {
  // Navigation & Tabs
  chats: string;
  people: string;
  groups: string;
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
  monitorVoice: string;
  monitorVoiceOn: string;
  monitorVoiceOff: string;
  soundWaves: string;
  audioClarity: string;

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
  french: string;
  english: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    // Navigation & Onglets
    chats: "Discussions",
    people: "Contacts",
    groups: "Groupes",
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
    connecting: "Connexion en cours...",
    connected: "Connecté(e)",
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
    voiceTransformerDesc: "Transformez votre voix en temps réel pendant l'appel",
    voiceEffects: "Effets Vocaux",
    naturalVoice: "Voix Naturelle HD",
    robotVoice: "Robot Cyberpunk",
    heliumVoice: "Voix Aiguë / Hélium",
    deepVoice: "Voix Grave / Basse Profonde",
    radioVoice: "Talkie-Walkie Vintage",
    echoVoice: "Écho Cosmique",
    anonymousVoice: "Voix Anonyme",
    monitorVoice: "Retour vocal",
    monitorVoiceOn: "Écoute de ma voix modulée activée",
    monitorVoiceOff: "Écoute de ma voix modulée désactivée",
    soundWaves: "Spectre audio en direct",
    audioClarity: "Pureté audio & Réduction de bruit IA",

    // Salon de Discussion
    typeMessagePlaceholder: "Écrivez un message ou tapez @MK.ia...",
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
    french: "Français",
    english: "English"
  },
  en: {
    // Navigation & Tabs
    chats: "Chats",
    people: "People",
    groups: "Groups",
    requests: "Requests",
    search: "Search...",
    all: "All",
    directMessages: "Direct Messages",
    groupChats: "Group Chats",
    officialChannel: "MK Official Channel",
    aiAssistant: "MK.ia Assistant",
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
    connecting: "Connecting...",
    connected: "Connected",
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
    voiceTransformerDesc: "Transform your voice in real-time during the call",
    voiceEffects: "Voice Effects",
    naturalVoice: "HD Natural Voice",
    robotVoice: "Cyberpunk Robot",
    heliumVoice: "High Pitch / Helium",
    deepVoice: "Deep Bass Voice",
    radioVoice: "Vintage Walkie-Talkie",
    echoVoice: "Cosmic Echo",
    anonymousVoice: "Anonymous Modulator",
    monitorVoice: "Voice Monitor",
    monitorVoiceOn: "Voice monitoring enabled",
    monitorVoiceOff: "Voice monitoring disabled",
    soundWaves: "Live Audio Spectrum",
    audioClarity: "AI Audio Clarity & Noise Suppression",

    // Chat Room
    typeMessagePlaceholder: "Write a message or ask @MK.ia...",
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
    french: "Français",
    english: "English"
  }
};

export const getSavedLanguage = (): Language => {
  const saved = localStorage.getItem("wavegram_lang");
  if (saved === "fr" || saved === "en") return saved;
  // Default to French as requested by user
  return "fr";
};

export const setSavedLanguage = (lang: Language): void => {
  localStorage.setItem("wavegram_lang", lang);
  window.dispatchEvent(new CustomEvent("wavegram_lang_change", { detail: lang }));
};
