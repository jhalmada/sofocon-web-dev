/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black_b: "#140000",
        black_m: "#140000",
        black_l: "#D9D9D9",
        white: "#F8F8F8",
        red_b: "#9A0000",
        red_m: "#D70000",
        red_l: "#F93E3E",
        pink_b: "#F09393",
        pink_l: "#F7CCCC",
        blue_b: "#1E5EDA",
        blue_l: "#5E95FF",
      },
      boxShadow: {
        bl: "2px 3px 6px rgba(0, 0, 0, 0.2)",
        br: "1px 3px 4px rgba(0, 0, 0, 0.2)",
        t: "1px -2px 4px rgba(0, 0, 0, 0.2)",
        blur: "3px 5px 10px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        roboto: ['"Roboto Flex"', "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "20px",
        lg: "24px",
      },
    },
  },
  plugins: [],
};
