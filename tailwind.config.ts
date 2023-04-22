import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 50px 0px rgba(255, 255, 255, 0.25)",
        glowBlue: "0 0 20px 0px rgba(56, 189, 248, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
