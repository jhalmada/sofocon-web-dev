const Button = ({ text, onClick, type, icon }) => {
  const typeClasses = {
    default: "bg-blue_b text-white shadow-blur",
    save: "bg-red_b text-white shadow-blur",
    cancel: "bg-white ",
  };

  const buttonTypeClass = typeClasses[type] || typeClasses.default;

  return (
    <button
      className={`flex h-10 items-center justify-between rounded-2xl px-5 py-1 ${buttonTypeClass} gap-2`}
      onClick={onClick}
    >
      <h2 className="text-md font-medium leading-6">{text}</h2>
      {icon && <img src={icon} alt="icon" className="h-5 w-5" />}
    </button>
  );
};

export default Button;
