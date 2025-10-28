import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: "oklch(var(--card))",
        "card-foreground": "oklch(var(--card-foreground))",
        popover: "oklch(var(--popover))",
        "popover-foreground": "oklch(var(--popover-foreground))",
        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",
        secondary: "oklch(var(--secondary))",
        "secondary-foreground": "oklch(var(--secondary-foreground))",
        muted: "oklch(var(--muted))",
        "muted-foreground": "oklch(var(--muted-foreground))",
        accent: "oklch(var(--accent))",
        "accent-foreground": "oklch(var(--accent-foreground))",
        destructive: "oklch(var(--destructive))",
        "destructive-foreground": "oklch(var(--destructive-foreground))",
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        sidebar: "oklch(var(--sidebar))",
        "sidebar-foreground": "oklch(var(--sidebar-foreground))",
        "sidebar-primary": "oklch(var(--sidebar-primary))",
        "sidebar-primary-foreground": "oklch(var(--sidebar-primary-foreground))",
        "sidebar-accent": "oklch(var(--sidebar-accent))",
        "sidebar-accent-foreground": "oklch(var(--sidebar-accent-foreground))",
        "sidebar-border": "oklch(var(--sidebar-border))",
        "sidebar-ring": "oklch(var(--sidebar-ring))",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontWeight: {
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(({ addVariant }) => {
      addVariant("dark", "&:is(.dark *)");
    }),
  ],
};

export default config;
