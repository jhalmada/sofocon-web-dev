import { Link } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";
import watchIcon2 from "../assets/icons/Frame 1.svg";
import watchIcon3 from "../assets/icons/watch 3.svg";
import puntosvertical from "../assets/icons/three-dots-vertical.svg";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
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
  return new Date(year, month - 1, day);
};

const CompanieRow = ({
  name,
  departament,
  neighborhood,
  direction,
  sellers,
  sellersIcon,
  nextVisits,
  state,
  editIconSrc,
  deleteIconSrc,
  notesIcon,
  onEditClick,
  onDeleteClick,
  onClick,
  id,
  listPriceIcon,
  onClickListPrice,
  onClick2,
}) => {
  const [icon, setIcon] = useState(null);
  const [msjIcon, setMsjIcon] = useState(null);

  useEffect(() => {
    const today = new Date();
    const visitDate = parseDate(nextVisits);

    const diffInDays = (visitDate, today) => {
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffInMs = visitDate - today;
      return Math.floor(diffInMs / msPerDay);
    };
    const result = diffInDays(visitDate, today);
    if (result <= 30) {
      setIcon(watchIcon);
      setMsjIcon("Cliente próximo a vencer");
    } else if (result <= 60) {
      setIcon(watchIcon2);
      setMsjIcon("Vencimiento en 2 meses");
    } else {
      setIcon(watchIcon3);
      setMsjIcon("Vencimiento en mas de 2 meses");
    }
  }, [nextVisits]);
  return (
    <tr className="border-b border-gray text-center">
      <div className="flex">
        {icon && <img src={icon} alt="watch icon" title={msjIcon} />}
        <td
          className="max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap py-6 2xl:max-w-[10rem]"
          title={name}
        >
          {name}
        </td>
      </div>
      <td
        className="max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap py-6 2xl:max-w-[10rem]"
        title={direction}
      >
        {direction}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={departament}
      >
        {departament}
      </td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap py-6"
        title={neighborhood}
      >
        {neighborhood}
      </td>

      <td className="py-6">{nextVisits}</td>

      <td className="py-6 text-md font-semibold leading-[1.16rem]">
        {translateState(state)}
      </td>
      <td className="py-6">
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
          <Dropdown onClick={onClick2}>
            <DropdownTrigger>
              <img src={puntosvertical} alt="ss" className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="notes">
                <Link to={`notas/${id}`} className="flex gap-3">
                  <img
                    src={notesIcon}
                    alt="notes icon"
                    className="h-5 w-5 cursor-pointer"
                  />
                  Notas
                </Link>
              </DropdownItem>
              <DropdownItem key="sellers">
                <div className="flex gap-3" onClick={onClick}>
                  <img
                    src={sellersIcon}
                    alt="seller icon"
                    className="h-5 w-5 cursor-pointer"
                  />
                  Vendedores
                </div>
              </DropdownItem>
              <DropdownItem key="listPrice">
                <div onClick={onClickListPrice} className="flex gap-3">
                  <img
                    src={listPriceIcon}
                    alt="list price icon"
                    className="h-5 w-5 cursor-pointer"
                  />
                  Lista de precios
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
};

export default CompanieRow;
