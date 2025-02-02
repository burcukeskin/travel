/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        "sidebar-bg": "var(--sidebar-bg)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        "accent-1": "var(--accent-1)",
        "accent-2": "var(--accent-2)",
        border: "var(--border)",
      },
      boxShadow: {
        custom: "var(--shadow)",
        "custom-hover": "var(--shadow-hover)",
      },
    },
  },
  plugins: [],
};
