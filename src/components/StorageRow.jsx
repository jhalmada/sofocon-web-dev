import { Navigate } from "react-router-dom";
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

const StorageRow = ({
  name,
  orderId,
  entryData,
  retirementDate,
  seller,
  state,
  id,
}) => {
  const handleRowClick = () => {
    Navigate(`/inicio/rutas/mapa/${id}`);
  };
  return (
    <tr
      className="cursor-pointer border-b border-gray text-center transition-all duration-300 hover:bg-gray"
      onClick={handleRowClick}
    >
      <div className="flex">
        <img
          src={watchIcon}
          alt="watch icon"
          title="Cliente próximo a vencer"
        />
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left"
          title={name}
        >
          {name}
        </td>
      </div>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={orderId}
      >
        {orderId}
      </td>
      <td
        className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={entryData}
      >
        {entryData}
      </td>
      <td className="p-2">{retirementDate}</td>

      <td className="p-2">{seller}</td>

      <td className="p-2 text-md font-semibold leading-[1.16rem]">
        {translateState(state)}
      </td>
    </tr>
  );
};

export default StorageRow;
