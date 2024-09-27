import { useState, forwardRef } from "react";

const Input = forwardRef(
  (
    {
      placeholder,
      label,
      msjError,
      type = "text",
      icon1 = null,
      icon2 = null,
      errorApi = false,
      name,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const inputType =
      type === "password" ? (isVisible ? "text" : "password") : type;

    return (
      <div className="w-full">
        <label
          htmlFor={name} // Cambiado para usar `name`
          className={`font-roboto font-light ${errorApi || msjError ? "text-red_e" : "text-black"} text-sm`}
        >
          {label}
        </label>
        <div className="relative mb-3 h-11 w-full">
          <input
            name={name} // Cambiado para usar `name`
            {...props}
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className={`placeholder-gray-400 relative h-10 w-full rounded-md border p-2.5 pl-2.5 pr-10 font-roboto text-sm outline-none ${
              errorApi || msjError
                ? "border-red_e placeholder-red_e"
                : "border-gray-300"
            }`}
            onChange={onChange}
          />
          {type === "password" && (
            <span
              onClick={toggleVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {isVisible ? (
                <img src={icon1} alt="Visible Icon" className="h-4 w-4" />
              ) : (
                <img src={icon2} alt="Hidden Icon" className="h-4 w-4" />
              )}
            </span>
          )}
          {errorApi || msjError ? (
            <p className="font-roboto text-xs text-red_e">{msjError}</p>
          ) : null}
        </div>
      </div>
    );
  },
);

export default Input;
