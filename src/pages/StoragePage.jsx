import Pagination from "../components/Pagination";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import StorageRow from "../components/StorageRow";
import { Select, SelectItem } from "@nextui-org/react";
import ReusableModal from "../components/modals/ReusableModal";
import pageLostImg from "../assets/images/pageLostWorkshop.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";
import SearchInput from "../components/inputs/SearchInput";
import SaveImg from "../assets/img/save.svg";

const StoragePage = ({
  ordersResponse,
  setModified,
  setSearch,
  setYear,
  setMonth,
  setStatus,
  setItemsPerPage,
  itemsPerPage,
  page,
  totalPage,
  total,
  setPage,
  year,
}) => {
  const { deleteOrder } = useDeleteOrders();
  const {
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [openScannerModal, setOpenScannerModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const stateOptions = [
    "Ingreso a taller",
    "En preparación",
    "Para retirar del taller",
  ];
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setOpenScannerModal(false);
    setIsExportCompetingModalOpen(false);
    setIsSellersModalOpen(false);
  };
  const closeConfirmCancelModal = () => {
    setConfirmCancelModalOpen(false);
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const openConfirmDeleteModal = (id) => {
    setOrderId(id);
    setConfirmDeleteModalOpen(true);
  };

  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleConfirmDelete = () => {
    deleteOrder(orderId, setModified);
    closeConfirmDeleteModal();
  };

  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Ingreso a taller":
        setStatus("REQUEST");
        setPage(0);
        break;
      case "En preparación":
        setStatus("PREPARATION");
        setPage(0);
        break;
      case "Para retirar del taller":
        setStatus("READY_PICKUP");
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
                    Fecha de ingreso
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
                {ordersResponse.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                          Ningún elemento coincide con tu búsqueda, inténtalo de
                          nuevo. <br /> Puedes encontrar a las solicitudes
                          creadas aquí.
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
                    <StorageRow
                      key={index}
                      id={order.id}
                      name={order?.client?.name || "Sin nombre"}
                      orderId={order.orderId}
                      entryData={formatDate(order.workShopDateEntry)}
                      seller={order?.user?.userInfo?.fullName || "Sin asignar"}
                      state={order.status}
                      deleteIconSrc={deleteIcon}
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
        title="Eliminar orden"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(orderId)}
      >
        Esta orden será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmCancelModalOpen}
        onClose={closeConfirmCancelModal}
        title="Cambios sin guardar"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={handleConfirmCancel}
      >
        Los cambios realizados no se guardarán. <br /> ¿Desea continuar?
      </ReusableModal>
      <ReusableModal
        isOpen={isSaveConfirmationModalOpen}
        onClose={closeSaveConfirmationModal}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={closeSaveConfirmationModal}
      >
        <div className="flex h-[16rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
      </ReusableModal>
    </div>
  );
};
export default StoragePage;
