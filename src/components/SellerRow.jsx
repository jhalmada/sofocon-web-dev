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
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={fullName}
      >
        {fullName}
      </td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={email}
      >
        {email}
      </td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={route}
      >
        {route}
      </td>

      <td className="p-2 text-center text-md leading-[1.16rem]">
        {state ? "Activo" : "Inactivo"}
      </td>
      <td className="cursor-pointer p-2 text-center underline">{info}</td>
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
