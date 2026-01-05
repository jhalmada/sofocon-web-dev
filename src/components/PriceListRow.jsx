import { useNavigate } from "react-router-dom";

const PriceListRow = ({
  name,
  totalClients,
  totalProducts,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
  listPriceIcon,
  onClientsClick,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <td
        className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
        title={name}
        onClick={() => navigate(`/inicio/productos/lista/${id}/${name}`)}
      >
        {name}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={totalClients}
      >
        {totalClients === 0 ? "Asignado a todas las " : totalClients}
        {"  "}
        {totalClients === 1 ? "Empresa" : "Empresas"}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={totalProducts}
      >
        {totalProducts} {totalProducts === 1 ? "Producto" : "Productos"}
      </td>
      <td className="py-6">
        <div className="flex justify-center gap-4">
          <img
            src={listPriceIcon}
            alt="list price icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onClientsClick}
          />
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

export default PriceListRow;
