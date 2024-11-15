const ProductsinListRow = ({
  name,
  price,
  category,
  onDeleteClick,
  deleteIconSrc,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
        title={name || "Sin nombre"}
      >
        {name || "Sin nombre"}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={price || 0}
      >
        {price || 0}
      </td>

      <td className="py-6 text-md leading-[1.16rem]">
        {category || "Sin categoria"}
      </td>
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

export default ProductsinListRow;
