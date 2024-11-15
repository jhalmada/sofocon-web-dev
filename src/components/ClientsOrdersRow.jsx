import { useNavigate } from "react-router-dom";
const translateState = (state) => {
  switch (state) {
    case "REQUEST":
      return "Solicitado";
    case "PREPARATION":
      return "En preparación";
    case "READY_PICKUP":
      return "Para retirar";
    case "EGRESS":
      return "Egreso";
    case "DELIVERED":
      return "Entregado";
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
    navigate(`/inicio/ordenes/ordenes-clientes/${id}`);
  };

  return (
    <tr className="cursor-pointer border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
        onClick={handleRowClick}
        title={name}
      >
        {name}
      </td>

      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
        onClick={handleRowClick}
        title={orderId}
      >
        {orderId}
      </td>
      <td
        className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap py-6"
        onClick={handleRowClick}
        title={date}
      >
        {date}
      </td>

      <td className="py-6" onClick={handleRowClick}>
        {seller}
      </td>

      <td
        className="py-6 text-md font-semibold leading-[1.16rem]"
        onClick={handleRowClick}
      >
        {translateState(state)}
      </td>
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

export default ClientsOrdersRow;
