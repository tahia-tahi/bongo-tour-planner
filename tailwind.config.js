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
        // 🌞 Light Theme
        bangladeshlight: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "primary": "#2C6E49",        // Rich green (nature)
          "secondary": "#F4B400",      // Golden mustard (culture)
          "accent": "#4AA3DF",         // Sky/river blue
          "neutral": "#222831",        // Dark charcoal (text)
          "base-100": "#FAFAF8",       // Soft white background
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      {
        // 🌙 Dark Theme
        bangladeshdark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "primary": "#57CC99",        // Soft green
          "secondary": "#FFCF56",      // Warm golden
          "accent": "#4D96FF",         // Calm blue
          "neutral": "#F2F2F2",        // Light text
          "base-100": "#121212",       // Dark background
          "info": "#93E5FC",
          "success": "#00C896",
          "warning": "#FACC15",
          "error": "#F97373",
        },
      },
    ],
    // Set default theme
    darkTheme: "bangladeshdark",
    defaultTheme: "bangladeshlight",
  },
}
