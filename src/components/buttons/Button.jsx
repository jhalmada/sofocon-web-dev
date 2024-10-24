const Button = ({
  text,
  onClick,
  icon,
  color,
  shadow = "shadow-none",
  rounded = "rounded-2xl",
  type = "button",
  iconPosition = "right",
  width = "min-w-[11rem]",
  justify = "justify-center",
  disabled = false,
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
        disabled={disabled}
        className={`relative flex h-10 ${width} items-center justify-center ${rounded} px-5 py-1 ${buttonColorClass} gap-2 ${iconPosition === "left" ? "flex-row-reverse" : "flex-row"} ${shadow}`}
        onClick={onClick}
        type={type}
      >
        <span className={text ? "text-sm font-semibold leading-6" : "hidden"}>
          {text}
        </span>
        {icon && <img src={icon} alt="icon" className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default Button;
