import { useNavigate } from "react-router-dom";
import watchIcon from "../assets/icons/watch.svg";

const BudgetRow = ({
  name,
  contact,
  date,
  seller,
  id,
  downloadIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/inicio/ordenes/presupuesto/${id}`);
  };
  const options = [
    "Solicitado",
    "En preparación",
    "Listo para retirar",
    "Egreso",
  ];
  return (
    <tr className="cursor-pointer border-b border-gray text-center transition-all duration-300 hover:bg-gray">
      <div className="mt-2 flex w-full">
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
        title={contact}
      >
        {contact}
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

      <td className="p-2">
        <div className="flex justify-center gap-4">
          <img
            src={downloadIconSrc}
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

export default BudgetRow;
