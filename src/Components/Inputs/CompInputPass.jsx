import { useState } from "react";
import IconEye from "../../assets/Iconos/IconEye.svg";
import IconEyeSlash from "../../assets/Iconos/IconEyeSlash.svg";

const CompInputPass = ({ placeholder, label, msjError }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="text-left">
      <label
        htmlFor="password"
        className={`font-roboto font-medium ${error ? "text-red_e" : "text-black"} text-md`}
      >
        {label}
      </label>
      <div className="relative mb-9 h-11 w-full">
        <input
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className={`relative h-full w-full rounded-md border p-2.5 pl-2.5 pr-10 font-roboto text-sm font-light placeholder-black_m ${error ? "border-red_e placeholder-red_e" : "placeholder-gray-400 border-black"} font-light leading-4`}
          onFocus={() => setError(false)}
        />
        <span
          onClick={toggleVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {isVisible ? (
            <img
              src={IconEye}
              alt="Ojo abierto"
              className="h-[1.13rem] w-[1.13rem]"
            />
          ) : (
            <img
              src={IconEyeSlash}
              alt="Ojo cerrado"
              className="h-[1.13rem] w-[1.13rem]"
            />
          )}
        </span>
        {error && <p className="text-red_e font-roboto text-xs">{msjError}</p>}
      </div>
    </div>
  );
};

export default CompInputPass;
