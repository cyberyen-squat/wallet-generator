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
	black: '#000000',
	grey: {
	  light: '#f5f5f5',
	  DEFAULT: '#808080',
	  dark: '#404040',
	},
	white: '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
