const RouteSellerDetailsRow = ({
  name,
  contact,
  state,
  onDeleteClick,
  deleteIconSrc,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
        title={name}
      >
        {name}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={contact}
      >
        {contact}
      </td>

      <td className="py-6 text-md leading-[1.16rem]">{state}</td>
      <td className="py-6">
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
