import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import SearchInput from "../components/inputs/SearchInput";
import CameraIcon from "../assets/icons/camera.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import RechargeRow from "../components/RechargeRow.jsx";
import FileIcon from "../assets/icons/file-earmark-ruled.svg";
import { Controller, useForm } from "react-hook-form";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import { BASE_URL } from "../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import StoragePage from "./StoragePage.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Checkbox, DatePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";

const RECHARGE_TAB = "recarga";
const STORAGE_TAB = "deposito";

const WorkshopPage = () => {
  const [companyId, setCompanyId] = useState(null);
  const { deleteCompany } = useDeleteCompanies();
  const { userSellerResponse, setSearch } = useUsersSellers();
  const {
    companiesResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setNexVisit,
  } = useCompanies();
  const [activeTab, setActiveTab] = useState(RECHARGE_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [stateFilter, setStateFilter] = useState("");
  const [openScannerModal, setOpenScannerModal] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Para retirar",
    "Egreso",
  ];
  const pricesList = ["Lista 1", "Lista 2", "Lista 3"];
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
    control,
    clearErrors,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(true);
  };

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

  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);

  const handleConfirmDelete = () => {
    deleteCompany(companyId, setModified);
    closeConfirmDeleteModal();
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
    const {
      nextVisit,
      name,
      department,
      managerName,
      phone,
      status,
      address,
      neighborhood,
    } = data;
    const newdata = new Date(
      nextVisit.year,
      nextVisit.month - 1,
      nextVisit.day,
    );

    //formate la fecha para que sea aceptada por el back
    const formattedDate = newdata.toISOString();
  };

  const handleStateFilterChange = (value) => {
    setStateFilter(value);
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
                  icon={CameraIcon}
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
                <tbody>
                  <RechargeRow
                    key={""}
                    id={""}
                    name={"Nombre de la empresa"}
                    orderId={"ID de orden"}
                    entryData={"Fecha de ingreso"}
                    retirementDate={"Fecha de retiro"}
                    seller={"Vendedor"}
                    state={"estado"}
                    editIconSrc={editIcon}
                    onEditClick={() => {
                      openModal();
                    }}
                  />
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
          </div>
        )}
        {activeTab === STORAGE_TAB && <StoragePage />}
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Órden"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-700 block text-sm font-light">
            Asignar estado:
          </label>
          <Select
            placeholder="Estado"
            className="mb-4 rounded-lg border"
            {...register("status")}
            onSelectionChange={(value) => setValue("status", value)}
          >
            {stateOptions.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>

          <Input
            label={"ID de órden"}
            placeholder={"Escribir..."}
            {...register("orderId", {
              required: "Este campo es obligatorio",
            })}
          />
          <Input
            label={"Empresa"}
            placeholder={"Escribir..."}
            {...register("company", {
              required: "Este campo es obligatorio",
            })}
          />
          <Input
            label={"R.U.T./CI"}
            placeholder={"Escribir..."}
            {...register("rut", {
              required: "Este campo es obligatorio",
            })}
          />
          <span className="text-sm font-light leading-[1rem] text-black_b">
            Fecha de venta
          </span>
          <I18nProvider locale="es-ES">
            <Controller
              name={"dateV"}
              control={control}
              render={({ field }) => (
                <DatePicker
                  minValue={today(getLocalTimeZone())}
                  className={`${errors.dateV ? "text-red_e" : ""} ${errors.dateV ? "border-red_e" : ""} rounded-lg border`}
                  {...field}
                  label={""}
                  placeholder="Seleccione una fecha"
                  granularity="day"
                  errorMessage={(value) => {
                    if (value.isInvalid) {
                      setErrorDataPicker(true);
                      return "";
                    } else {
                      setErrorDataPicker(false);
                      return "";
                    }
                  }}
                />
              )}
              rules={{
                required: dateSelected && "La fecha es obligatoria",
              }}
            />
            <p className="font-roboto text-xs text-red_e">
              {errors.dateV ? errors.dateV.message : ""}
            </p>
          </I18nProvider>
          <div className="mt-4">
            <Input
              label={"Vendedor"}
              placeholder={"Escribir..."}
              {...register("seller", {
                required: "Este campo es obligatorio",
              })}
            />
            <div className="mt-9">
              <Select
                placeholder="Elegir lista de precios..."
                className="rounded-lg border"
                {...register("priceList")}
                onSelectionChange={(value) => setValue("priceList", value)}
              >
                {pricesList.map((option) => (
                  <SelectItem key={option}>{option}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="mt-8">
              <NextAutoComplete
                array2={[]}
                label2={"Vendedores Asignados"}
                array={[]}
                name={"products"}
                setValue={setValue}
                onChange={setSearch}
                placeholder="Producto 1"
              />
              <p>{errors.vendedores && errors.vendedores.message}</p>
            </div>
          </div>
          <div className="mt-10 rounded-lg border p-2">
            {" "}
            <Checkbox
              placeholder="Retiro de extintores"
              radius="full"
              className="font-light"
              size="sm"
            >
              Retiro de extintores
            </Checkbox>
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
          Escanea el código de barras del producto para localizar la órden de
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

      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar órden"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(companyId)}
      >
        Esta orden será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default WorkshopPage;
