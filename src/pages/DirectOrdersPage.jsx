import Pagination from "../components/Pagination";
import deleteIcon from "../assets/icons/trash3.svg";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import { Select, SelectItem } from "@nextui-org/react";
import ReusableModal from "../components/modals/ReusableModal";
import DirectOrdersRow from "../components/DirectOrdersRow";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";
import pageLostImg from "../assets/images/pageLostOrders.svg";
import SearchInput from "../components/inputs/SearchInput";

const DirectOrdersPage = ({
  ordersResponse,
  setSearch,
  setItemsPerPage,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
  year,
  month,
  setModified,
  setStatus,
  setMonth,
  setYear,
}) => {
  const [orderId, setOrderId] = useState(null);

  const { deleteOrder } = useDeleteOrders();
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

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
                          Ningún elemento coincide con tu búsqueda, inténtalo de
                          nuevo. <br /> Puedes encontrar a las órdenes creadas
                          aquí.
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
                      retirementDate={formatDate(order.workShopDateDeparture)}
                      seller={order?.user?.userInfo?.fullName}
                      state={order.status}
                      deleteIconSrc={deleteIcon}
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
