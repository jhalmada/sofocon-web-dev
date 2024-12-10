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
      border = "border",
      placeholderColor = "placeholder-gray-400",
      bg = "bg-transparent",
      width = "w-full",
      mb = "mb-3",
      fontWeight = "font-normal",
      onInput,
      hidden = false,
      value,

      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const handleChange = (e) => {
      const value = e.target.value;
      if (type === "number") {
        const numericValue = value.replace(/\D/g, "");
        e.target.value = numericValue;
      }
      if (onChange) {
        onChange(e);
      }
    };

    const inputType =
      type === "password" ? (isVisible ? "text" : "password") : type;

    return (
      <div className={`${width}`}>
        <label
          htmlFor={name}
          className={`font-roboto font-light ${
            errorApi || msjError ? "text-red_e" : "text-black"
          } text-sm`}
        >
          {label}
        </label>
        <div className={`relative ${mb} h-10 w-full`}>
          <input
            name={name}
            {...props}
            ref={ref}
            type={inputType === "number" ? "text" : inputType}
            title={placeholder}
            placeholder={placeholder}
            inputMode={type === "number" ? "numeric" : undefined}
            pattern={type === "number" ? "[0-9]*" : undefined}
            className={`${placeholderColor} ${fontWeight} ${
              hidden ? "hidden" : ""
            } relative h-10 ${bg} w-full rounded-md ${border} p-2.5 pl-2.5 pr-10 font-roboto text-sm outline-none ${
              errorApi || msjError
                ? "border-red_e placeholder-red_e"
                : "border-gray-300"
            }`}
            onChange={handleChange}
            onInput={onInput}
            value={value}
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
