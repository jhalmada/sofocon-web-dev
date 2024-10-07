import Button from "../buttons/Button";
import ChevronLeftIcon from "../../assets/icons/chevron-left.svg";
import CheckLgIcon from "../../assets/icons/check-lg.svg";
import XlgIcon from "../../assets/icons/x-lg.svg";

const ReusableModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  variant,
  buttons = [],
  handleCancelClick,
  onAccept,
  width = "w-[27.75rem]",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative max-h-screen ${width} overflow-auto rounded-lg bg-white p-8 shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 hover:text-gray-700 absolute right-10 top-8 h-4 w-4"
          onClick={onClose}
        >
          <img src={XlgIcon} alt="Close icon" className="h-6 w-6" />
        </button>
        <h2 className="mb-8 text-lg font-semibold">{title}</h2>
        {variant === "confirmation" ? (
          <div className="space-y-8">
            <p className="space-y-6 text-sm font-medium leading-[1rem]">
              {children}
            </p>
            <div className="flex justify-between">
              {buttons.includes("back") && (
                <Button
                  text="Volver"
                  color="cancel"
                  icon={ChevronLeftIcon}
                  iconPosition="left"
                  onClick={onClose}
                  width="w-20"
                />
              )}
              {buttons.includes("accept") && (
                <Button
                  type="onSubmit"
                  text="ACEPTAR"
                  color="save"
                  icon={CheckLgIcon}
                  iconPosition="right"
                  onClick={() => {
                    if (onAccept) onAccept();
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="space-y-8">{children}</div>
            <div className="mt-10 flex justify-between">
              {buttons.includes("cancel") && (
                <Button
                  text="Cancelar"
                  color="cancel"
                  type="button"
                  onClick={handleCancelClick}
                  iconPosition="left"
                  width="w-20"
                />
              )}
              {buttons.includes("save") && (
                <div>
                  <Button
                    text="GUARDAR"
                    color="save"
                    type="submit"
                    icon={CheckLgIcon}
                    iconPosition="right"
                  />
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReusableModal;
