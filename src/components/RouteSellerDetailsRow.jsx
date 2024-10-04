const RouteSellerDetailsRow = ({
  name,
  contact,
  state,
  onDeleteClick,
  deleteIconSrc,
}) => {
  return (
    <tr>
      <td className="p-2">{name}</td>
      <td className="p-2">{contact}</td>

      <td className="p-2 text-md leading-[1.16rem]">{state}</td>
      <td className="p-2">
        <div className="flex justify-center gap-4">
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

export default RouteSellerDetailsRow;
