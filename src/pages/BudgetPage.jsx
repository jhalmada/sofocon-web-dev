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
import useOrders from "../hooks/orders/useOrders";
import { SpinerComponent } from "../components/spiners";

const BudgetPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const {
    loading,
    page,
    totalPage,
    total,
    year,
    itemsPerPage,
    ordersResponse,
    setMonth,
    setYear,
    getAllOrders,
    setPage,
    setItemsPerPage,
    setSearch,
  } = useOrders();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const y = currentYear - 5 + i;
    return { label: String(y), value: String(y) };
  });

  const months = [
    { label: "Enero", value: "01" },
    { label: "Febrero", value: "02" },
    { label: "Marzo", value: "03" },
    { label: "Abril", value: "04" },
    { label: "Mayo", value: "05" },
    { label: "Junio", value: "06" },
    { label: "Julio", value: "07" },
    { label: "Agosto", value: "08" },
    { label: "Septiembre", value: "09" },
    { label: "Octubre", value: "10" },
    { label: "Noviembre", value: "11" },
    { label: "Diciembre", value: "12" },
  ];

  const handleChangeMonth = (value) => {
    setMonth(value);
    setPage(0);
  };

  const handleChangeYear = (value) => {
    setYear(value);
    setPage(0);
  };

  const { deleteOrder } = useDeleteOrders();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const openModal = (id) => {
    setOrderId(id);
  };
  const openConfirmDeleteModal = (id) => {
    setOrderId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    await deleteOrder(orderId);
    getAllOrders({ isDirect: false, isPreOrder: true, inOrders: false });
    closeConfirmDeleteModal();
  };
  useEffect(() => {
    getAllOrders({ isDirect: false, isPreOrder: true, inOrders: false });
  }, [getAllOrders]);

  return (
    <div className="flex flex-grow flex-col overflow-auto rounded-tr-lg bg-white p-5">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <div className="flex items-center gap-2">
            <p className="ml-2 text-black_m">Período</p>
            <Select
              placeholder="Selecciona un mes"
              labelPlacement="outside"
              className="w-52 rounded-lg border"
              onChange={(e) => handleChangeMonth(e.target.value)}
            >
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              placeholder="Selecciona un año"
              defaultSelectedKeys={[
                year?.toString() || new Date().getFullYear(),
              ]}
              labelPlacement="outside"
              className="w-52 rounded-lg border"
              onChange={(e) => handleChangeYear(e.target.value)}
            >
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
      </div>

      <>
        <div className="flex flex-grow flex-col justify-between">
          <div>
            {!loading ? (
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
                            Ningún elemento coincide con tu búsqueda, inténtalo
                            de nuevo. <br /> Puedes encontrar a los presupuestos
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
                        seller={
                          order?.user?.userInfo?.fullName || "Sin vendedor"
                        }
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
            ) : (
              <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
                <SpinerComponent />
              </div>
            )}
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
