const PriceListRow = ({
  name,
  totalClients,
  totalProducts,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left"
        title={name}
      >
        {name}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={totalClients}
      >
        {totalClients} {totalClients === 1 ? "Empresa" : "Empresas"}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={totalProducts}
      >
        {totalProducts} {totalProducts === 1 ? "Producto" : "Productos"}
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

export default PriceListRow;
