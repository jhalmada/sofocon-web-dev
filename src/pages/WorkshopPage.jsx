import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import SearchInput from "../components/inputs/SearchInput";
import barCodeIcon from "../assets/icons/barcode.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import x from "../assets/icons/x.svg";
import RechargeRow from "../components/RechargeRow.jsx";
import FileIcon from "../assets/icons/file-earmark-ruled.svg";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import StoragePage from "./StoragePage.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import editIcon from "../assets/icons/pencil-square.svg";
import ProductsAutocomplete from "../components/autocomplete/ProductsAutocomplete.jsx";
import useGetProducts from "../hooks/products/useGetProducts.js";
import useOrders from "../hooks/orders/useOrders.js";
import pageLostImg from "../assets/images/pageLostWorkshop.svg";

const RECHARGE_TAB = "recarga";
const STORAGE_TAB = "deposito";

const WorkshopPage = () => {
  const { productsResponse, setSearch: setSearchProducts } = useGetProducts();
  const {
    ordersResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setOrderType,
    setStatus,
    setSearch: setSearchOrders,
  } = useOrders();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [recharged, setRecharged] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [activeTab, setActiveTab] = useState(RECHARGE_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [openScannerModal, setOpenScannerModal] = useState(false);

  const stateOptions = ["Solicitado", "En preparación", "Para retirar"];
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const openExportModal = () => {
    setIsExportModalOpen(true);
  };

  const openExportCompetingModal = () => {
    setIsExportCompetingModalOpen(true);
  };

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

  const handleCancelClick = () => {
    openConfirmCancelModal();
    setOpenScannerModal(false);
  };
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const onSubmit = (data) => {
    console.log(data);
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

  const handleSelectionChange = (id, value) => {
    const selectedValue = value.anchorKey === "true";
    setRecharged((prev) => ({
      ...prev,
      [id]: selectedValue,
    }));
  };
  const handleQuantityChange = (itemId, value) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };
  const handleDeleteSelection = (id) => {
    const updatedSelectedItems = autocompleteResults.filter(
      (selection) => selection.id !== id,
    );

    setValue(name, updatedSelectedItems);
    setAutocompleteResults(updatedSelectedItems);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

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
          <SearchInput placeholder="Buscar..." />
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(RECHARGE_TAB)}
              className={`w-52 cursor-pointer rounded-t-lg ${activeTab === RECHARGE_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Pedidos con recarga
            </h2>
            <h2
              onClick={() => setActiveTab(STORAGE_TAB)}
              className={`${activeTab === STORAGE_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-52 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Pedidos sin recarga
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === RECHARGE_TAB && (
              <div className="flex gap-[.6rem]">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"/inicio/taller/plantilla-unit"}>
                  <Button text="Plantilla UNIT" icon={FileIcon} />
                </Link>

                <Button
                  text="Escanear producto"
                  color={"save"}
                  icon={barCodeIcon}
                  onClick={() => setOpenScannerModal(true)}
                />
              </div>
            )}
            {activeTab === STORAGE_TAB && (
              <div className="flex gap-[.6rem]">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportCompetingModal()}
                />
              </div>
            )}
          </div>
        </div>
        {activeTab === RECHARGE_TAB && (
          <div className="flex h-full flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
            {ordersResponse.length === 0 ? (
              <tr className="flex min-h-[calc(100vh-18rem)] items-center justify-center">
                <td colSpan="5" className="p-4 text-center">
                  <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                    Ningún elemento coincide con tu búsqueda, inténtalo de
                    nuevo. <br /> Puedes encontrar a las solicitudes creadas
                    aquí.
                  </p>
                  <img
                    src={pageLostImg}
                    alt="Tabla vacía"
                    className="mx-auto"
                  />
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
                        Fecha de retiro
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

                  {console.log(ordersResponse)}
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <RechargeRow
                        key={index}
                        id={order.id}
                        name={order?.client?.name || "Sin nombre"}
                        orderId={order.id}
                        entryData={formatDate(order.workShopDateEntry)}
                        retirementDate={
                          "Aún sin retirar" ||
                          formatDate(order.workShopDateDeparture)
                        }
                        seller={order?.user?.userInfo?.fullName}
                        state={order.status}
                        editIconSrc={editIcon}
                        onEditClick={() => {
                          openModal();
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
        )}
        {activeTab === STORAGE_TAB && <StoragePage />}
      </div>
      <ReusableModal
        width="w-[30rem]"
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Orden"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <ProductsAutocomplete
                label={"Productos"}
                array={productsResponse || []}
                name={"products"}
                setValue={setValue}
                onChange={setSearchProducts}
                placeholder="Buscar productos"
                setAutocompleteResults={setAutocompleteResults}
                selectedItems={autocompleteResults}
              />
              <p>{errors.products && errors.products.message}</p>
            </div>
            <div>
              {autocompleteResults.length > 0 && (
                <div>
                  {autocompleteResults.map((item, index) => (
                    <div className="flex w-full space-x-2" key={item.id}>
                      <div className="w-1/2">
                        <span className="mt-[1.50rem] flex h-10 w-full items-center justify-between rounded-lg p-2 shadow-br">
                          {item.name}
                          <img
                            src={x}
                            alt="delete"
                            className="mr-1 cursor-pointer"
                            onClick={() => handleDeleteSelection(item.id)}
                          />
                        </span>
                        <Input
                          hidden={true}
                          value={item.id}
                          defaultValue={item.id}
                          {...register(`productInOrder[${index}].product.id`, {
                            value: item.id,
                          })}
                          disabled
                        />
                      </div>
                      <div className="flex w-1/2 space-x-2">
                        <Input
                          type="number"
                          label={"Cantidad"}
                          defaultValue={1}
                          minValue={1}
                          placeholder={"Cant."}
                          onInput={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          {...register(`productInOrder[${index}].amount`)}
                          msjError={
                            errors[`productInOrder[${index}].amount`]
                              ?.message || ""
                          }
                        />
                        <div className="w-full">
                          <label className="block text-sm font-light">
                            Recarga
                          </label>
                          <Select
                            defaultValue={false}
                            className="rounded-lg border"
                            placeholder={recharged[item.id] ? "Si" : "No"}
                            {...register(`productInOrder[${index}].isRecharge`)}
                            onSelectionChange={(value) =>
                              handleSelectionChange(item.id, value)
                            }
                          >
                            <SelectItem key={true}>Si</SelectItem>
                            <SelectItem key={false}>No</SelectItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {autocompleteResults.map((item) => {
                    return (
                      recharged[item.id] &&
                      Array.from({ length: quantity[item.id] || 1 }).map(
                        (_, index) => (
                          <div
                            key={`recharged-${item.id}-${index}`}
                            className="mb-8 rounded-lg bg-gray p-4"
                          >
                            <p className="mb-4 text-center text-sm">
                              Recarga del producto
                              <span className="ml-1 font-semibold uppercase">
                                {item.name}
                              </span>
                            </p>
                            <div className="flex space-x-2">
                              <Input
                                label={"Código de barras"}
                                placeholder={"..."}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].ItemsRemoval[${index}].barCode`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={errors.barCode?.message || ""}
                              />
                              <span className="flex items-center">
                                <Link to={"/inicio"}>
                                  <div className="mt-2 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur">
                                    <img
                                      src={barCodeIcon}
                                      alt=""
                                      className="h-5 w-5"
                                    />
                                  </div>
                                </Link>
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                label={"Matrícula"}
                                placeholder={"X234234"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].ItemsRemoval[${index}].enrollment`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={errors.enrollment?.message || ""}
                              />
                              <Input
                                label={"N° UNIT de fábrica"}
                                placeholder={"123455"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].ItemsRemoval[${index}].fabricUNIT`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={errors.fabricUNIT?.message || ""}
                              />
                            </div>
                          </div>
                        ),
                      )
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        isOpen={openScannerModal}
        onClose={handleCancelClick}
        title="Código de barras"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "scan"]}
        handleCancelClick={handleCancelClick}
      >
        <p className="text-sm leading-[1rem] text-black_m">
          Escanea el código de barras del producto para localizar la orden de
          compra donde se encuentra, o ingresa el código de manera manual.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="px-8">
            <Input
              placeholder={"Ingrese el código..."}
              {...register("name", {
                required: "Este campo es requerido",
              })}
            />
          </div>
        </form>
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
          <a href={`${BASE_URL}/${getClientsExcel}`} download target="_blank">
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a href={`${BASE_URL}/${getClientsPdf}`} download target="_blank">
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
        isOpen={isExportCompetingModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <a
            href={`${BASE_URL}/${getClientsExcel}?competence=false`}
            download
            target="_blank"
          >
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a
            href={`${BASE_URL}/${getClientsPdf}?competence=false`}
            download
            target="_blank"
          >
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
    </div>
  );
};

export default WorkshopPage;
