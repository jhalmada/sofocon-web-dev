import { Link } from "react-router-dom";
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
const RouteCompanieDetailsRow = ({
  name,
  id,
  direction,
  nextVisits,
  state,
  notes,
  deleteIconSrc,
  onDeleteClick,
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
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={direction}
      >
        {direction}
      </td>

      <td className="py-6">{nextVisits}</td>

      <td className="py-6 text-md font-semibold leading-[1.16rem]">
        {translateState(state)}
      </td>
      <Link to={`/inicio/rutas/notes/${id}`}>
        <td className="py-6 underline">{notes}</td>
      </Link>
      <td className="py-6">
        <div className="flex justify-center">
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

export default RouteCompanieDetailsRow;
