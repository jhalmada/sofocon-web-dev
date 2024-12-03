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
    <tr className="border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <>
        <td
          onClick={handleRowClick}
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
          title={name}
        >
          {name}
        </td>
        <td
          onClick={handleRowClick}
          className="max-w-[10rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={zone}
        >
          {zone}
        </td>
        <td
          onClick={handleRowClick}
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={companies}
        >
          {companies}
        </td>
        <td
          onClick={handleRowClick}
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={sellers}
        >
          {sellers}
        </td>

        <td className="py-6 text-center text-md leading-[1.16rem]">
          {state ? "Activo" : "Inactivo"}
        </td>
      </>

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

export default RouteRow;
