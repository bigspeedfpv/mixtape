import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glowBlue: "0 0 20px 0px rgba(56, 189, 248, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
