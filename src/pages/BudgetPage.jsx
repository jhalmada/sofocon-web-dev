import Pagination from "../components/Pagination";
import deleteIcon from "../assets/icons/trash3.svg";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import BudgetRow from "../components/BudgetRow";
import downloadIcon from "../assets/icons/download.svg";
import ReusableModal from "../components/modals/ReusableModal";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";
import pageLostImg from "../assets/images/pageLostOrders.svg";

const BudgetPage = ({
  ordersResponse,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
  setItemsPerPage,
  setModified,
}) => {
  const [orderId, setOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const monthsOptions = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const filteredOrders = ordersResponse.filter((order) => {
    if (!order.sellDate) {
      return false;
    }
    const orderDate = new Date(order.sellDate);
    if (isNaN(orderDate.getTime())) {
      return false;
    }
    if (!selectedMonth) {
      return true;
    }
    const orderMonthIndex = orderDate.getMonth();
    const selectedMonthIndex = monthsOptions.indexOf(selectedMonth);
    return orderMonthIndex === selectedMonthIndex;
  });

  const { deleteOrder } = useDeleteOrders();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const openModal = (id) => {
    setIsModalOpen(true);
    setOrderId(id);
    setIsModalOpen(true);
  };
  const openConfirmDeleteModal = (id) => {
    setOrderId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

  const handleConfirmDelete = () => {
    deleteOrder(orderId, setModified);
    closeConfirmDeleteModal();
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      {ordersResponse.length === 0 ? (
        <tr className="flex min-h-[calc(100vh-18rem)] items-center justify-center">
          <td colSpan="5" className="p-4 text-center">
            <p className="text-md font-semibold leading-[1.3rem] text-black_l">
              Ningún elemento coincide con tu búsqueda, inténtalo de nuevo.{" "}
              <br /> Puedes encontrar a los presupuestos creados aquí.
            </p>
            <img src={pageLostImg} alt="Tabla vacía" className="mx-auto" />
          </td>
        </tr>
      ) : (
        <div>
          <div className="flex items-center gap-2">
            <p className="ml-2 text-black_m">Período</p>
            <Select
              className="w-52 rounded-lg border"
              placeholder="Selecciona un mes"
              onChange={handleMonthChange}
            >
              {monthsOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>

          <table className="mt-5 w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                  Empresa
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Contacto
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Fecha
                </th>

                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Vendedor
                </th>

                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <BudgetRow
                  key={index}
                  id={order.id}
                  name={order?.client?.name || "Sin nombre"}
                  contact={order?.client?.phone || "Sin contacto"}
                  date={
                    order.sellDate ? formatDate(order.sellDate) : "Sin fecha"
                  }
                  seller={order?.user?.userInfo?.fullName}
                  downloadIconSrc={downloadIcon}
                  deleteIconSrc={deleteIcon}
                  onEditClick={() => {
                    openModal();
                  }}
                  onDeleteClick={() => openConfirmDeleteModal(order.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div
        className={
          ordersResponse.length === 0 ? "hidden" : `flex justify-center p-6`
        }
      >
        <Pagination
          pageIndex={setItemsPerPage}
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
          itemsPerPage={itemsPerPage}
          total={total}
        />
      </div>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar presupuesto"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(orderId)}
      >
        Este presupuesto será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default BudgetPage;
