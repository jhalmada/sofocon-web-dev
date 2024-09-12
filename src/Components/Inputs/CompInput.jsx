import { useState } from "react";

const CompInput = ({
  placeholder,
  label,
  msjError,
  labelSize = "14px",
  width = "100%",
}) => {
  const [error, setError] = useState(false);
  const colorError = "#9A0000";
  return (
    <div className="text-left">
      <label
        htmlFor="password"
        className="font-roboto font-medium"
        style={{ color: error ? colorError : "black", fontSize: labelSize }}
      >
        {label}
      </label>
      <div className="relative mb-[35px] h-[45px]" style={{ width: width }}>
        <input
          type={"text"}
          placeholder={placeholder}
          className={`relative h-[100%] w-[100%] rounded-md border p-[10px] pl-[10px] pr-[40px] font-roboto text-sm font-light placeholder-black_m ${error ? "placeholder-[#9A0000]" : "border-black placeholder-gray-400"} font-light leading-[16px]`}
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
