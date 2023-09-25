/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#1a110a",
        background: "#f3e8e2",
        primary: "#376986",
        secondary: "#e4ccbe",
        accent: "#3e7798",
      },
      boxShadow: {
        layers:
          "rgba(62, 119, 152, 0.4) 0px 5px, rgba(62, 119, 152, 0.3) 0px 10px, rgba(62, 119, 152, 0.2) 0px 15px, rgba(62, 119, 152, 0.1) 0px 20px, rgba(62, 119, 152, 0.05) 0px 25px",
        "layers-skeleton":
          "rgba(181, 181, 181, 0.4) 0px 5px, rgba(181, 181, 181, 0.3) 0px 10px, rgba(181, 181, 181, 0.2) 0px 15px, rgba(181, 181, 181, 0.1) 0px 20px, rgba(181, 181, 181, 0.05) 0px 25px",
      },
    },
  },
  plugins: [],
};
