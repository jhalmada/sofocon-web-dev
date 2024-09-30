import watchIcon from "../assets/icons/watch.svg";
const CompetingRow = ({
  name,
  direction,
  currentCompany,
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
      <td className="p-2">{direction}</td>
      <td className="p-2">{currentCompany}</td>
      <div className="flex">
        <td className="p-2">{nextVisits}</td>
        <img src={watchIcon} alt="watch icon" />
      </div>
      <td className="p-2 text-md font-semibold leading-[1.16rem]">{state}</td>
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

export default CompetingRow;
