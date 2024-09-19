const Button = ({
  text,
  onClick,
  icon,
  color,
  type = "button",
  iconPosition = "right",
}) => {
  const colorClasses = {
    default: "bg-blue_b text-white shadow-blur",
    save: "bg-red_b text-white shadow-blur",
    cancel: "bg-white text-gray-800",
  };

  const buttonColorClass = colorClasses[color] || colorClasses.default;

  return (
    <div className="flex w-full justify-center">
      <button
        className={`relative flex h-10 min-w-[10.2rem] items-center justify-center rounded-2xl px-5 py-1 ${buttonColorClass} gap-2 ${iconPosition === "left" ? "flex-row-reverse" : "flex-row"}`}
        onClick={onClick}
        type={type}
      >
        <span className="text-sm font-medium leading-6">{text}</span>
        {icon && <img src={icon} alt="icon" className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default Button;
