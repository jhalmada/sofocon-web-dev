import React from "react";

const CompButtonAdd = ({ text, onClick }) => {
  return (
    <button
      className="flex h-[40px] items-center justify-between rounded-[20px] bg-blue_b px-[20px] py-[4px] shadow-blur"
      onClick={onClick}
    >
      <h2 className="text-md font-medium leading-[24px] text-white">{text}</h2>
      <img
        src="/assets/icons/plus.svg"
        alt="plus-icon"
        className="h-[30px] w-[30px]"
      />
    </button>
  );
};

export default CompButtonAdd;
