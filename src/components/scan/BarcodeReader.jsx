import { useEffect, useRef } from "react";

const BarcodeReader = ({ onBarcodeChange }) => {
  const codigoRef = useRef(null);
  const handleInputChange = (event) => {
    const codigo = event.target.value;
    onBarcodeChange(codigo);
  };
  useEffect(() => {
    const handleKeyDown = (evento) => {
      if (evento.keyCode === 13) {
        evento.preventDefault();
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
        onChange={handleInputChange}
      />
      <br />
    </div>
  );
};

export default BarcodeReader;
