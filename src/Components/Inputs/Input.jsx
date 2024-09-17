import { useState } from "react";

const Input = ({
  placeholder,
  label,
  msjError,
  type = "text",
  icon1 = null,
  icon2 = null,
  value,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;

  return (
    <div className="w-full text-left">
      <label
        htmlFor={type}
        className={`font-roboto font-medium ${error ? "text-red_e" : "text-black"} text-md`}
      >
        {label}
      </label>
      <div className="relative mb-9 h-11 w-full">
        <input
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`relative h-full w-full rounded-md border p-2.5 pl-2.5 pr-10 font-roboto text-sm font-light placeholder-black_m outline-none ${
            error
              ? "border-red_e placeholder-red_e"
              : "placeholder-gray-400 border-black"
          } font-light leading-4`}
          onFocus={() => setError(false)}
        />
        {type === "password" && (
          <span
            onClick={toggleVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {isVisible ? (
              <img
                src={icon1}
                alt="Visible Icon"
                className="h-[1.13rem] w-[1.13rem]"
              />
            ) : (
              <img
                src={icon2}
                alt="Hidden Icon"
                className="h-[1.13rem] w-[1.13rem]"
              />
            )}
          </span>
        )}
        {icon1 && type === "text" && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <img src={icon1} alt="icon" className="h-[1.13rem] w-[1.13rem]" />
          </span>
        )}
        {error && <p className="font-roboto text-xs text-red_e">{msjError}</p>}
      </div>
    </div>
  );
};

export default Input;
