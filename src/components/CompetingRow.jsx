import { Link } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";

const CompetingRow = ({
  name,
  direction,
  currentCompany,
  nextVisits,
  state,
  editIconSrc,
  deleteIconSrc,
  notesIcon,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr>
      <div className="flex">
        <img
          src={watchIcon}
          alt="watch icon"
          title="Cliente próximo a vencer"
        />
        <td className="p-2">{name}</td>
      </div>
      <td className="max-w-[15rem] p-2">{direction}</td>
      <td className="p-2">{currentCompany}</td>
      <td className="p-2">{nextVisits}</td>
      <td className="p-2 text-md font-semibold leading-[1.16rem]">{state}</td>
      <td className="p-2">
        <div className="flex justify-center gap-4">
          <Link to={"notas"}>
            <img
              src={notesIcon}
              alt="notes icon"
              className="h-5 w-5 cursor-pointer"
            />
          </Link>
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
