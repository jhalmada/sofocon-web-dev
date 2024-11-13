import { useNavigate } from "react-router-dom";

import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import usePutOrders from "../hooks/orders/usePutOrders";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
const translateState = (state) => {
  switch (state) {
    case "REQUEST":
      return "Solicitado";
    case "PREPARATION":
      return "En preparación";
    case "READY_PICKUP":
      return "Listo para retirar";
    case "EGRESS":
      return "Egreso";
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
  const { changedOrder, isLoading } = usePutOrders();
  const { getOneOrder, setModified } = useGetOneOrder(id);

  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(orderDetails?.status);

  const handleRowClick = () => {
    navigate(`/inicio/taller/recarga`);
  };
  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Listo para retirar",
    "Egreso",
  ];

  const handleStateChange = async (e) => {
    const translateState = (state) => {
      switch (state) {
        case "Solicitado":
          return "REQUEST";
        case "En preparación":
          return "PREPARATION";
        case "Listo para retirar":
          return "READY_PICKUP";
        case "Egreso":
          return "EGRESS";
        default:
          return state;
      }
    };
    const newStatus = translateState(e.target.value);
    setSelectedState(newStatus);
    await changedOrder({ status: newStatus }, orderDetails.id, setModified);
  };
  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };
  useEffect(() => {
    oneOrder(id);
  }, [id]);

  return (
    <tr className="cursor-pointer border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <div className="mt-2 flex">
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
        title={entryData}
      >
        {entryData}
      </td>
      <td className="p-2" onClick={handleRowClick}>
        {retirementDate}
      </td>

      <td className="p-2" onClick={handleRowClick}>
        {seller}
      </td>

      <td
        className="p-2 text-md font-semibold leading-[1.16rem]"
        onClick={handleRowClick}
      >
        <Select
          className="mb-4 rounded-lg border"
          placeholder={translateState(orderDetails?.status)}
          value={translateState(stateOptions)}
          onChange={handleStateChange}
          disabled={isLoading}
        >
          {stateOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      </td>
      <td className="p-2">
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
