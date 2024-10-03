const Button = ({
  text,
  onClick,
  icon,
  color,
  shadow = "shadow-none",
  type = "button",
  iconPosition = "right",
  width = "min-w-[11rem]",
  justify = "justify-center",
}) => {
  const colorClasses = {
    default: "bg-blue_b text-white shadow-blur",
    save: "bg-red_b text-white shadow-blur",
    cancel: "bg-white text-gray-800 ",
    selected: "bg-gray text-black_b shadow-blur justify-between",
  };

  const buttonColorClass = colorClasses[color] || colorClasses.default;

  return (
    <div className={`flex ${justify} `}>
      <button
        className={`relative flex h-10 ${width} items-center justify-center rounded-2xl px-5 py-1 ${buttonColorClass} gap-2 ${iconPosition === "left" ? "flex-row-reverse" : "flex-row"} ${shadow}`}
        onClick={onClick}
        type={type}
      >
        <span className="text-sm font-semibold leading-6">{text}</span>
        {icon && <img src={icon} alt="icon" className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default Button;
