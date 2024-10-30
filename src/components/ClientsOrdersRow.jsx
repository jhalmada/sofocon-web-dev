import { useNavigate } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";
const translateState = (state) => {
  switch (state) {
    case "REQUEST":
      return "Solicitado";
    case "PREPARATION":
      return "En preparación";
    case "READY":
      return "Listo para retirar";
    case "EXIT":
      return "Egreso";
    default:
      return state;
  }
};

const ClientsOrdersRow = ({
  name,
  orderId,
  date,
  seller,
  state,
  id,
  deleteIconSrc,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/inicio/ordenes/ordenes-clientes`);
  };
  const options = [
    "Solicitado",
    "En preparación",
    "Listo para retirar",
    "Egreso",
  ];
  return (
    <tr className="cursor-pointer border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <div className="mt-2 flex">
        <img
          src={watchIcon}
          alt="watch icon"
          title="Cliente próximo a vencer"
        />
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left"
          onClick={handleRowClick}
          title={name}
        >
          {name}
        </td>
      </div>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        onClick={handleRowClick}
        title={orderId}
      >
        {orderId}
      </td>
      <td
        className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        onClick={handleRowClick}
        title={date}
      >
        {date}
      </td>

      <td className="p-2" onClick={handleRowClick}>
        {seller}
      </td>

      <td
        className="p-2 text-md font-semibold leading-[1.16rem]"
        onClick={handleRowClick}
      >
        {translateState(state)}
      </td>
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

export default ClientsOrdersRow;
