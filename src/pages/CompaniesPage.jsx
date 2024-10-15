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
import { Controller, useForm } from "react-hook-form";
import CompanieRow from "../components/CompanieRow.jsx";
import CompetingPage from "./CompetingPage.jsx";
import notesIcon from "../assets/icons/sticky-fill.svg";
import { Checkbox, DatePicker, Tooltip } from "@nextui-org/react";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import closeIcon from "../assets/icons/x-lg.svg";
import { parseAbsoluteToLocal } from "@internationalized/date";
import usePutCompany from "../hooks/companies/usePutCompanies.js";
import { BASE_URL } from "../utils/Constants.js";
import { I18nProvider } from "@react-aria/i18n";
import { getUsersExcel, getUsersPdf } from "../services/user/user.routes.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";

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
  const { changedCompany } = usePutCompany();
  const [activeTab, setActiveTab] = useState(COMPANIE_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [competence, setCompetence] = useState(false);
  const [checkSelected, setCheckSelected] = useState("RUT");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const openModal = (id) => {
    const companyToEdit = companiesResponse.find(
      (company) => company.id === id,
    );
    if (companyToEdit) {
      setValue("name", companyToEdit?.name || "");
      setValue("department", companyToEdit?.department || "");
      setValue("neighborhood", companyToEdit?.neighborhood || "");
      setValue("address", companyToEdit?.address || "");
      setValue("managerName", companyToEdit?.managerName || "");
      setValue("phone", companyToEdit?.phone || "");
      setValue("rut", companyToEdit?.rut || "");
      setValue("status", companyToEdit?.status || "");
      setValue(
        "nextVisit",
        parseAbsoluteToLocal(
          companyToEdit?.nextVisit || "2024-10-02T21:46:00.330Z",
        ),
      );
      companyToEdit.competenceName
        ? setValue("competenceName", companyToEdit.competenceName)
        : setValue("competenceName", "");
      companyToEdit.competenceName ? setCompetence(true) : setCompetence(false);
    }
    setIsModalOpen(true);
    setCompanyId(id);
    setIsModalOpen(true);
  };
  const openExportModal = () => {
    setIsExportModalOpen(true);
  };
  const openExportCompetingModal = () => {
    setIsExportCompetingModalOpen(true);
  };
  const openSellersModal = () => {
    setIsSellersModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setIsExportCompetingModalOpen(false);
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
  //esta funcion se encarga de crear una nueva empresa, la podemos sacar a un hook y que ademas de pedir los datos de la empresa, tambien pida el metodo(POST, PUT, DELETE) y el id de la empresa a modificar
  const handleCompanyCreation = async (companyData) => {
    try {
      const newCompany = await changedCompany(
        companyData,
        companyId,
        setModified,
      );

      if (newCompany) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setIsModalOpen(true);
    }
  };

  const onSubmit = (data) => {
    const {
      nextVisit,
      name,
      department,
      managerName,
      phone,
      status,
      address,
      neighborhood,
      competenceName,
    } = data;
    const newdata = new Date(
      nextVisit.year,
      nextVisit.month - 1,
      nextVisit.day,
    );

    //formate la fecha para que sea aceptada por el back
    const formattedDate = newdata.toISOString();
    switch (checkSelected) {
      case "RUT":
        handleCompanyCreation({
          name,
          department,
          managerName,
          phone,
          status,
          address,
          neighborhood,
          nextVisit: newdata,
          rut: data.rut,
          competenceName: competence ? competenceName : "",
        });
        break;
      default:
        handleCompanyCreation({
          name,
          department,
          managerName,
          phone,
          status,
          address,
          neighborhood,
          nextVisit: formattedDate,
          ci: data.ci,
          competenceName: competence ? competenceName : "",
        });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };

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
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === COMPANIE_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Listado
            </h2>
            <h2
              onClick={() => setActiveTab(COMPETING_TAB)}
              className={`${activeTab === COMPETING_TAB ? "bg-white" : "bg-gray"} w-40 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
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
                <Link to={"/inicio/rutas/agregar-ruta"}>
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
                  onClick={() => openExportCompetingModal()}
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
                    departament={companie.department}
                    direction={companie.address}
                    sellers={"Vendedores"}
                    nextVisits={formatDate(companie.nextVisit)}
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
          <div>
            <Input
              label={"Nombre de la empresa"}
              placeholder={"Escribe el nombre del local..."}
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
          </div>
          <Input
            label={"Empresa actual"}
            placeholder={"Nombre..."}
            {...register("name", {
              required: "Este campo es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe contener al menos 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres.",
              },
            })}
            errorApi={errors.name}
            msjError={errors.name ? errors.name.message : ""}
          />
          <div>
            <Checkbox
              defaultSelected={competence}
              onClick={() => setCompetence(!competence)}
              radius="full"
              className="font-light"
              size="sm"
            >
              Cliente de la competencia
            </Checkbox>
            <Input
              disabled={!competence}
              label={"Empresas actual"}
              placeholder={"Escribe el nombre..."}
              {...register("competenceName", {
                required: competence && "Este campo es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.competenceName}
              msjError={
                errors.competenceName ? errors.competenceName.message : ""
              }
            />
          </div>
          <Input
            label={"Departamento"}
            placeholder={"Escribir..."}
            {...register("department", {
              required: "Este campo es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe contener al menos 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres.",
              },
            })}
            errorApi={errors.department}
            msjError={errors.department ? errors.department.message : ""}
          />
          <Input
            label={"Barrio"}
            placeholder={"Escribir..."}
            {...register("neighborhood", {
              required: "Este campo es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe contener al menos 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres.",
              },
            })}
            errorApi={errors.neighborhood}
            msjError={errors.neighborhood ? errors.neighborhood.message : ""}
          />
          <div>
            <Input
              label={"Dirección"}
              placeholder={"Escribir..."}
              {...register("address", {
                required: "Este campo es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.address}
              msjError={errors.address ? errors.address.message : ""}
            />
            <Input
              label={"Referente"}
              placeholder={"Escribe el nombre del referente..."}
              {...register("managerName", {
                required: "Este campo es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.managerName}
              msjError={errors.managerName ? errors.managerName.message : ""}
            />
            <Input
              type={"number"}
              label={"Contacto"}
              placeholder={"Escribe el teléfono del contacto..."}
              {...register("phone", {
                required: "Este campo es requerido",
                minLength: {
                  value: 15,
                  message: "Ingrese los 15 digitos de su numero.",
                },
                maxLength: {
                  value: 15,
                  message: "Ingrese solo los 15 digitos de su numero.",
                },
              })}
              errorApi={errors.phone}
              msjError={errors.phone ? errors.phone.message : ""}
            />
            <div className="flex gap-[.63rem]">
              <div className="w-full">
                <Checkbox
                  defaultSelected={checkSelected === "RUT"}
                  isSelected={checkSelected === "RUT"}
                  onClick={() => setCheckSelected("RUT")}
                  radius="full"
                  className="font-light"
                  size="sm"
                >
                  Asignar R.U.T.:
                </Checkbox>
                <Input
                  type={"number"}
                  isSelected={checkSelected === "RUT"}
                  disabled={checkSelected !== "RUT"}
                  placeholder={"Escribe los 12 caracteres del RUT..."}
                  {...register("rut", {
                    required:
                      checkSelected === "RUT" && "Este campo es requerido",
                    minLength: {
                      value: 12,
                      message: "Ingrese los 12 digitos de su RUT.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Ingrese solo los 12 digitos de su RUT.",
                    },
                  })}
                  errorApi={checkSelected === "RUT" && errors.rut}
                  msjError={
                    checkSelected === "RUT" && errors.rut
                      ? errors.rut.message
                      : ""
                  }
                />
              </div>
              <div className="w-full">
                <Checkbox
                  isSelected={checkSelected === "CI"}
                  onClick={() => setCheckSelected("CI")}
                  radius="full"
                  className="font-light"
                  size="sm"
                >
                  Asignar CI:
                </Checkbox>
                <Input
                  type={"number"}
                  disabled={checkSelected !== "CI"}
                  placeholder={"Escribe los 8 caracteres del CI..."}
                  {...register("ci", {
                    required:
                      checkSelected === "CI" && "Este campo es requerido",
                    minLength: {
                      value: 8,
                      message: "Ingrese los 8 digitos de su CI.",
                    },
                    maxLength: {
                      value: 8,
                      message: "Ingrese solo los 8 digitos de su CI.",
                    },
                  })}
                  errorApi={checkSelected === "CI" && errors.ci}
                  msjError={
                    checkSelected === "CI" && errors.ci ? errors.ci.message : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className="mb-4 space-y-2">
            <label
              className={`mb-2 block text-sm font-medium ${errors.status ? "text-red_e" : "text-gray-700"}`}
            >
              Asignar estado:
            </label>
            <Select
              placeholder="estado"
              className={`${errors.status ? "text-red_e" : ""} ${errors.status ? "border-red_e" : ""} rounded-lg border`}
              {...register("status", {
                required: {
                  value: true,
                  message: "El estado es obligatorio",
                },
              })}
              onSelectionChange={(value) => setValue("status", value)}
            >
              <SelectItem key={"FRECUENT"}>Frecuente</SelectItem>
              <SelectItem key={"POTENTIAL"}>Potencial</SelectItem>
              <SelectItem key={"UNSUBSCRIBED"}>De Baja</SelectItem>
              <SelectItem key={"COMPETENCE"}>Competencia</SelectItem>
            </Select>
            <p className="font-roboto text-xs text-red_e">
              {errors.status ? errors.status.message : ""}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-light text-black">
              Próxima visita
            </label>
            <I18nProvider locale="es-ES">
              <Controller
                name={"nextVisit"}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    granularity="day"
                    className={`${errors.nextVisit ? "text-red_e" : ""} ${errors.nextVisit ? "border-red_e" : ""} rounded-lg border`}
                    {...field}
                    label={""}
                    placeholder="Seleccione una fecha"
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "La fecha es obligatoria",
                  },
                }}
              />
              <p className="font-roboto text-xs text-red_e">
                {errors.nextVisit ? errors.nextVisit.message : ""}
              </p>
            </I18nProvider>
          </div>
          <div className="space-y-2">
            <span>Notas</span>
            <Tooltip content="vendra en una mejora" placement="bottom-start">
              <div className="flex">
                <Button
                  text="Nueva Nota"
                  icon={PlusFillIcon}
                  iconPosition={"left"}
                  width="w-40"
                  color={"cancel"}
                />
              </div>
            </Tooltip>
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
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a href={`${BASE_URL}/${getClientsPdf}`} download target="_blank">
            <Button
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
