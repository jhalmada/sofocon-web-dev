import { useNavigate } from "react-router-dom";
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
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/inicio/taller/deposito`);
  };
  return (
    <tr className="cursor-pointer border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <div className="flex">
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
        {translateState(state)}
      </td>
      <td className="p-2">
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
        </div>
      </td>
    </tr>
  );
};

export default StorageRow;
