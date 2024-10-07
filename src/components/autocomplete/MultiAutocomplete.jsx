import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import circleX from "../../assets/icons/x-circle-fill.svg";

const MultiAutocomplete = ({
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  errors,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleSelectOption = (option) => {
    if (!value.find((v) => v.id === option.id)) {
      onChange([...value, option]);
      onBlur(); // Notificar el cambio
    }
    setInputValue("");
    setFilteredOptions(options);
  };

  const handleRemoveOption = (optionToRemove) => {
    onChange(value.filter((option) => option.id !== optionToRemove.id));
    onBlur(); // Notificar el cambio
  };

  return (
    <div>
      <div className="my-2 flex">
        {value.map((option) => (
          <span
            key={option}
            className="flex max-w-[8rem] items-center rounded-2xl border-1 border-black_l px-2 py-1"
          >
            <label className="mr-1 block max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap">
              {option.label}
            </label>

            <button onClick={() => handleRemoveOption(option)}>
              <img src={circleX} className="min-h-[1rem] min-w-[1rem]"></img>
            </button>
          </span>
        ))}
      </div>
      <input
        className={`h-10 w-full rounded-xl border px-2 ${errors ? "border-red_e" : "border-black_l"} font-roboto outline-none`}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {inputValue && (
        <div className="mt-1 rounded-xl border">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="cursor-pointer p-[0.5rem]"
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiAutocomplete;
