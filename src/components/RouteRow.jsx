import { Select, SelectItem } from "@nextui-org/select";
import { s } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const RouteRow = ({
  id,
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
    navigate(`/inicio/rutas/mapa/${id}`);
  };
  return (
    <tr
      className="border-b border-gray transition-all duration-300 hover:bg-gray"
      onClick={handleRowClick}
    >
      <>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={name}
        >
          {name}
        </td>
        <td
          className="max-w-[10rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={zone}
        >
          {zone}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2 text-center"
          title={companies}
        >
          {companies}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2 text-center"
          title={sellers}
        >
          {sellers}
        </td>

        <td className="p-2 text-center text-md leading-[1.16rem]">
          {state ? "Activo" : "Inactivo"}
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
