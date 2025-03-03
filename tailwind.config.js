/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            h1: {
              color: "inherit",
              marginTop: "2rem",
              marginBottom: "1rem",
              fontSize: "2.25rem",
              fontWeight: "700",
              lineHeight: "1.2",
            },
            h2: {
              color: "inherit",
              marginTop: "2rem",
              marginBottom: "1rem",
              fontSize: "1.875rem",
              fontWeight: "700",
              lineHeight: "1.2",
            },
            h3: {
              color: "inherit",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "1.3",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.75",
            },
            a: {
              color: "#FF6B00",
              textDecoration: "none",
              "&:hover": {
                color: "#E65D00",
                textDecoration: "underline",
              },
            },
            strong: {
              color: "inherit",
              fontWeight: "600",
            },
            ul: {
              marginTop: "1rem",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
              listStyleType: "disc",
            },
            ol: {
              marginTop: "1rem",
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
              listStyleType: "decimal",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            "ul > li": {
              paddingLeft: "0.5rem",
            },
            "ol > li": {
              paddingLeft: "0.5rem",
            },
            blockquote: {
              fontStyle: "italic",
              color: "inherit",
              borderLeftWidth: "4px",
              borderLeftColor: "#FF6B00",
              paddingLeft: "1rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              backgroundColor: "rgba(255, 107, 0, 0.05)",
            },
            code: {
              color: "inherit",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              fontSize: "0.875em",
              color: "#E5E7EB",
            },
            pre: {
              backgroundColor: "#1F2937",
              padding: "1rem",
              borderRadius: "0.5rem",
              overflow: "auto",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            img: {
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              borderRadius: "0.5rem",
            },
            hr: {
              marginTop: "2rem",
              marginBottom: "2rem",
              borderColor: "rgba(156, 163, 175, 0.2)",
            },
          },
        },
        lg: {
          css: {
            h1: { fontSize: "2.5rem" },
            h2: { fontSize: "2rem" },
            h3: { fontSize: "1.75rem" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
