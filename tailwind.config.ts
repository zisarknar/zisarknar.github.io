import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#363636",
        "mario-red": "#ff3333",
        "mario-blue": "#5c94fc",
        "mario-green": "#00cc00",
        "mario-yellow": "#ffd700",
        "mario-orange": "#f4a742",
        "mario-brown": "#8b4513",
        "mario-ground": "#c84c0c",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
