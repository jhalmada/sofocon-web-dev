import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import { Select, SelectItem } from "@nextui-org/select";
import SearchInput from "../components/inputs/SearchInput";
import PlusIcon from "../assets/icons/plus.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { Controller, useForm } from "react-hook-form";
import CompanieRow from "../components/CompanieRow.jsx";
import CompetingPage from "./CompetingPage.jsx";
import notesIcon from "../assets/icons/sticky-fill.svg";
import { Checkbox, DatePicker } from "@nextui-org/react";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import { parseAbsoluteToLocal } from "@internationalized/date";
import usePutCompany from "../hooks/companies/usePutCompanies.js";
import { BASE_URL } from "../utils/Constants.js";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import useUserCompany from "../hooks/companies/useUsersCompany.js";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import pageLostImg from "../assets/images/pageLost.svg";

const COMPANIE_TAB = "companies";
const COMPETING_TAB = "competing";

const CompaniesPage = () => {
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
    setStatus,
    setNextVisit,
    setCompetence,
    setSearch: setSearchCompanies,
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
  const [competence, setCompetenceEdit] = useState(false);
  const [checkSelected, setCheckSelected] = useState("RUT");
  const [competenceName, setCompetenceName] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [errorDataPicker, setErrorDataPicker] = useState(false);

  const visitOptions = ["< 1 mes", "< 2 meses", "> 2 meses"];
  const stateOptions = ["Frecuente", "Potencial", "De baja"];
  const {
    clearErrors,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { handleSubmit: handleSubmit2, setValue: setValue2 } = useForm();
  const { userSellerResponse, setSearch } = useUsersSellers();
  const { addUsersCompany } = useUserCompany();
  const openModal = (id) => {
    clearErrors();
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
      companyToEdit.competenceName
        ? setCompetenceEdit(true)
        : setCompetenceEdit(false);
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
  const closeConfirmCancelModal = () => {
    setConfirmCancelModalOpen(false);
  };
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

    return `${day}/${month}/${year}`;
  };

  //funcion para transformar los Arrays
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  };

  const submit = (data) => {
    const user = data.sellers.map((seller) => ({ id: seller.id }));
    const datos = addUsersCompany({ user }, companyId, setModified);
    if (datos) {
      setIsSellersModalOpen(false);
    }
  };
  const handleVisitFilterChange = (value) => {
    console.log(value);
    switch (value) {
      case "< 1 mes":
        setNextVisit(1);
        break;
      case "< 2 meses":
        setNextVisit(2);
        break;
      case "> 2 meses":
        setNextVisit(3);
        break;
      default:
        setNextVisit(null);
        "selecciona una opción válida";
    }
  };
  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Frecuente":
        setStatus("FRECUENT");
        break;
      case "Potencial":
        setStatus("POTENTIAL");
        break;
      case "De baja":
        setStatus("UNSUBSCRIBED");
        break;
      default:
        setStatus("");
        break;
    }
  };
  useEffect(() => {
    if (activeTab === COMPETING_TAB) {
      setStatus("");
      setNextVisit(null);
      setCompetence(true);
    } else {
      setCompetence(false);
    }
  }, [activeTab]);

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
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Empresas
          </h1>
          {activeTab === COMPANIE_TAB && (
            <SearchInput
              placeholder="Buscar..."
              onChange={setSearchCompanies}
            />
          )}
          {activeTab === COMPETING_TAB && (
            <SearchInput
              placeholder="Buscar...."
              onChange={setSearchCompanies}
            />
          )}
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(COMPANIE_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === COMPANIE_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Listado
            </h2>
            <h2
              onClick={() => setActiveTab(COMPETING_TAB)}
              className={`${activeTab === COMPETING_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-40 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
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
                <Link to={"/inicio/empresas/agregar-ruta"}>
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
          <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
            <div className="flex justify-center">
              {companiesResponse.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                      Ningún elemento coincide con tu búsqueda, inténtalo de
                      nuevo. <br /> Puedes encontrar a las empresas creadas
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
                <table className="mt-2 w-full">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                        Nombre
                      </th>
                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        Departamento
                      </th>
                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        Barrio
                      </th>

                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        Vendedores
                      </th>

                      <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                        <div className="flex flex-col items-center gap-2">
                          <FilterSelect
                            options={visitOptions}
                            placeholder="Próx. visita"
                            onChange={handleVisitFilterChange}
                          />
                        </div>
                      </th>
                      <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
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
                    {companiesResponse.map((companie, index) => (
                      <CompanieRow
                        key={index}
                        id={companie.id}
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
                        onDeleteClick={() =>
                          openConfirmDeleteModal(companie.id)
                        }
                        onClick={() => {
                          openSellersModal(companie.id),
                            setCompetenceName(companie.name),
                            setCompanyId(companie.id),
                            setListUsers(companie.user);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div
              className={
                companiesResponse.length === 0
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
        {activeTab === COMPETING_TAB && (
          <CompetingPage
            companiesResponse={companiesResponse || []}
            setItemsPerPage={setItemsPerPage}
            totalPage={totalPage}
            total={total}
            setPage={setPage}
            page={page}
            itemsPerPage={itemsPerPage}
            setNextVisit={setNextVisit}
            onSubmit={onSubmit}
            changedCompany={changedCompany}
            setModified={setModified}
            setSaveConfirmationModalOpen={setSaveConfirmationModalOpen}
          />
        )}
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
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
                required: "Este campo es requerido",
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
          </div>

          <div>
            <Checkbox
              defaultSelected={competence}
              onClick={() => setCompetenceEdit(!competence)}
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
            {competence ? (
              <>
                <Select
                  placeholder="Seleccionar estado"
                  className={`rounded-lg border ${errors.status ? "border-red_e" : ""}`}
                  {...register("status", {
                    required: "Este campo es requerido",
                  })}
                  onSelectionChange={(values) => setValue("status", values)}
                >
                  <SelectItem key={"COMPETENCE"}>Competencia</SelectItem>
                </Select>
                <p className="mt-1 font-roboto text-xs text-red_e">
                  {errors.status ? errors.status.message : ""}
                  {console.log(errors.status)}
                </p>
              </>
            ) : (
              <>
                <Select
                  placeholder="Seleccionar estado"
                  className={`rounded-lg border ${errors.status ? "border-red_e" : ""}`}
                  {...register("status", {
                    required: "Este campo es requerido",
                  })}
                  onSelectionChange={(values) => setValue("status", values)}
                >
                  <SelectItem key={"FRECUENT"}>Frecuente</SelectItem>
                  <SelectItem key={"POTENTIAL"}>Potencial</SelectItem>
                  <SelectItem key={"UNSUBSCRIBED"}>De Baja</SelectItem>
                </Select>
                <p className="mt-1 font-roboto text-xs text-red_e">
                  {errors.status ? errors.status.message : ""}
                  {console.log(errors.status)}
                </p>
              </>
            )}
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
                  <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                    <DatePicker
                      granularity="day"
                      minValue={today(getLocalTimeZone())}
                      className={`${errors.nextVisit ? "text-red_e" : ""} ${errors.nextVisit ? "border-red_e" : ""} rounded-lg border`}
                      {...field}
                      label={""}
                      placeholder="Seleccione una fecha"
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
                  </div>
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
              <p className="font-roboto text-xs text-red_e">
                {errorDataPicker ? "La fecha de visita expiró" : ""}
              </p>
            </I18nProvider>
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
        isOpen={isSellersModalOpen}
        onClose={handleCancelClick}
        title={competenceName}
        onSubmit={handleSubmit2(submit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit2(submit)}>
          <NextAutoComplete
            label={"Agregar vendedores"}
            label2={"Vendedores asignados"}
            array={
              userSellerResponse?.result?.map((seller) => ({
                id: seller.id,
                name: seller.userInfo.fullName,
              })) || []
            }
            array2={
              listUsers.map((seller) => ({
                id: seller.id,
                name: seller.userInfo.fullName,
              })) || []
            }
            name={"sellers"}
            setValue={setValue2}
            onChange={setSearch}
          />
        </form>
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
