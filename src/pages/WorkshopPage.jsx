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
import { useForm } from "react-hook-form";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import usePutCompany from "../hooks/companies/usePutCompanies.js";
import { BASE_URL } from "../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import useUserCompany from "../hooks/companies/useUsersCompany.js";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import StoragePage from "./StoragePage.jsx";
import { Select, SelectItem } from "@nextui-org/select";

const RECHARGE_TAB = "recarga";
const STORAGE_TAB = "deposito";

const WorkshopPage = () => {
  const [companyId, setCompanyId] = useState(null);
  const { deleteCompany } = useDeleteCompanies();
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

  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Para retirar",
    "Egreso",
  ];
  const {
    clearErrors,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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

  const handleConfirmDelete = () => {
    deleteCompany(companyId, setModified);
    closeConfirmDeleteModal();
  };

  const handleCancelClick = () => {
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
      <div className="flex flex-grow flex-col px-6 pt-6">
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
                  onSelectionChange={(values) => setValue("status", values)}
                >
                  <SelectItem>Enero 2024</SelectItem>
                  <SelectItem>Febrero 2024</SelectItem>
                  <SelectItem>Marzo 2024</SelectItem>
                  <SelectItem>Abril 2024</SelectItem>
                  <SelectItem>Mayo 2024</SelectItem>
                  <SelectItem>Junio 2024</SelectItem>
                  <SelectItem>Julio 2024</SelectItem>
                  <SelectItem>Agosto 2024</SelectItem>
                  <SelectItem>Septiembre 2024</SelectItem>
                  <SelectItem>Octubre 2024</SelectItem>
                  <SelectItem>Noviembre 2024</SelectItem>
                  <SelectItem>Diciembre 2024</SelectItem>
                </Select>
              </div>
              <table className="w-full">
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
                      <div className="flex flex-col">
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
                  <RechargeRow
                    key={""}
                    id={""}
                    name={"Nombre de la empresa"}
                    orderId={"ID de orden"}
                    entryData={"Fecha de ingreso"}
                    retirementDate={"Fecha de retiro"}
                    seller={"Vendedor"}
                    state={"estado"}
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
        title="Eliminar Empresa"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(companyId)}
      >
        Esta empresa será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default WorkshopPage;
