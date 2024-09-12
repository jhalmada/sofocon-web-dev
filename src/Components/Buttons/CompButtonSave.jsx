const CompButtonSave = ({ text }) => {
  return (
    <button className="flex h-[40px] items-center justify-center gap-[10px] rounded-[20px] bg-red_b px-[40px] py-[4px] shadow-blur">
      <h2 className="text-sm font-medium leading-[24px] text-white">{text}</h2>
      <img
        src="/assets/icons/check-lg.svg"
        alt="plus-icon"
        className="h-[16px] w-[16px]"
      />
    </button>
  );
};

export default CompButtonSave;
