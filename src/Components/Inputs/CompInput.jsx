import { useState } from "react";

const CompInput = ({ placeholder, label, msjError }) => {
  const [error, setError] = useState(false);
  const colorError = "#9A0000";
  return (
    <div className="text-left">
      <label
        htmlFor="password"
        className="font-roboto text-xl font-medium"
        style={{ color: error ? colorError : "black" }}
      >
        {label}
      </label>
      <div
        style={{
          position: "relative",
          width: "435px",
          height: "45px",
          marginBottom: "35px",
        }}
      >
        <input
          type={"text"}
          placeholder={placeholder}
          className={`relative h-[100%] w-[100%] rounded-md border p-[10px] pl-[10px] pr-[40px] font-roboto text-[16px] font-light ${error ? "placeholder-[#9A0000]" : "border-black placeholder-gray-400"}`}
          onFocus={() => setError(false)}
          style={{
            borderColor: error ? colorError : "black",
          }}
        />
        {error && (
          <p className="font-roboto text-xs" style={{ color: colorError }}>
            {msjError}
          </p>
        )}
      </div>
    </div>
  );
};

export default CompInput;
