/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      utilities: {
        ".scrollbar-hide": {
          "-ms-overflow-style": "auto" /* Mostrar barra en IE y Edge */,
          "scrollbar-width": "thin" /* Barra delgada en Firefox */,
          "&::-webkit-scrollbar": {
            width: "8px" /* Ancho de la barra en Webkit */,
            height: "8px" /* Alto de la barra en Webkit */,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4A90E2" /* Color de la barra */,
            borderRadius: "4px" /* Bordes redondeados */,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0" /* Color del fondo de la barra */,
          },
        },
      },
      colors: {
        black_b: "#140000",
        black_m: "#555555",
        black_l: "#9F9F9F",
        gray: "#D9D9D9",
        white: "#F8F8F8",
        red_e: "#9A0000",
        red_b: "#E03030",
        red_m: "#E46666",
        red_l: "#F09393",
        pink: "#F7CCCC",
        blue_b: "#4071D1",
        blue_l: "#81ACFF",
        green: "#25B574",
        yellow: "#F3A826",
        previw_1: "#F7CCCC",
        previw_2: "#F09393",
        previw_3: "#E46666",
      },
      boxShadow: {
        bl: "2px 3px 6px rgba(0, 0, 0, 0.2)",
        br: "1px 3px 4px rgba(0, 0, 0, 0.2)",
        t: "1px -2px 4px rgba(0, 0, 0, 0.2)",
        blur: "3px 5px 10px rgba(0, 0, 0, 0.3)",
        lg: "0px 16px 24px 2px rgba(0, 0, 0, 0.14)",
        card: "2px 3px 8px 2px rgba(0, 0, 0, 0.3)",
        n: "1px -2px 2px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        roboto: ['"Roboto Flex"', "sans-serif"],
      },
      fontSize: {
        xxs: "10px",
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
  darkMode: "class",
  plugins: [
    nextui(),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "auto" /* Mostrar barra en IE y Edge */,
          "scrollbar-width": "thin" /* Barra delgada en Firefox */,
          "&::-webkit-scrollbar": {
            width: "8px" /* Ancho de la barra en Webkit */,
            height: "8px" /* Alto de la barra en Webkit */,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4A90E2" /* Color de la barra */,
            borderRadius: "4px" /* Bordes redondeados */,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0" /* Color del fondo de la barra */,
          },
        },
      });
    },
  ],
};
