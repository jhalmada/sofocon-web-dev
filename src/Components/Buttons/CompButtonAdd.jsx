import PlusIcon from "../../assets/Iconos/plus.svg";
const CompButtonAdd = ({ text, onClick }) => {
  return (
    <button
      className="flex h-10 items-center justify-between rounded-2xl bg-blue_b px-5 py-1 shadow-blur"
      onClick={onClick}
    >
      <h2 className="text-md font-medium leading-6 text-white">{text}</h2>
      <img src={PlusIcon} alt="plus icon" className="h-8 w-8" />
    </button>
  );
};

export default CompButtonAdd;
