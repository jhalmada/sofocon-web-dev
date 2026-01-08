import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import SearchInput from "../components/inputs/SearchInput";
import barCodeIcon from "../assets/icons/barcode.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import RechargeRow from "../components/RechargeRow.jsx";
import FileIcon from "../assets/icons/file-earmark-ruled.svg";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import useOrders from "../hooks/orders/useOrders.js";
import pageLostImg from "../assets/images/pageLostWorkshop.svg";
import SaveImg from "../assets/img/save.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { BASE_URL } from "../utils/Constants";
import {
  getOrderExcel,
  getOrderPdf,
} from "../services/orders/orders.routes.js";
import BarcodeReader from "../components/scan/BarcodeReader.jsx";
import useDeleteOrders from "../hooks/orders/useDeleteOrders.js";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

const WorkshopPage = () => {
  const { deleteOrder } = useDeleteOrders();

  const navigate = useNavigate();
  const {
    ordersResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    status,
    search,
    month,
    year,
    itemsPerPage,
    downloadFile,
    setModified,
    setYear,
    setMonth,
    setStatus,
    setSearch,
    getAllOrders,
  } = useOrders();

  const {
    ordersResponse: barcodeOrders,
    setBarCode,
    getAllOrders: getAllOrdersBarcode,
  } = useOrders();
  const [barcode, readBarcode] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);
  const [openScannerModal, setOpenScannerModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

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

  const handleDownloadExcel = (isRecharge) => {
    const url = `${BASE_URL}/${getOrderExcel}${isRecharge ? "?recharge=true" : "?recharge=false"}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}${month !== null ? `&month=${month}` : ""}${year !== null ? `&year=${year}` : ""}`;
    downloadFile(
      url,
      `ordenes${isRecharge ? "-con recarga" : "-sin recarga"}.xlsx`,
    );
  };

  const handleDownloadPdf = (isRecharge) => {
    const url = `${BASE_URL}/${getOrderPdf}${isRecharge ? "?recharge=true" : "?recharge=false"}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}${month !== null ? `&month=${month}` : ""}${year !== null ? `&year=${year}` : ""}`;

    downloadFile(
      url,
      `ordenes-${isRecharge ? "-con recarga" : "-sin recarga"}.pdf`,
    );
  };

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

  const openExportModal = () => {
    setIsExportModalOpen(true);
  };

  const openExportCompetingModal = () => {
    setIsExportCompetingModalOpen(true);
  };
  const openConfirmDeleteModal = (id) => {
    setOrderId(id);
    setConfirmDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsExportModalOpen(false);
    setOpenScannerModal(false);
    setIsExportCompetingModalOpen(false);
  };

  const closeConfirmCancelModal = () => {
    setIsConfirmCancelModalOpen(false);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

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
    if (barcodeOrders.length > 0) {
      const { productInOrder } = barcodeOrders[0];

      const items = productInOrder
        .map((product) => ({
          ...product,
          matchedItem: product.itemsRemoval.find((i) => i.barCode === barcode),
        }))
        .filter((p) => p.matchedItem);

      navigate(
        `/inicio/taller/datos-recarga/${items[0].matchedItem.id}?orderId=${barcodeOrders[0].orderId}&id=${barcodeOrders[0].id}`,
      );
    }
    closeModal();
  }, [barcodeOrders]);

  useEffect(() => {
    getAllOrders({ recharge: true });
  }, [getAllOrders]);

  useEffect(() => {
    if (barcode !== "") getAllOrdersBarcode({ recharge: true });
    setBarCode(barcode);
  }, [barcode, getAllOrdersBarcode]);

  /*   useEffect(() => {
    setBarCode("");
  }, [activeTab]); */

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
              Taller
            </h1>
          </div>
        </div>

        <div className="mb-5 flex items-center">
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            <div className="flex gap-[.6rem]">
              <Button
                text="Exportar lista"
                icon={DownloadIcon}
                color={"cancel"}
                onClick={() => openExportModal()}
              />
              <Link to={"/inicio/taller/plantilla-unit"}>
                <Button text="Planilla UNIT" icon={FileIcon} />
              </Link>

              <Button
                text="Escanear producto"
                color={"save"}
                icon={barCodeIcon}
                onClick={() => setOpenScannerModal(true)}
              />
            </div>
            <div className="flex gap-[.6rem]">
              <Button
                text="Exportar lista"
                icon={DownloadIcon}
                color={"cancel"}
                onClick={() => openExportCompetingModal()}
              />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-grow flex-col overflow-auto rounded-tr-lg bg-white p-5">
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
                  ) : (
                    ordersResponse.map((order, index) => (
                      <RechargeRow
                        key={index}
                        id={order.id}
                        name={order?.client?.name || "Sin nombre"}
                        orderId={order.orderId}
                        entryData={formatDate(order.workShopDateEntry)}
                        seller={
                          order?.user?.userInfo?.fullName || "Sin asignar"
                        }
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
        </div>
        {/* {activeTab === STORAGE_TAB && (
          <StoragePage
            ordersResponse={ordersResponse || []}
            setSearch={setSearch}
            setEntryDate={setEntryDate}
            setStatus={setStatus}
            setItemsPerPage={setItemsPerPage}
            page={page}
            totalPage={totalPage}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            total={total}
            setModified={setModified}
          />
        )} */}
      </div>

      <Modal isOpen={openScannerModal} onClose={closeModal}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Código de barras
              </ModalHeader>

              <ModalBody>
                <p className="text-sm leading-[1rem] text-black_m">
                  Escanea el código de barras del producto para localizar la
                  orden de compra donde se encuentra, o ingresa el código de
                  manera manual.
                </p>
                <div className="px-2">
                  <BarcodeReader
                    barcode={barcode}
                    onBarcodeChange={(code) => {
                      setBarCode(code), readBarcode(code);
                    }}
                    closeModal={closeModal}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

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
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <Button
            width="min-w-[14rem]"
            text="Descargar archivo Excel"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={() => handleDownloadExcel(true)}
          />

          <Button
            width="min-w-[14rem]"
            text="Descargar archivo PDF"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={() => handleDownloadPdf(true)}
          />
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={isExportCompetingModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <Button
            width="min-w-[14rem]"
            text="Descargar archivo Excel"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={() => handleDownloadExcel(false)}
          />

          <Button
            width="min-w-[14rem]"
            text="Descargar archivo PDF"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={() => handleDownloadPdf(false)}
          />
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
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmModal(false)}
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

export default WorkshopPage;
