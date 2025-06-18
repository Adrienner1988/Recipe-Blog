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
      // Primary Colors
      primary: "hsl(346.8 77.2% 49.8%)",
      "primary-foreground": "hsl(355.7 100% 97.3%)",

      // Secondary Colors
      secondary: "hsl(142.1 70.2% 40.3%)",
      "secondary-foreground": "hsl(355.7 100% 97.3%)",

      // Accent Colors
      accent: "hsl(43.1 95.5% 56.9%)",
      "accent-foreground": "hsl(25 95% 53.1%)",

      // Neutral Colors
      background: "hsl(240 10% 99%)",
      foreground: "hsl(240 10% 3.9%)",
      muted: "hsl(240 4.8% 95.9%)",
      "muted-foreground": "hsl(240 3.8% 46.1%)",

      // UI Element Colors
      // Assuming "Card: White backgrounds with dark text" means pure white for the card background.
      card: "hsl(0 0% 100%)", // Pure white for card background
      border: "hsl(240 5.9% 90%)",
      input: "hsl(240 5.9% 90%)", // Same as border color
      destructive: "hsl(0 84.2% 60.2%)",
    },
    // Define your custom font families.
    // 'sans' and 'serif' are standard Tailwind categories.
    fontFamily: {
      sans: ["Poppins", "sans-serif"], // Set Poppins as the default sans-serif font
      serif: ["Lora", "serif"], // Set Lora as the default serif font
      // If you still plan to use Montserrat for any specific elements, keep it.
      // Otherwise, you can remove it as Poppins is now your primary sans-serif.
      // Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      // Your existing extend properties remain here,
      // as they add to Tailwind's defaults rather than overwriting.
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
    },
  },
  plugins: [],
};
