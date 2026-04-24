import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f4efe8",
        mist: "#161412",
        coral: "#c59159",
        gold: "#d0a46c",
        pine: "#6c9b67",
        ember: "#0f0d0c",
        metal: "#c9a06a",
        "metal-soft": "#927253",
        line: "rgba(222, 191, 148, 0.16)"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(220, 184, 136, 0.08), 0 20px 50px rgba(0, 0, 0, 0.28)"
      },
      fontFamily: {
        display: ['"Arial Narrow"', '"Aptos Narrow"', '"Helvetica Neue"', "sans-serif"],
        sans: ['"Inter"', '"Avenir Next"', '"Segoe UI"', "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 18% 12%, rgba(210,162,101,0.16), transparent 24%), radial-gradient(circle at 82% 22%, rgba(201,152,94,0.12), transparent 18%), linear-gradient(180deg, #070707 0%, #0d0b0a 44%, #090807 100%)",
        "metal-sheen":
          "linear-gradient(135deg, rgba(242,223,192,0.98) 0%, rgba(203,163,106,0.92) 42%, rgba(124,86,52,0.92) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
