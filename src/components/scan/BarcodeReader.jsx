import { useEffect, useRef, useState } from "react";

const BarcodeReader = ({ onBarcodeChange }) => {
  const codigoRef = useRef(null);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const inputElement = codigoRef.current;
    inputElement.focus();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setBarcodeValue('');
        codigoRef.current.value = '';
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {

      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleInputChange = (event) => {
    const codigo = event.target.value;
    setBarcodeValue(codigo);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      if (codigo.length > 0) { 
        onBarcodeChange(codigo);
      }
    }, 500)); 
  };

  return (
    <div>
      <input
        className="border-gray-300 w-full rounded-lg border p-2 outline-none"
        type="text"
        ref={codigoRef}
        placeholder="Click aquí, luego scanea"
        onChange={handleInputChange}
        value={barcodeValue}
      />
      <br />
    </div>
  );
};

export default BarcodeReader;
