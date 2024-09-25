const CompanieRow = ({
  name,
  departament,
  direction,
  sellers,
  notes,
  nextVisits,
  state,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr>
      <td className="p-2">{name}</td>
      <td className="p-2">{departament}</td>
      <td className="p-2">{direction}</td>
      <td className="p-2">{sellers}</td>
      <td className="cursor-pointer p-2 underline">{notes}</td>
      <td className="p-2">{nextVisits}</td>
      <td className="p-2">{state}</td>
      <td className="p-2">
        <div className="flex gap-5">
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

export default CompanieRow;
