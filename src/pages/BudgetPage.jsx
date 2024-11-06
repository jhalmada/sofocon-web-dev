import Pagination from "../components/Pagination";
import deleteIcon from "../assets/icons/trash3.svg";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import BudgetRow from "../components/BudgetRow";
import downloadIcon from "../assets/icons/download.svg";
import useOrders from "../hooks/orders/useOrders";
import ReusableModal from "../components/modals/ReusableModal";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";

const BudgetPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

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

  const {
    ordersResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setStatus,
  } = useOrders();
  const { deleteOrder } = useDeleteOrders();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
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

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex items-center gap-2">
          <p className="ml-2 text-black_m">Período</p>
          <Select
            className="w-52 rounded-lg border"
            placeholder="OCTUBRE 2024 "
          >
            {monthsOptions.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>
        </div>
        <table className="mt-2 w-full">
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
            {ordersResponse.map((order, index) => (
              <BudgetRow
                key={index}
                id={order.id}
                name={order?.client?.name || "Sin nombre"}
                contact={order?.client?.phone || "Sin contacto"}
                date={
                  order.created_at ? formatDate(order.created_at) : "Sin fecha"
                }
                seller={"Vendedor"}
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
      <div className="flex justify-center p-6">
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
        title="Eliminar órden"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(orderId)}
      >
        Esta órden será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default BudgetPage;
