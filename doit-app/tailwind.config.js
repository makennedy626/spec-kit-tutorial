/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',   // Light blue background
          500: '#2196f3',  // Blue accent
          600: '#1976d2',  // Darker blue
        },
        secondary: {
          500: '#81c784',  // Light green
          600: '#66bb6a',  // Darker green
        },
        accent: {
          500: '#ff9800',  // Orange for highlights
        },
        destructive: {
          500: '#f44336',  // Red for delete
          600: '#d32f2f',  // Darker red
        }
      }
    },
  },
  plugins: [],
}