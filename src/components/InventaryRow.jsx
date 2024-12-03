import { Select, SelectItem } from "@nextui-org/select";

const InventaryRow = ({
  name,
  description,
  stock,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td className="py-6 text-left">{name}</td>
      <td className="py-6">{description}</td>
      <td className="py-6">{stock}</td>
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
