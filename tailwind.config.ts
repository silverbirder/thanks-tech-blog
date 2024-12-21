import { type Config } from "tailwindcss";

const HUE = 40;
const LINK_HUE = 220;
const DESTRUCTIVE_HUE = 0;
const LIGHTNESS_OFFSET = 53;

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: `hsl(${HUE}, 85%, 95%)`,
        foreground: `hsl(${HUE}, 85%, 5%)`,
        card: {
          DEFAULT: `hsl(${HUE}, 85%, 95%)`,
          foreground: `hsl(${HUE}, 85%, 5%)`,
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: createColor(HUE, 85),
        secondary: createColor(HUE, 95),
        muted: createColor(HUE, 75),
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: createColor(DESTRUCTIVE_HUE, 85),
        border: `hsl(${HUE}, 25%, 45%)`,
        input: `hsl(${HUE}, 35%, 55%)`,
        ring: `hsl(${HUE}, 60%, 65%)`,
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        link: {
          DEFAULT: `hsl(${LINK_HUE}, 85%, 50%)`,
          hover: `hsl(${LINK_HUE}, 85%, 40%)`,
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

function createColor(hue: number, saturation: number) {
  return {
    DEFAULT: `hsl(${hue}, ${saturation}%, 54%)`,
    foreground: `hsl(${hue}, ${saturation}%, ${54 - LIGHTNESS_OFFSET}%)`,
  };
}
