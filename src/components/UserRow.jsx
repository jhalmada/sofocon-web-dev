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
  const opciones = ["Activo", "Inactivo"];
  return (
    <tr className="border-b border-gray">
      <td className="p-2">{fullName}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{role}</td>
      <td className="p-2 text-md font-semibold leading-[1.16rem]">
        <Select
          defaultSelectedKeys={[state ? "Activo" : "Inactivo"]}
          className="mb-4 mt-4 rounded-lg border"
        >
          {opciones.map((opcion) => (
            <SelectItem key={opcion}>{opcion}</SelectItem>
          ))}
        </Select>
      </td>
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

export default UserRow;
