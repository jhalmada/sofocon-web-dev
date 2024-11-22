import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import SearchInput from "../components/inputs/SearchInput.jsx";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import UnitTemplateRow from "../components/UnitTemplateRow.jsx";
import { BASE_URL } from "../utils/Constants.js";
import {
  getOrderExcel,
  getOrderPdf,
} from "../services/orders/orders.routes.js";
import useGetUnitOrders from "../hooks/orders/useGetUnitOrders.js";
const UnitTemplate = () => {
  const {
    orderUnitResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setSearch,
  } = useGetUnitOrders();
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [routeId, setRouteId] = useState(null);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${month}/${year}`;
  };

  const closeModal = () => {
    setIsExportModalOpen(false);
    setIsModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const handleConfirmDelete = () => {
    closeConfirmDeleteModal();
  };

  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const openExportModal = () => {
    setIsExportModalOpen(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to="/inicio/taller" className="text-sm font-medium leading-4">
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
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Taller
          </h1>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              className={`min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Planilla UNIT
            </h2>
          </div>

          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            <div className="flex space-x-4">
              <Button
                text="Exportar lista"
                icon={DownloadIcon}
                color={"cancel"}
                onClick={() => openExportModal()}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
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
            <table className="mt-2 w-full">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-center text-md font-semibold leading-[1.125rem]">
                    Empresa
                  </th>
                  <th></th>
                  <th></th>
                  <th className="text-center text-md font-semibold leading-[1.125rem]">
                    Polvo
                  </th>
                  <th></th>
                  <th></th>
                  <th className="min-w-[6rem] text-center text-md font-semibold leading-[1.125rem]">
                    Marca UNIT
                  </th>
                </tr>
                <tr>
                  <th className="border-b-2 border-gray p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Fecha ing.
                  </th>
                  <th className="border-b-2 border-gray bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>
                  <th className="border-b-2 border-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Dirección
                  </th>
                  <th className="border-b-2 border-gray bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Tipo
                  </th>
                  <th className="border-b-2 border-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Mar./Color
                  </th>
                  <th className="border-b-2 border-gray bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Cap.(kg/l)
                  </th>
                  <th className="border-b-2 border-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Fabr.
                  </th>
                  <th className="border-b-2 border-gray bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Actual
                  </th>
                  <th className="border-b-2 border-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Matrícula
                  </th>
                  <th className="border-b-2 border-gray bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Ensayo
                  </th>
                  <th className="border-b-2 border-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Presión (MPa)
                  </th>
                  <th className="border-b-2 border-gray bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Exp. Rem. (%)
                  </th>
                  <th className="border-b-2 border-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Baja
                  </th>
                </tr>
              </thead>
              <tbody>
                {console.log("order", orderUnitResponse)}
                {orderUnitResponse.map((order, index) => (
                  <UnitTemplateRow
                    key={index}
                    id={order.id}
                    entryDate={formatDate(order.workShopDateEntry)}
                    name={order?.client?.name || "Sin nombre"}
                    direction={order?.client?.address}
                    type={order?.productInOrder[index]?.product?.type}
                    color={order?.productInOrder[index]?.product?.color}
                    capacity={
                      order?.productInOrder[index]?.itemsRemoval[index]?.product
                        ?.capacity
                    }
                    factory={"Si"}
                    current={
                      order.productInOrder[index]?.itemsRemoval[index]
                        ?.numberUNIT
                    }
                    registration={
                      order.productInOrder[index]?.itemsRemoval[index]
                        ?.enrollment
                    }
                    trial={formatDate(
                      order.productInOrder[index]?.itemsRemoval[index]
                        ?.lastDate,
                    )}
                    pressure={
                      order?.productInOrder[index]?.itemsRemoval[index]?.product
                        ?.pressure
                    }
                    exp={
                      order?.productInOrder[index]?.itemsRemoval[index]?.product
                        ?.expansion
                    }
                    discontinued={"No"}
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
              itemPerPage={itemsPerPage}
              total={total}
            />
          </div>
        </div>
      </div>

      <ReusableModal
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <a href={`${BASE_URL}/${getOrderExcel}`} download target="_blank">
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a href={`${BASE_URL}/${getOrderPdf}`} download target="_blank">
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo PDF"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
        </div>
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
        Los cambios fueron guardados exitosamente.
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar ruta"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(routeId)}
      >
        Esta ruta será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default UnitTemplate;
