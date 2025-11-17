/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

const BarcodeReader = ({ onBarcodeChange, closeModal }) => {
  const codigoRef = useRef(null);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const inputElement = codigoRef.current;
    inputElement.focus();

    inputElement.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const code = inputElement.value.trim();
        console.log("Código leído:", code);

        // 👉 Aquí haces tu acción
        setBarcodeValue(code);
        onBarcodeChange(code);
        closeModal();
        inputElement.value = ""; // Limpia el campo para el siguiente escaneo
      }
    });
    return () => {
      inputElement.removeEventListener("keydown", () => {});
    };
  }, []);

  const handleInputChange = (event) => {
    const codigo = event.target.value;
    setBarcodeValue(codigo);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (codigo.length > 0) {
          onBarcodeChange(codigo);
          closeModal();
        }
      }, 500),
    );
  };

  return (
    <div>
      <input
        className="border-gray-300 w-full rounded-lg border p-2 outline-none"
        type="text"
        ref={codigoRef}
        autoFocus
        placeholder="Click aquí, luego scanea"
        onChange={handleInputChange}
        value={barcodeValue}
      />
      <br />
    </div>
  );
};

export default BarcodeReader;
