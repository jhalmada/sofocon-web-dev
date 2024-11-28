import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { getOrderPdf } from "../services/orders/orders.routes";

const BudgetRow = ({
  name,
  contact,
  date,
  seller,
  id,
  retirementDate,
  downloadIconSrc,
  deleteIconSrc,
  onDownloadClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/inicio/ordenes/presupuesto/${id}`);
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
        title={contact}
      >
        {contact}
      </td>
      <td
        className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap py-6"
        onClick={handleRowClick}
        title={date}
      >
        {date}
      </td>
      <td className="py-6" onClick={handleRowClick}>
        {retirementDate}
      </td>

      <td className="py-6" onClick={handleRowClick}>
        {seller}
      </td>

      <td className="py-6">
        <div className="flex justify-center gap-4">
          <a href={`${BASE_URL}/${getOrderPdf}/${id}`} download target="_blank">
            <img
              src={downloadIconSrc}
              alt="Download icon"
              className="h-5 w-5 cursor-pointer"
              onClick={onDownloadClick}
            />
          </a>

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
