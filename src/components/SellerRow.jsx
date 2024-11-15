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
    <tr className="border-b border-gray text-center">
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
        title={fullName}
      >
        {fullName || "Nombre no disponible"}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={email}
      >
        {email}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={route}
      >
        {route}
      </td>

      <td className="py-6 text-center text-md leading-[1.16rem]">
        {state ? "Activo" : "Inactivo"}
      </td>
      <td className="cursor-pointer py-6 text-center underline">{info}</td>
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

export default SellerRow;
