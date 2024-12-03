import Pagination from "../components/Pagination";
import deleteIcon from "../assets/icons/trash3.svg";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import BudgetRow from "../components/BudgetRow";
import downloadIcon from "../assets/icons/download.svg";
import ReusableModal from "../components/modals/ReusableModal";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";
import pageLostImg from "../assets/images/pageLostOrders.svg";
import SearchInput from "../components/inputs/SearchInput";

const BudgetPage = ({
  ordersResponse,
  setSearch,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
  setItemsPerPage,
  setModified,
  setEntryDate,
}) => {
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
    const monthMap = {
      Enero: "01",
      Febrero: "02",
      Marzo: "03",
      Abril: "04",
      Mayo: "05",
      Junio: "06",
      Julio: "07",
      Agosto: "08",
      Septiembre: "09",
      Octubre: "10",
      Noviembre: "11",
      Diciembre: "12",
    };

    const selectedMonth = monthMap[e.target.value] || "";
    setEntryDate(selectedMonth ? `${selectedMonth}` : "");
    setPage(0);
  };

  return (
    <div className="flex flex-grow flex-col overflow-auto rounded-tr-lg bg-white p-5">
      <div className="flex justify-between">
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
        <div>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
      </div>

      <>
        <div className="flex flex-grow flex-col justify-between">
          <div>
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
                {ordersResponse.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                          Ningún elemento coincide con tu búsqueda, inténtalo de
                          nuevo. <br /> Puedes encontrar a los presupuestos
                          creados aquí.
                        </p>
                        <img
                          src={pageLostImg}
                          alt="Tabla vacía"
                          className="mx-auto"
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  ordersResponse.map((order, index) => (
                    <BudgetRow
                      key={index}
                      id={order.id}
                      name={order?.client?.name || "Sin nombre"}
                      contact={order?.client?.phone || "Sin contacto"}
                      date={
                        order.sellDate
                          ? formatDate(order.sellDate)
                          : "Sin fecha"
                      }
                      seller={order?.user?.userInfo?.fullName}
                      downloadIconSrc={downloadIcon}
                      deleteIconSrc={deleteIcon}
                      onEditClick={() => {
                        openModal();
                      }}
                      onDeleteClick={() => openConfirmDeleteModal(order.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
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
        </div>
      </>

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
