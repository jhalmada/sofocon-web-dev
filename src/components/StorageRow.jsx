import { useNavigate } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";
import { Select, SelectItem } from "@nextui-org/select";
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
  entryDate,
  withdrawalDate,
  seller,
  state,
}) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/inicio`);
  };
  const options = [
    "Solicitado",
    "En preparación",
    "Listo para retirar",
    "Egreso",
  ];
  return (
    <tr
      className="cursor-pointer border-b border-gray transition-all duration-300 hover:bg-gray"
      onClick={handleRowClick}
    >
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
        title={orderId}
      >
        {orderId}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={entryDate}
      >
        {entryDate}
      </td>
      <td className="cursor-pointer p-2 text-center">{withdrawalDate}</td>

      <td className="p-2">{seller}</td>

      <td className="p-2 text-center text-md font-semibold leading-[1.16rem]">
        <Select
          placeholder="Selecciona un estado"
          className={`rounded-lg border`}
        >
          {options.map((option, index) => (
            <SelectItem key={index}>{option}</SelectItem>
          ))}
        </Select>
      </td>
    </tr>
  );
};

export default StorageRow;
