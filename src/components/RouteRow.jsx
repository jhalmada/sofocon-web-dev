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
    <tr className="border-b border-gray transition-all duration-300 hover:bg-gray">
      <>
        <td className="cursor-pointer p-2" onClick={handleRowClick}>
          {name}
        </td>
        <td className="cursor-pointer p-2" onClick={handleRowClick}>
          {zone}
        </td>
        <td className="cursor-pointer p-2" onClick={handleRowClick}>
          {companies}
        </td>
        <td className="cursor-pointer p-2" onClick={handleRowClick}>
          {sellers}
        </td>

        <td className="p-2 text-md font-semibold leading-[1.16rem]">
          <Select
            defaultSelectedKeys={[state ? "true" : "false"]}
            className="mb-4 mt-4 rounded-lg border"
          >
            <SelectItem key={"true"}>Activo</SelectItem>
            <SelectItem key={"false"}>Inactivo</SelectItem>
          </Select>
        </td>
      </>

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
