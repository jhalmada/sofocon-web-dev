import { Link } from "react-router-dom";

const RouteCompanieDetailsRow = ({
  name,
  direction,
  nextVisits,
  state,
  notes,
  deleteIconSrc,
  onDeleteClick,
}) => {
  return (
    <tr className="border-b border-gray">
      <td className="p-2">{name}</td>

      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={direction}
      >
        {direction}
      </td>

      <td className="p-2">{nextVisits}</td>

      <td className="p-2 text-md leading-[1.16rem]">{state}</td>
      <Link to={"/inicio/empresas/notas"}>
        <td className="p-2 underline">{notes}</td>
      </Link>
      <td className="p-2">
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
