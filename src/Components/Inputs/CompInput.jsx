const CompInput = ({ placeholder, label }) => {
  return (
    <div className="text-left">
      <label htmlFor="password" className="font-roboto text-xl font-medium">
        {label}
      </label>
      <div
        style={{
          position: "relative",
          width: "435px",
          height: "45px",
          marginBottom: "20px",
        }}
      >
        <input
          type={"text"}
          placeholder={placeholder}
          className="font-roboto relative h-[100%] w-[100%] rounded-md border border-black p-[10px] pl-[10px] pr-[40px] text-[16px] font-light"
        />
      </div>
    </div>
  );
};

export default CompInput;
