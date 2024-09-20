/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black_b: "#140000",
        black_m: "#555555",
        black_l: "#9F9F9F",
        white: "#F8F8F8",
        red_e: "#9A0000",
        red_b: "#E03030",
        red_m: "#F15151",
        red_l: "#F09393",
        red_e: "#9A0000",
        pink: "#F7CCCC",
        blue_b: "#4071D1",
        blue_l: "#81ACFF",
        gray: "#D9D9D9",
      },
      boxShadow: {
        bl: "2px 3px 6px rgba(0, 0, 0, 0.2)",
        br: "1px 3px 4px rgba(0, 0, 0, 0.2)",
        t: "1px -2px 4px rgba(0, 0, 0, 0.2)",
        blur: "3px 5px 10px rgba(0, 0, 0, 0.3)",
        lg: "0px 16px 24px 2px rgba(0, 0, 0, 0.14)",
      },
      fontFamily: {
        roboto: ['"Roboto Flex"', "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
      },
      backgroundImage: {
        login: "url('assets/login/ImgElipse2.png')",
      },
    },
  },
  plugins: [],
};
