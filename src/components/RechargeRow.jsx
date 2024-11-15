import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const RechargeRow = ({
  name,
  orderId,
  entryData,
  retirementDate,
  seller,
  state,
  id,
  editIconSrc,
  onEditClick,
}) => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(orderDetails?.status);

  const handleRowClick = () => {
    navigate(`/inicio/taller/recarga/${id}`);
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
        title={entryData}
      >
        {entryData}
      </td>
      <td className="py-6" onClick={handleRowClick}>
        {retirementDate}
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
        <div className="flex justify-center gap-4">
          <img
            src={editIconSrc}
            alt="Edit icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onEditClick}
          />
        </div>
      </td>
    </tr>
  );
};

export default RechargeRow;
