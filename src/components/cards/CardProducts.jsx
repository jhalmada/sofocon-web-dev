import Arrow from "../../assets/icons/arrow-left.svg";
import { IMAGE_BASE } from "../../utils/Constants";
import editIcon from "../../assets/icons/pencil-square.svg";
import deleteIcon from "../../assets/icons/trash3.svg";

const CardProducts = ({
  img,
  name,
  description,
  totalProducts,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex h-[16.25rem] w-[21.25rem] flex-col justify-between rounded-[0.875rem] p-4 shadow-blur">
      <div className="h-[6.5rem] w-[100%] rounded-[0.63rem]">
        <img
          src={`${IMAGE_BASE}${img}`}
          alt="imagen"
          className="h-[6.5rem] w-[100%] rounded-[0.63rem]"
        />
      </div>
      <div className="flex justify-end gap-2">
        <img
          src={editIcon}
          alt="editar"
          className="h-4 w-4 cursor-pointer"
          onClick={onEdit}
        />
        <img
          src={deleteIcon}
          alt="eliminar"
          className="h-4 w-4 cursor-pointer"
          onClick={onDelete}
        />
      </div>
      <div className="h-24">
        <p className="text-[1.125rem] font-semibold uppercase">{name}</p>
        <p className="text-xs font-light">{`${totalProducts} items`}</p>
        <div className="flex">
          <p className="Class Properties w-[90%] text-sm font-normal leading-[0.875rem]">
            {description}
          </p>
          <img src={Arrow} className="w-[10%] rotate-180 cursor-pointer"></img>
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
