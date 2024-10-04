import { Select, SelectItem } from "@nextui-org/select";
import { useNavigate } from "react-router-dom";

const RouteRow = ({
  name,
  zone,
  companies,
  sellers,
  state,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/inicio/rutas/mapa`);
  };
  return (
    <tr
      className="cursor-pointer border-b border-gray transition-all duration-300 hover:bg-gray"
      onClick={handleRowClick}
    >
      <td className="p-2">{name}</td>
      <td className="p-2">{zone}</td>
      <td className="p-2">{companies}</td>
      <td className="p-2">{sellers}</td>

      <td className="p-2 text-md font-semibold leading-[1.16rem]">
        <Select
          defaultSelectedKeys={[state ? "true" : "false"]}
          className="mb-4 mt-4 rounded-lg border"
        >
          <SelectItem key={"true"}>Activo</SelectItem>
          <SelectItem key={"false"}>Inactivo</SelectItem>
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

export default RouteRow;
