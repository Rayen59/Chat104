export interface AppTheme {
  id: string;
  name: string;
  category: "dark" | "light" | "oled" | "vibrant";
  previewColors: {
    bg: string;
    sidebar: string;
    accent: string;
    bubbleOut: string;
    bubbleIn: string;
  };
  description: string;
  cssVariables: Record<string, string>;
}

export const APP_THEMES: AppTheme[] = [
  {
    id: "classic-blue",
    name: "Classic Wavegram",
    category: "dark",
    description: "Iconic Telegram-inspired dark blue canvas with vibrant azure accents.",
    previewColors: {
      bg: "#0e1621",
      sidebar: "#17212b",
      accent: "#3390ec",
      bubbleOut: "#2b5278",
      bubbleIn: "#182533"
    },
    cssVariables: {
      "--app-bg": "#0e1621",
      "--app-sidebar": "#17212b",
      "--app-card": "#17212b",
      "--app-card-hover": "#202b36",
      "--app-card-active": "#2b5278",
      "--app-border": "#131b26",
      "--app-border-light": "#242f3d",
      "--app-accent": "#3390ec",
      "--app-accent-hover": "#2481cc",
      "--app-accent-rgb": "51, 144, 236",
      "--app-text": "#ffffff",
      "--app-text-muted": "#7d8b99",
      "--app-bubble-out": "#2b5278",
      "--app-bubble-in": "#182533",
      "--app-bubble-out-text": "#ffffff",
      "--app-bubble-in-text": "#ffffff"
    }
  },
  {
    id: "midnight-oled",
    name: "Midnight OLED",
    category: "oled",
    description: "Pure pitch-black battery saver with high-contrast electric cyan highlights.",
    previewColors: {
      bg: "#000000",
      sidebar: "#09090b",
      accent: "#06b6d4",
      bubbleOut: "#083344",
      bubbleIn: "#111827"
    },
    cssVariables: {
      "--app-bg": "#000000",
      "--app-sidebar": "#09090b",
      "--app-card": "#0f0f12",
      "--app-card-hover": "#18181b",
      "--app-card-active": "#164e63",
      "--app-border": "#18181b",
      "--app-border-light": "#27272a",
      "--app-accent": "#06b6d4",
      "--app-accent-hover": "#0891b2",
      "--app-accent-rgb": "6, 182, 212",
      "--app-text": "#fafafa",
      "--app-text-muted": "#a1a1aa",
      "--app-bubble-out": "#083344",
      "--app-bubble-in": "#111827",
      "--app-bubble-out-text": "#ecfeff",
      "--app-bubble-in-text": "#f4f4f5"
    }
  },
  {
    id: "cyberpunk-purple",
    name: "Cyberpunk Nebula",
    category: "vibrant",
    description: "Deep galactic purple background paired with luminous neon violet accents.",
    previewColors: {
      bg: "#0c071e",
      sidebar: "#140c2e",
      accent: "#a855f7",
      bubbleOut: "#4c1d95",
      bubbleIn: "#1e1338"
    },
    cssVariables: {
      "--app-bg": "#0c071e",
      "--app-sidebar": "#140c2e",
      "--app-card": "#180e38",
      "--app-card-hover": "#22144d",
      "--app-card-active": "#581c87",
      "--app-border": "#211245",
      "--app-border-light": "#331c69",
      "--app-accent": "#a855f7",
      "--app-accent-hover": "#9333ea",
      "--app-accent-rgb": "168, 85, 247",
      "--app-text": "#ffffff",
      "--app-text-muted": "#a78bfa",
      "--app-bubble-out": "#581c87",
      "--app-bubble-in": "#1e1338",
      "--app-bubble-out-text": "#faf5ff",
      "--app-bubble-in-text": "#f3e8ff"
    }
  },
  {
    id: "emerald-matrix",
    name: "Emerald Forest",
    category: "vibrant",
    description: "Deep dark evergreen canvas with radiant mint green accents.",
    previewColors: {
      bg: "#05130b",
      sidebar: "#0b2014",
      accent: "#10b981",
      bubbleOut: "#064e3b",
      bubbleIn: "#0f2e1d"
    },
    cssVariables: {
      "--app-bg": "#05130b",
      "--app-sidebar": "#0b2014",
      "--app-card": "#0e291a",
      "--app-card-hover": "#133b26",
      "--app-card-active": "#047857",
      "--app-border": "#0f3320",
      "--app-border-light": "#194d31",
      "--app-accent": "#10b981",
      "--app-accent-hover": "#059669",
      "--app-accent-rgb": "16, 185, 129",
      "--app-text": "#ffffff",
      "--app-text-muted": "#6ee7b7",
      "--app-bubble-out": "#064e3b",
      "--app-bubble-in": "#0f2e1d",
      "--app-bubble-out-text": "#ecfdf5",
      "--app-bubble-in-text": "#f0fdf4"
    }
  },
  {
    id: "sunset-crimson",
    name: "Sunset Crimson",
    category: "vibrant",
    description: "Smoky obsidian with fiery ruby red and warm coral accents.",
    previewColors: {
      bg: "#15080a",
      sidebar: "#220e12",
      accent: "#f43f5e",
      bubbleOut: "#881337",
      bubbleIn: "#2e1219"
    },
    cssVariables: {
      "--app-bg": "#15080a",
      "--app-sidebar": "#220e12",
      "--app-card": "#2a1217",
      "--app-card-hover": "#3b1920",
      "--app-card-active": "#9f1239",
      "--app-border": "#36161d",
      "--app-border-light": "#4c1f29",
      "--app-accent": "#f43f5e",
      "--app-accent-hover": "#e11d48",
      "--app-accent-rgb": "244, 63, 94",
      "--app-text": "#ffffff",
      "--app-text-muted": "#fda4af",
      "--app-bubble-out": "#881337",
      "--app-bubble-in": "#2e1219",
      "--app-bubble-out-text": "#fff1f2",
      "--app-bubble-in-text": "#ffe4e6"
    }
  },
  {
    id: "solar-amber",
    name: "Solar Gold",
    category: "dark",
    description: "Rich dark espresso with luminous warm gold and amber accents.",
    previewColors: {
      bg: "#120e06",
      sidebar: "#1f180c",
      accent: "#f59e0b",
      bubbleOut: "#78350f",
      bubbleIn: "#2b2111"
    },
    cssVariables: {
      "--app-bg": "#120e06",
      "--app-sidebar": "#1f180c",
      "--app-card": "#261e0f",
      "--app-card-hover": "#362a15",
      "--app-card-active": "#92400e",
      "--app-border": "#332612",
      "--app-border-light": "#4a381b",
      "--app-accent": "#f59e0b",
      "--app-accent-hover": "#d97706",
      "--app-accent-rgb": "245, 158, 11",
      "--app-text": "#ffffff",
      "--app-text-muted": "#fcd34d",
      "--app-bubble-out": "#78350f",
      "--app-bubble-in": "#2b2111",
      "--app-bubble-out-text": "#fffbeb",
      "--app-bubble-in-text": "#fef3c7"
    }
  },
  {
    id: "arctic-frost",
    name: "Arctic Slate",
    category: "dark",
    description: "Deep nordic slate with crisp icy-blue highlights.",
    previewColors: {
      bg: "#0b131e",
      sidebar: "#132132",
      accent: "#38bdf8",
      bubbleOut: "#075985",
      bubbleIn: "#192c42"
    },
    cssVariables: {
      "--app-bg": "#0b131e",
      "--app-sidebar": "#132132",
      "--app-card": "#182a40",
      "--app-card-hover": "#1f3652",
      "--app-card-active": "#0369a1",
      "--app-border": "#1b3049",
      "--app-border-light": "#28466b",
      "--app-accent": "#38bdf8",
      "--app-accent-hover": "#0284c7",
      "--app-accent-rgb": "56, 189, 248",
      "--app-text": "#ffffff",
      "--app-text-muted": "#7dd3fc",
      "--app-bubble-out": "#075985",
      "--app-bubble-in": "#192c42",
      "--app-bubble-out-text": "#f0f9ff",
      "--app-bubble-in-text": "#e0f2fe"
    }
  },
  {
    id: "clean-light",
    name: "Daylight Crisp",
    category: "light",
    description: "Clean modern light theme with soft slate backgrounds and vivid ocean blue.",
    previewColors: {
      bg: "#f1f5f9",
      sidebar: "#ffffff",
      accent: "#0284c7",
      bubbleOut: "#0284c7",
      bubbleIn: "#e2e8f0"
    },
    cssVariables: {
      "--app-bg": "#f1f5f9",
      "--app-sidebar": "#ffffff",
      "--app-card": "#ffffff",
      "--app-card-hover": "#f8fafc",
      "--app-card-active": "#e0f2fe",
      "--app-border": "#e2e8f0",
      "--app-border-light": "#cbd5e1",
      "--app-accent": "#0284c7",
      "--app-accent-hover": "#0369a1",
      "--app-accent-rgb": "2, 132, 199",
      "--app-text": "#0f172a",
      "--app-text-muted": "#64748b",
      "--app-bubble-out": "#0284c7",
      "--app-bubble-in": "#e2e8f0",
      "--app-bubble-out-text": "#ffffff",
      "--app-bubble-in-text": "#0f172a"
    }
  }
];

const THEME_STORAGE_KEY = "wavegram_app_theme";

export function getSavedTheme(): string {
  if (typeof window === "undefined") return "classic-blue";
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved && APP_THEMES.some((t) => t.id === saved)) {
    return saved;
  }
  return "classic-blue";
}

export function applyTheme(themeId: string): void {
  const theme = APP_THEMES.find((t) => t.id === themeId) || APP_THEMES[0];
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    Object.entries(theme.cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute("data-theme", theme.id);
    root.setAttribute("data-theme-category", theme.category);
    
    // Update body background
    if (document.body) {
      document.body.style.backgroundColor = theme.cssVariables["--app-bg"];
      document.body.style.color = theme.cssVariables["--app-text"];
    }
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme.id);
  window.dispatchEvent(new CustomEvent("wavegram_theme_change", { detail: theme }));
}
