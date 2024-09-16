import CheckLgIcon from "../../assets/Iconos/check-lg.svg";
const CompButtonSave = ({ text }) => {
  return (
    <button className="flex h-10 items-center justify-center gap-2.5 rounded-2xl bg-red_b px-10 py-1 shadow-blur">
      <h2 className="text-sm font-medium leading-6 text-white">{text}</h2>
      <img src={CheckLgIcon} alt="check-lg icon" className="h-4 w-4" />
    </button>
  );
};

export default CompButtonSave;
