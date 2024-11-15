import { Select, SelectItem } from "@nextui-org/select";

const UserRow = ({
  fullName,
  email,
  role,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
  state,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td className="py-6 text-left">{fullName}</td>
      <td className="py-6">{email}</td>
      <td className="py-6">{role}</td>
      <td className="py-6 text-md font-semibold leading-[1.16rem]">
        {state ? "Activo" : "Inactivo"}
      </td>
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

export default UserRow;
