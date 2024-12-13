import { Select, SelectItem } from "@nextui-org/select";
import { IMAGE_BASE } from "../utils/Constants";
import defaultIcon from "../assets/images/defaultIcono.png";

const InventaryRow = ({
  name,
  description,
  stock,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
  picture,
  isToRecharge,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td className="w-10">
        <img
          src={picture !== null ? `${IMAGE_BASE}${picture}` : defaultIcon}
          alt={name}
          className="h-8 w-8 rounded-full"
        />
      </td>
      <td className="py-6 text-left">{name}</td>
      <td className="py-6">{description}</td>
      <td className="py-6">{stock}</td>
      <td className="py-6">{isToRecharge === "true" ? "Si" : "No"}</td>
      <td className="py-6">
        <div className="flex justify-center gap-4">
          <img
            src={editIconSrc}
            alt="Edit icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onEditClick}
          />
          <img
            src={deleteIconSrc}
            alt="Delete icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onDeleteClick}
          />
        </div>
      </td>
    </tr>
  );
};

export default InventaryRow;
