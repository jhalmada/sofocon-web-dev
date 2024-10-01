import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import { Select, SelectItem } from "@nextui-org/select";
import SearchInput from "../components/inputs/SearchInput";
import PlusIcon from "../assets/icons/plus.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { useForm } from "react-hook-form";
import CompanieRow from "../components/CompanieRow.jsx";
import CompetingPage from "./CompetingPage.jsx";
import notesIcon from "../assets/icons/sticky-fill.svg";
import { DatePicker } from "@nextui-org/react";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import closeIcon from "../assets/icons/x-lg.svg";

const COMPANIE_TAB = "companies";
const COMPETING_TAB = "competing";

const CompaniesPage = () => {
  const [companyId, setCompanyId] = useState(null);
  const { deleteCompany } = useDeleteCompanies();
  const {
    companiesResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useCompanies();
  console.log(companiesResponse);
  const [activeTab, setActiveTab] = useState(COMPANIE_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const openModal = (id) => {
    setIsModalOpen(true);
  };
  const openSellersModal = (id) => {
    setIsSellersModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setIsSellersModalOpen(false);
  };

  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const openConfirmDeleteModal = (id) => {
    setCompanyId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

  const handleConfirmDelete = () => {
    deleteCompany(companyId, setModified);
    closeConfirmDeleteModal();
  };

  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const onSubmit = (data) => {};

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <Link
          to="/inicio"
          className="cursor-pointer text-sm font-medium leading-4"
        >
          <div className="mb-4 flex items-center">
            <img
              src={ChevronLeftIcon}
              alt="arrow left"
              className="-ml-1 h-4 w-4"
            />
            Volver
          </div>
        </Link>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Empresas
          </h1>
          <SearchInput placeholder="Buscar..." />
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(COMPANIE_TAB)}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === COMPANIE_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Listado
            </h2>
            <h2
              onClick={() => setActiveTab(COMPETING_TAB)}
              className={`${activeTab === COMPETING_TAB ? "bg-white" : "bg-gray"} w-36 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Competencia
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === COMPANIE_TAB && (
              <div className="flex gap-[.6rem]">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"agregar-empresa"}>
                  <Button text="Nueva Empresa" icon={PlusIcon} />
                </Link>
                <Link to={"agregar-ruta"}>
                  <Button text="Nueva Ruta" color={"save"} icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === COMPETING_TAB && (
              <div className="flex gap-[.6rem]">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"agregar-empresa"}>
                  <Button text="Nueva Empresa" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === COMPANIE_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Departamento
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Barrio
                  </th>

                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Vendedores
                  </th>

                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Próx. visita
                  </th>
                  <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
                    <div className="flex gap-2">
                      <h3>Estado</h3>
                      <img
                        src={FilterRightIcon}
                        alt="chevron-down icon"
                        className="h-5 w-5 cursor-pointer"
                      />
                      <img
                        src={ChevronDownIcon}
                        alt="chevron-down icon"
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                  </th>
                  <th className="p-2 text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {companiesResponse.map((companie, index) => (
                  <CompanieRow
                    key={index}
                    name={companie.name}
                    departament={companie.departament}
                    direction={companie.address}
                    sellers={"Vendedores"}
                    nextVisits={"24/09/2024"}
                    state={companie.status}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    notesIcon={notesIcon}
                    onEditClick={() => openModal(companie.id)}
                    onDeleteClick={() => openConfirmDeleteModal(companie.id)}
                    onClick={() => openSellersModal(companie.id)}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex justify-center p-6">
              <Pagination
                pageIndex={setItemsPerPage}
                currentPage={page}
                totalPages={totalPage}
                onPageChange={setPage}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
        {activeTab === COMPETING_TAB && <CompetingPage />}
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Editar Empresa"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={"Nombre de la empresa"}
            placeholder={"Escribe el nombre del local..."}
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
            errorApi={errors.name}
            msjError={errors.name ? errors.name.message : ""}
          />
          <Input
            label={"Departamento"}
            placeholder={"Escribir..."}
            {...register("departament", {
              required: "El departamento es obligatorio",
            })}
            errorApi={errors.departament}
            msjError={errors.departament ? errors.departament.message : ""}
          />
          <Input
            label={"Barrio"}
            placeholder={"Escribir..."}
            {...register("neighborhood", {
              required: "El barrio es obligatorio",
            })}
            errorApi={errors.neighborhood}
            msjError={errors.neighborhood ? errors.neighborhood.message : ""}
          />
          <div>
            <Input
              label={"Dirección"}
              placeholder={"Escribe la dirección del local..."}
              {...register("address", {
                required: "La dirección es obligatoria",
              })}
              errorApi={errors.address}
              msjError={errors.address ? errors.address.message : ""}
            />
            <Input
              label={"Referente"}
              placeholder={"Escribe el nombre del referente..."}
              {...register("managerName", {
                required: "El referente es obligatorio",
              })}
              errorApi={errors.managerName}
              msjError={errors.managerName ? errors.managerName.message : ""}
            />
            <Input
              label={"Contacto"}
              placeholder={"Escribe el teléfono del contacto..."}
              {...register("phone", {
                required: "El teléfono es obligatorio",
              })}
              errorApi={errors.phone}
              msjError={errors.phone ? errors.phone.message : ""}
            />
            <Input
              label={"R.U.T./CI"}
              placeholder={"Escribe los datos fiscales de la empresa..."}
              {...register("rut", {
                required: "El R.U.T. es obligatorio",
              })}
              errorApi={errors.rut}
              msjError={errors.rut ? errors.rut.message : ""}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-light text-black">
              Próxima visita
            </label>
            <DatePicker
              className="rounded-lg border"
              {...register("nextVisit", {
                required: "la fecha es obligatoria",
              })}
              errorApi={errors.nextVisit}
              msjError={errors.nextVisit ? errors.nextVisit.message : ""}
            />
          </div>

          <div className="mb-4 space-y-2">
            <label className="text-gray-700 mb-5 block text-sm font-medium">
              Asignar estado:
            </label>
            <Select
              labelPlacement="outside"
              label="Estado"
              className="rounded-lg border"
              {...register("status", {
                required: "El estado es obligatorio",
              })}
              errorApi={errors.status}
              msjError={errors.status ? errors.status.message : ""}
            >
              <SelectItem>Frecuente</SelectItem>
              <SelectItem>Potencial</SelectItem>
              <SelectItem>De Baja</SelectItem>
              <SelectItem>Potencial/Competencia</SelectItem>
            </Select>
          </div>
          <div className="space-y-2">
            <span>Notas</span>
            <div className="flex">
              <Button
                text="Nueva Nota"
                icon={PlusFillIcon}
                iconPosition={"left"}
                width="w-40"
                color={"cancel"}
                {...register("note", {
                  required: "La nota es obligatoria",
                })}
                errorApi={errors.note}
                msjError={errors.note ? errors.note.message : ""}
              />
            </div>
          </div>
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-5">
          <Button
            text="Descargar archivo XML"
            icon={DownloadIcon}
            color={"selected"}
            shadow="shadow-blur"
            iconPosition={"left"}
          />
        </div>
        <Button
          text="Descargar archivo PDF"
          icon={DownloadIcon}
          color={"cancel"}
          shadow="shadow-blur"
          iconPosition={"left"}
        />
      </ReusableModal>

      <ReusableModal
        isOpen={isSellersModalOpen}
        onClose={closeModal}
        title="Nombre Empresa"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          <p className="text-sm font-light leading-[1rem] text-black_b">
            Vendedores asignados
          </p>
          <Button
            text="Vendedor 1"
            icon={closeIcon}
            color={"selected"}
            width="w-full"
          />
          <Button
            text="Vendedor 2"
            icon={closeIcon}
            color={"selected"}
            width="w-full"
          />
          <Button
            text="Vendedor 3"
            icon={closeIcon}
            color={"selected"}
            width="w-full"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-light leading-[1rem] text-black_b">
            Agregar vendedores
          </p>
          <SearchInput
            placeholder="Buscar..."
            border="border"
            rounded="rounded-[0.375rem]"
            visibility="block"
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

export default CompaniesPage;
