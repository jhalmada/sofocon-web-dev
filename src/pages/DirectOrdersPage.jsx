import Pagination from "../components/Pagination";
import deleteIcon from "../assets/icons/trash3.svg";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import { Select, SelectItem } from "@nextui-org/react";
import ReusableModal from "../components/modals/ReusableModal";
import DirectOrdersRow from "../components/DirectOrdersRow";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";
import pageLostImg from "../assets/images/pageLostOrders.svg";

const DirectOrdersPage = ({
  ordersResponse,
  setItemsPerPage,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
  setModified,
  setStatus,
  setEntryDate,
}) => {
  const [orderId, setOrderId] = useState(null);

  const { deleteOrder } = useDeleteOrders();
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

  const stateOptions = ["Egreso", "Entregado"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
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

  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Para retirar":
        setStatus("READY_PICKUP");
        setPage(0);
        break;
      case "Egreso":
        setStatus("EGRESS");
        setPage(0);
        break;
      case "Entregado":
        setStatus("DELIVERED");
        setPage(0);
        break;
      default:
        setStatus("");
        setPage(0);
        break;
    }
  };

  return (
    <div className="flex flex-grow flex-col overflow-auto rounded-tr-lg bg-white p-5">
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
      {ordersResponse.length === 0 ? (
        <>
          <tr className="flex min-h-[calc(100vh-18rem)] items-center justify-center">
            <td colSpan="5" className="p-4 text-center">
              <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                Ningún elemento coincide con tu búsqueda, inténtalo de nuevo.{" "}
                <br /> Puedes encontrar a las órdenes creadas aquí.
              </p>
              <img src={pageLostImg} alt="Tabla vacía" className="mx-auto" />
            </td>
          </tr>
        </>
      ) : (
        <>
          <div className="flex flex-grow flex-col justify-between">
            <div>
              <table className="mt-2 w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                      Empresa
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      ID de orden
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Fecha
                    </th>

                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Vendedor
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      <div className="flex flex-col items-center gap-2">
                        <FilterSelect
                          options={stateOptions}
                          placeholder="Estado"
                          onChange={handleStateFilterChange}
                        />
                      </div>
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(ordersResponse)}
                  {ordersResponse.map((order, index) => (
                    <DirectOrdersRow
                      key={index}
                      id={order.id}
                      name={order?.client?.name || "Sin nombre"}
                      orderId={order.orderId}
                      date={
                        order.sellDate
                          ? formatDate(order.sellDate)
                          : "Sin fecha"
                      }
                      seller={order?.user?.userInfo?.fullName}
                      state={order.status}
                      deleteIconSrc={deleteIcon}
                      onDeleteClick={() => openConfirmDeleteModal(order.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={
                ordersResponse.length === 0
                  ? "hidden"
                  : `flex justify-center p-6`
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
      )}

      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar orden"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(orderId)}
      >
        Esta orden será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default DirectOrdersPage;
