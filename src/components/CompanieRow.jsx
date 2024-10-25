import { Link } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";
import watchIcon2 from "../assets/icons/Frame 1.svg";
import watchIcon3 from "../assets/icons/watch 3.svg";
import { useEffect, useState } from "react";
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

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Se asume que 'aa' es del siglo XXI
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
  const [icon, setIcon] = useState(null);
  const [msjIcon, setMsjIcon] = useState(null);

  useEffect(() => {
    const today = new Date(); // Fecha actual
    const visitDate = parseDate(nextVisits); // Fecha convertida
    console.log(visitDate);

    // Cálculo de la diferencia en meses
    const diffInDays = (visitDate, today) => {
      const msPerDay = 1000 * 60 * 60 * 24; // Milisegundos en un día
      const diffInMs = visitDate - today; // Diferencia en milisegundos
      return Math.floor(diffInMs / msPerDay); // Convertir a días y redondear hacia abajo
    };
    const result = diffInDays(visitDate, today);

    // Selección de la imagen según la diferencia en meses
    if (result <= 30) {
      setIcon(watchIcon); // Menos de 1 mes
      setMsjIcon("Cliente próximo a vencer");
    } else if (result <= 60) {
      setIcon(watchIcon2); // 2 meses
      setMsjIcon("Vencimiento en 2 meses");
    } else {
      setIcon(watchIcon3); // No se muestra ninguna imagen si supera 3 meses
      setMsjIcon("Vencimiento en mas de 2 meses");
    }
  }, [nextVisits]); // Se ejecuta cada vez que `nextVisit` cambie
  return (
    <tr className="border-b border-gray text-center">
      <div className="flex">
        {icon && <img src={icon} alt="watch icon" title={msjIcon} />}
        <td
          className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
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

      <td className="p-2">{nextVisits}</td>

      <td className="p-2 text-md font-semibold leading-[1.16rem]">
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
