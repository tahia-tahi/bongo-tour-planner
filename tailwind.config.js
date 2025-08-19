// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bangladeshlight: {
          primary: "#2C6E49",
          secondary: "#F4B400",
          accent: "#4AA3DF",
          neutral: "#222831",
          "base-100": "#FAFAF8",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    defaultTheme: "bangladeshlight",
  },
};
