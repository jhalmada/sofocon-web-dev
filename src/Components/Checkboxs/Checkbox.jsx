import checkmark from "../../assets/icons/checkmark.svg";
const Checkbox = ({ text }) => {
  return (
    <div className="flex items-center">
      <label className="relative flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" />
        <div className="border-gray-300 flex h-4 w-4 items-center justify-center rounded-full border-[.1rem] bg-white transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-500">
          <img
            src={checkmark}
            alt="checkmark"
            className="hidden h-4 w-4 text-white peer-checked:block"
          />
        </div>
        <p className="ml-2 text-sm font-light leading-4">{text}</p>
      </label>
    </div>
  );
};

export default Checkbox;
