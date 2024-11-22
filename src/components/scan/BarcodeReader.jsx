import React, { useEffect, useRef } from "react";

const BarcodeReader = () => {
  const codigoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (evento) => {
      if (evento.keyCode === 13) {
        const codigoDeBarras = codigoRef.current.value;
        console.log("Tenemos un código de barras:");
        console.log(codigoDeBarras);
        codigoRef.current.value = "";
      }
    };

    const inputElement = codigoRef.current;
    inputElement.addEventListener("keydown", handleKeyDown);

    return () => {
      inputElement.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <input
        className="border-gray-300 w-full rounded-lg border p-2 outline-none"
        type="text"
        ref={codigoRef}
        placeholder="Enfoca este input y usa el lector"
      />
      <br />
    </div>
  );
};

export default BarcodeReader;
