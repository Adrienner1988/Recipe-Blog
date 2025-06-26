/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      // Base UI - These typically override defaults or define core semantic colors
      white: "hsl(0, 0%, 100%)",
      black: "hsl(240, 10%, 3.9%)",
      background: "hsl(240, 10%, 99%)",
      foreground: "hsl(240, 10%, 3.9%)",
      card: "hsl(0, 0%, 100%)",
      "card-foreground": "hsl(240, 10%, 3.9%)",
      popover: "hsl(0, 0%, 100%)",
      "popover-foreground": "hsl(240, 10%, 3.9%)",

      // Primary brand – Plum pink
      primary: "hsl(346.8, 77.2%, 49.8%)", // Mapped 'plum' to 'primary'
      "primary-foreground": "hsl(355.7, 100%, 97.3%)", // Mapped 'plum-foreground' to 'primary-foreground'

      // Secondary brand – Mint green
      secondary: "hsl(142.1, 70.2%, 40.3%)", // Mapped 'mint' to 'secondary'
      "secondary-foreground": "hsl(355.7, 100%, 97.3%)", // Mapped 'mint-foreground' to 'secondary-foreground'

      // Accent – Golden yellow
      accent: "hsl(43.1, 95.5%, 56.9%)", // Mapped 'gold' to 'accent'
      "accent-foreground": "hsl(25, 95%, 53.1%)", // Mapped 'gold-foreground' to 'accent-foreground'

      // Muted – Grays
      muted: "hsl(240, 4.8%, 95.9%)",
      "muted-foreground": "hsl(240, 3.8%, 46.1%)",

      // Error / Destructive
      destructive: "hsl(0, 84.2%, 60.2%)", // Mapped 'red' to 'destructive'
      "destructive-foreground": "hsl(0, 0%, 98%)", // Mapped 'red-foreground' to 'destructive-foreground'

      // UI Elements
      border: "hsl(240, 5.9%, 90%)",
      input: "hsl(240, 5.9%, 90%)",
      ring: "hsl(346.8, 77.2%, 49.8%)", // Mapped 'plum' to 'ring'
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Lora", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      height: {
        "350px": "350px",
      },
      boxShadow: {
        "custom-light": "0px 4px 8px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0px 6px 12px rgba(0, 0, 0, 0.2)",
        "text-shadow": "1px 1px 2px rgba(0, 0, 0, 0.8)",
      },
      // Explicit custom colors (useful if not directly mapped to semantic names, or for gradients)
      colors: {
        // <-- These colors are now explicitly inside `extend.colors`
        plum: "hsl(346.8, 77.2%, 49.8%)", 
        lightPlum: "hsl(355.7, 100%, 97.3%)", // As used in your H1
        "gradient-pink-start": "#F596D3", // Specific color for the start of your "Discover" gradient
        "gradient-pink-end": "#D247BF", // Specific color for the end of your "Discover" gradient
      },
    },
  },
  plugins: [],
};
