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
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative max-h-screen w-[27.75rem] max-w-[27.75rem] overflow-auto rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 hover:text-gray-700 absolute right-7 top-8 h-4 w-4"
          onClick={onClose}
        >
          <img src={XlgIcon} alt="Close icon" className="h-6 w-6" />
        </button>
        <h2 className="mb-8 text-lg font-semibold">{title}</h2>
        {variant === "confirmation" ? (
          <div>
            <p className="mb-6">{children}</p>
            <div className="flex justify-between">
              {buttons.includes("back") && (
                <Button
                  text="Volver"
                  color="cancel"
                  icon={ChevronLeftIcon}
                  iconPosition="left"
                  onClick={onClose}
                />
              )}
              {buttons.includes("accept") && (
                <Button
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
            <div className="space-y-3">{children}</div>
            <div className="mt-10 flex justify-between">
              {buttons.includes("cancel") && (
                <Button
                  text="Cancelar"
                  color="cancel"
                  type="button"
                  onClick={handleCancelClick}
                  iconPosition="left"
                />
              )}
              {buttons.includes("save") && (
                <Button
                  text="GUARDAR"
                  color="save"
                  type="submit"
                  icon={CheckLgIcon}
                  iconPosition="right"
                />
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReusableModal;
