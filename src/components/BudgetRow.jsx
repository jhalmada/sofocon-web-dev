import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { getOrderPdf } from "../services/orders/orders.routes";
import { SOFOCON_JWT_TOKEN } from "../utils/Constants.js";

const BudgetRow = ({
  name,
  contact,
  date,
  seller,
  id,
  downloadIconSrc,
  deleteIconSrc,
  onDownloadClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/inicio/ordenes/presupuesto/${id}`);
  };
  const accessToken = localStorage.getItem(SOFOCON_JWT_TOKEN);

  const handleDownloadClick = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${getOrderPdf}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `order_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download the file:", error);
    }
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
        {seller}
      </td>

      <td className="py-6">
        <div className="flex justify-center gap-4">
          <img
            src={downloadIconSrc}
            alt="Download icon"
            className="h-5 w-5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadClick();
              onDownloadClick && onDownloadClick();
            }}
          />
          <img
            src={deleteIconSrc}
            alt="Delete icon"
            className="h-5 w-5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick && onDeleteClick();
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default BudgetRow;
