import { useState } from "react";

const CompInput = ({ placeholder, label, msjError }) => {
  const [error, setError] = useState(false);
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
          type={"text"}
          placeholder={placeholder}
          className={`relative h-full w-full rounded-md border p-2.5 pl-2.5 pr-10 font-roboto text-sm font-light placeholder-black_m ${error ? "border-red_e placeholder-red_e" : "placeholder-gray-400 border-black"} font-light leading-4`}
          onFocus={() => setError(false)}
        />
        {error && <p className="text-red_e font-roboto text-xs">{msjError}</p>}
      </div>
    </div>
  );
};

export default CompInput;
