import { useState } from "react";

const CompInputPass = ({ placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ position: "relative", width: "435px", height: "45px" }}>
      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        className="relative h-[100%] w-[100%] rounded-md border border-black p-[10px] pl-[10px] pr-[40px] text-[16px]"
      />
      <span
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      >
        {isVisible ? (
          <img
            src="/src/assets/Iconos/IconEye.svg"
            alt="Ojo abierto"
            style={{ width: "18px", height: "18px" }}
          />
        ) : (
          <img
            src="/src/assets/Iconos/IconEyeSlash.svg"
            alt="Ojo cerrado"
            style={{ width: "18px", height: "18px" }}
          />
        )}
      </span>
    </div>
  );
};

export default CompInputPass;
