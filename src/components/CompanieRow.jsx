import { Link } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";
const translateState = (state) => {
  switch (state) {
    case "POTENTIAL":
      return "Potencial";
    case "UNSUBSCRIBED":
      return "De baja";
    case "FRECUENT":
      return "Frecuente";
    case "COMPETENCE":
      return "Competencia";
    default:
      return state;
  }
};

const CompanieRow = ({
  name,
  departament,
  direction,
  sellers,
  nextVisits,
  state,
  editIconSrc,
  deleteIconSrc,
  notesIcon,
  onEditClick,
  onDeleteClick,
  onClick,
  id,
}) => {
  return (
    <tr className="border-b border-gray">
      <div className="flex">
        <img
          src={watchIcon}
          alt="watch icon"
          title="Cliente próximo a vencer"
        />
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={name}
        >
          {name}
        </td>
      </div>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={departament}
      >
        {departament}
      </td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={direction}
      >
        {direction}
      </td>
      <td onClick={onClick} className="cursor-pointer p-2 underline">
        {sellers}
      </td>

      <td className="p-2 text-center">{nextVisits}</td>

      <td className="p-2 text-center text-md font-semibold leading-[1.16rem]">
        {translateState(state)}
      </td>
      <td className="p-2">
        <div className="flex justify-center gap-4">
          <Link to={`notas/${id}`}>
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

export default CompanieRow;
