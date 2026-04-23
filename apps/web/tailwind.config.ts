import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D1B1E",
        mist: "#ECF1EE",
        coral: "#FF6B4A",
        gold: "#F5BC52",
        pine: "#153931"
      },
      boxShadow: {
        panel: "0 16px 50px rgba(13, 27, 30, 0.08)"
      },
      fontFamily: {
        display: ['"Avenir Next"', '"Segoe UI"', "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(245,188,82,0.35), transparent 28%), radial-gradient(circle at top right, rgba(255,107,74,0.18), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
