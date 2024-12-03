import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import SearchInput from "../components/inputs/SearchInput";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import ClientsOrdersRow from "../components/ClientsOrdersRow.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import deleteIcon from "../assets/icons/trash3.svg";
import DirectOrdersPage from "./DirectOrdersPage.jsx";
import BudgetPage from "./BudgetPage.jsx";
import StatusPanelPage from "./StatusPanelPage.jsx";
import useOrders from "../hooks/orders/useOrders.js";
import useDeleteOrders from "../hooks/orders/useDeleteOrders.js";
import pageLostImg from "../assets/images/pageLostOrders.svg";

const CLIENTS_ORDERS_TAB = "ordenes-clientes";
const DIRECT_ORDERS_TAB = "ordenes-directas";
const BUDGET_TAB = "presupuesto";
const STATUS_PANEL_TAB = "panel-de-estado";

const OrdersPage = () => {
  const { deleteOrder } = useDeleteOrders();
  const {
    ordersResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    month,
    year,
    setModified,
    setStatus,
    setEntryDate,
    setSearch,
    setMonth,
    setYear,
    getAllOrders,
  } = useOrders();

  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("activeTab") || CLIENTS_ORDERS_TAB;
  });
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const years = [
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
    { label: "2027", value: 2027 },
    { label: "2028", value: 2028 },
    { label: "2029", value: 2029 },
    { label: "2030", value: 2030 },
    { label: "2031", value: 2031 },
    { label: "2032", value: 2032 },
    { label: "2033", value: 2033 },
    { label: "2034", value: 2034 },
    { label: "2035", value: 2035 },
    { label: "2036", value: 2036 },
    { label: "2037", value: 2037 },
    { label: "2038", value: 2038 },
    { label: "2039", value: 2039 },
    { label: "2040", value: 2040 },
    { label: "2041", value: 2041 },
    { label: "2042", value: 2042 },
    { label: "2043", value: 2043 },
    { label: "2044", value: 2044 },
  ];
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

  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Solicitado":
        setStatus("REQUEST");
        setPage(0);
        break;
      case "En preparación":
        setStatus("PREPARATION");
        setPage(0);
        break;
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

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    switch (activeTab) {
      case BUDGET_TAB:
        getAllOrders({ isDirect: false, isPreOrder: true, inOrders: false });
        break;
      case DIRECT_ORDERS_TAB:
        getAllOrders({ isDirect: true, isPreOrder: false, inOrders: true });
        break;
      case CLIENTS_ORDERS_TAB:
        getAllOrders({ isPreOrder: false, isDirect: false, inOrders: true });
        break;
      default:
        getAllOrders({ isPreOrder: false, isDirect: false });
    }
  }, [activeTab, getAllOrders]);

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to="/inicio" className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="mb-5 flex items-center justify-between space-x-4">
            <h1 className="text-xl font-medium leading-6 text-black_m">
              Órdenes
            </h1>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(STATUS_PANEL_TAB)}
              className={`${activeTab === STATUS_PANEL_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-48 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Panel de estados
            </h2>
            <h2
              onClick={() => setActiveTab(CLIENTS_ORDERS_TAB)}
              className={`w-48 cursor-pointer rounded-t-lg ${activeTab === CLIENTS_ORDERS_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Órdenes de clientes
            </h2>
            <h2
              onClick={() => setActiveTab(DIRECT_ORDERS_TAB)}
              className={`${activeTab === DIRECT_ORDERS_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-48 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Órdenes directas
            </h2>
            <h2
              onClick={() => setActiveTab(BUDGET_TAB)}
              className={`${activeTab === BUDGET_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-48 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Presupuestos
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {(activeTab === CLIENTS_ORDERS_TAB ||
              activeTab === DIRECT_ORDERS_TAB ||
              activeTab === STATUS_PANEL_TAB) && (
              <div className="flex gap-[.6rem]">
                <Link to={"/inicio/ordenes/nueva-venta"}>
                  <Button text="Nueva venta" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === BUDGET_TAB && (
              <div className="flex gap-[.6rem]">
                <Link to={"/inicio/ordenes/nuevo-presupuesto"}>
                  <Button text="Nuevo presupuesto" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === CLIENTS_ORDERS_TAB && (
          <div className="flex h-full flex-grow flex-col overflow-auto rounded-tr-lg bg-white p-5">
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <div className="flex items-center gap-2">
                  <p className="ml-2 text-black_m">Período</p>
                  <Select
                    placeholder="Selecciona un mes"
                    labelPlacement="outside"
                    defaultSelectedKeys={[month.toString()]}
                    className="w-[9.375rem] rounded-lg border"
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
                    defaultSelectedKeys={[year.toString()]}
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
                          Fecha de venta
                        </th>
                        <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                          Egreso del taller
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
                      </tr>
                    </thead>
                    <tbody>
                      {ordersResponse.length === 0 ? (
                        <>
                          <tr>
                            <td colSpan="6" className="p-4 text-center">
                              <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                                Ningún elemento coincide con tu búsqueda,
                                inténtalo de nuevo. <br /> Puedes encontrar a
                                las órdenes creadas aquí.
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
                          <ClientsOrdersRow
                            key={index}
                            id={order.id}
                            name={order?.client?.name || "Sin nombre"}
                            orderId={order.orderId}
                            date={
                              order.sellDate
                                ? formatDate(order.sellDate)
                                : "Sin fecha"
                            }
                            retirementDate={formatDate(
                              order.workShopDateDeparture,
                            )}
                            seller={order?.user?.userInfo?.fullName}
                            state={order.status}
                            deleteIconSrc={deleteIcon}
                            onDeleteClick={() =>
                              openConfirmDeleteModal(order.id)
                            }
                          />
                        ))
                      )}
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
          </div>
        )}
        {activeTab === DIRECT_ORDERS_TAB && (
          <DirectOrdersPage
            ordersResponse={ordersResponse || []}
            setItemsPerPage={setItemsPerPage}
            setSearch={setSearch}
            totalPage={totalPage}
            total={total}
            setPage={setPage}
            page={page}
            itemsPerPage={itemsPerPage}
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            setStatus={setStatus}
            setEntryDate={setEntryDate}
          />
        )}
        {activeTab === BUDGET_TAB && (
          <BudgetPage
            ordersResponse={ordersResponse || []}
            setSearch={setSearch}
            setItemsPerPage={setItemsPerPage}
            totalPage={totalPage}
            total={total}
            setPage={setPage}
            page={page}
            itemsPerPage={itemsPerPage}
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            setModified={setModified}
            setEntryDate={setEntryDate}
          />
        )}
        {activeTab === STATUS_PANEL_TAB && (
          <StatusPanelPage ordersResponse={ordersResponse || []} />
        )}
      </div>
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

export default OrdersPage;
