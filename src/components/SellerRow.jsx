import { Select, SelectItem } from "@nextui-org/select";

const SellerRow = ({
  fullName,
  email,
  route,
  state,
  info,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr className="border-b border-gray">
      <td className="p-2">{fullName}</td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={email}
      >
        {email}
      </td>
      <td className="p-2">{route}</td>
      <td className="p-2 text-md font-semibold leading-[1.16rem]">
        <Select placeholder={state} className="mb-4 mt-4 rounded-lg border">
          <SelectItem>Inactivo</SelectItem>
          <SelectItem>Activo</SelectItem>
        </Select>
      </td>
      <td className="cursor-pointer p-2 underline">{info}</td>
      <td className="p-2">
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

export default SellerRow;
