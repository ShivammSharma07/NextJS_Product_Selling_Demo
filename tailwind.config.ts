import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          951: "#f4eee5",
          952: "#222",
          953: "#E9E4D8",
        },
        green: {
          951: "#9CAE96",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
