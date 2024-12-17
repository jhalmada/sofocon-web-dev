import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import geoaltIcon from "../assets/icons/geo-alt.svg";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import { Select, SelectItem } from "@nextui-org/select";
import SearchInput from "../components/inputs/SearchInput";
import PlusIcon from "../assets/icons/plus.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { useForm } from "react-hook-form";
import CompanieRow from "../components/CompanieRow.jsx";
import CompetingPage from "./CompetingPage.jsx";
import notesIcon from "../assets/icons/sticky-fill.svg";
import { Checkbox } from "@nextui-org/react";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import { parseAbsoluteToLocal } from "@internationalized/date";
import usePutCompany from "../hooks/companies/usePutCompanies.js";
import sellerIcons from "../assets/icons/sellerIcon.svg";
import { BASE_URL } from "../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import useUserCompany from "../hooks/companies/useUsersCompany.js";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import pageLostImg from "../assets/images/pageLost.svg";
import listPriceIcon from "../assets/icons/listPriceIcon.svg";
import Calendar from "../components/calendar/Calendar.jsx";
import SaveImg from "../assets/img/save.png";
import deleteImg from "../assets/img/deleted.png";
import { PlaceAutocomplete, MapHandler } from "../hooks/Maps/funtionMaps.jsx";
import {
  AdvancedMarker,
  Map,
  Marker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { isMatch } from "lodash";
import useGetPriceList from "../hooks/priceList/useGetPriceList.js";

const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};

const COMPANIE_TAB = "companies";
const COMPETING_TAB = "competing";

const CompaniesPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectManual, setSelectManual] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [direccion, setDireccion] = useState("");
  const [posiciones, setPosiciones] = useState(null);

  const [companyId, setCompanyId] = useState(null);
  const { deleteCompany } = useDeleteCompanies();
  const {
    companiesResponse,
    downloadFile,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    nextVisit,
    search,
    status,
    setModified,
    setStatus,
    setNextVisit,
    setCompetence,
    setSearch: setSearchCompanies,
  } = useCompanies();

  const { changedCompany } = usePutCompany();

  const navegacionActive = (tabActive) => {
    switch (tabActive) {
      case COMPANIE_TAB:
        return COMPANIE_TAB;
      case COMPETING_TAB:
        return COMPETING_TAB;
      default:
        return COMPANIE_TAB;
    }
  };

  const [activeTab, setActiveTab] = useState(
    navegacionActive(sessionStorage.getItem("activeTab")),
  );
  const { setClient, priceListResponse } = useGetPriceList(companyId);
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
  const [listPriceModal, setListPriceModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalMap, setModalMap] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const handleDownloadExcel1 = () => {
    const url = `${BASE_URL}/${getClientsExcel}?competence=false${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;
    downloadFile(url, `Empresas.xlsx`);
  };

  const handleDownloadPdf1 = () => {
    const url = `${BASE_URL}/${getClientsPdf}?competence=false${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;

    downloadFile(url, `Empresas.pdf`);
  };
  const handleDownloadExcel2 = () => {
    const url = `${BASE_URL}/${getClientsExcel}?competence=true${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;
    downloadFile(url, `Empresas competencia.xlsx`);
  };

  const handleDownloadPdf2 = () => {
    const url = `${BASE_URL}/${getClientsPdf}?competence=true${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;

    downloadFile(url, `Empresas competencia.pdf`);
  };

  const visitOptions = ["< 1 mes", "< 2 meses", "> 2 meses"];
  const stateOptions = ["Frecuente", "Potencial", "De baja"];
  const {
    clearErrors,
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
    watch,
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
      setDataEdit(companyToEdit);
      const pos = { lat: companyToEdit.latitude, lng: companyToEdit.longitude };
      setPosiciones(pos);
      setDireccion("");

      setValue("name", companyToEdit?.name || "");
      setValue("department", companyToEdit?.department || "");
      setValue("neighborhood", companyToEdit?.neighborhood || "");
      setValue("address", companyToEdit?.address || "");
      setValue("managerName", companyToEdit?.managerName || "");
      setValue("phone", companyToEdit?.phone || "");
      setValue("rut", companyToEdit?.rut || "");
      setValue("status", companyToEdit?.status || "");
      setValue("ci", companyToEdit?.ci || "");
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
    setConfirmDelete(true);
  };

  const handleCancelClick = () => {
    const data = watch();
    const updatedData = {
      ...data,
      nextVisit: new Date(
        data.nextVisit.year,
        data.nextVisit.month - 1,
        data.nextVisit.day,
      ).toISOString(),
    };

    const hasChanges = !isMatch(dataEdit, updatedData);
    if (hasChanges) {
      openConfirmCancelModal();
    } else {
      closeModal();
    }
  };
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
        reset();
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
          latitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lat()
              : selectManual.lat,
          longitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lng()
              : selectManual.lng,
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
          latitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lat()
              : selectManual.lat,
          longitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lng()
              : selectManual.lng,
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
        setPage(0);
        break;
      case "< 2 meses":
        setNextVisit(2);
        setPage(0);
        break;
      case "> 2 meses":
        setNextVisit(3);
        setPage(0);
        break;
      default:
        setNextVisit(null);
        setPage(0);
        "selecciona una opción válida";
    }
  };
  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Frecuente":
        setStatus("FRECUENT");
        setPage(0);
        break;
      case "Potencial":
        setStatus("POTENTIAL");
        setPage(0);
        break;
      case "De baja":
        setStatus("UNSUBSCRIBED");
        setPage(0);
        break;
      default:
        setStatus("");
        setPage(0);
        break;
    }
  };
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
    if (activeTab === COMPETING_TAB) {
      setStatus("");
      setNextVisit(null);
      setCompetence(true);
    } else {
      setCompetence(false);
    }
  }, [activeTab]);

  useEffect(() => {
    setClient(companyId);
  }, [companyId]);

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
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Empresas
          </h1>
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
            <div>
              <div className="flex justify-end">
                {activeTab === COMPANIE_TAB && (
                  <SearchInput
                    placeholder="Buscar..."
                    onChange={setSearchCompanies}
                  />
                )}
              </div>

              <table className="mt-2 w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                      Nombre
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Dirección
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Departamento
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Barrio
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
                {companiesResponse.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center">
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
                  <tbody>
                    {companiesResponse.map((companie, index) => (
                      <CompanieRow
                        key={index}
                        id={companie.id}
                        name={companie.name}
                        direction={companie.address}
                        departament={companie.department}
                        neighborhood={companie.neighborhood}
                        sellers={"Vendedores"}
                        nextVisits={
                          companie.nextVisit
                            ? formatDate(companie.nextVisit)
                            : "Sin fecha"
                        }
                        state={companie.status}
                        editIconSrc={editIcon}
                        deleteIconSrc={deleteIcon}
                        notesIcon={notesIcon}
                        onEditClick={() => openModal(companie.id)}
                        onDeleteClick={() =>
                          openConfirmDeleteModal(companie.id)
                        }
                        sellersIcon={sellerIcons}
                        listPriceIcon={listPriceIcon}
                        onClick={() => {
                          openSellersModal(companie.id),
                            setCompetenceName(companie.name),
                            setCompanyId(companie.id),
                            setListUsers(companie.user);
                        }}
                        onClickListPrice={() => {
                          setListPriceModal(true), setClient(companie.id);
                        }}
                        onClick2={() => setCompanyId(companie.id)}
                      />
                    ))}
                  </tbody>
                )}
              </table>
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
            setSearch={setSearchCompanies}
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
            deleteCompany={deleteCompany}
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
              bg={!competence ? "bg-gray" : "bg-white"}
              border={!competence ? "none" : "border"}
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
            <div
              onClick={() => setModalMap(true)}
              className="mb-2 flex w-[8rem] cursor-pointer justify-center"
            >
              <img src={geoaltIcon} alt="geo Icon" />
              <span className="text-xs leading-[.88rem] underline">
                Marcar en el mapa
              </span>
            </div>
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
                minLength: {
                  value: 2,
                  message: "debe ingresar minimo 2 caracteres.",
                },
                maxLength: {
                  value: 15,
                  message: "Ingrese solo los 15 digitos de su numero.",
                },
              })}
              errorApi={errors.phone}
              msjError={errors.phone ? errors.phone.message : ""}
            />
            <div className="mt-5 flex gap-[.63rem]">
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
                  placeholder={"Escribe los caracteres del RUT..."}
                  {...register("rut", {
                    required:
                      checkSelected === "RUT" && "Este campo es requerido",
                    minLength: {
                      value: 2,
                      message: "Ingrese minimo 2 digitos.",
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
                  placeholder={"Escribe los caracteres del CI..."}
                  {...register("ci", {
                    required:
                      checkSelected === "CI" && "Este campo es requerido",
                    minLength: {
                      value: 2,
                      message: "Ingrese minimo 2 digitos.",
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
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-light text-black">
              Próxima visita
            </label>
            <Calendar
              control={control}
              errors={errors}
              setErrorDataPicker={setErrorDataPicker}
              errorDataPicker={errorDataPicker}
              name="nextVisit"
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
          <Button
            width="min-w-[14rem]"
            text="Descargar archivo Excel"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadExcel1}
          />

          <Button
            width="min-w-[14rem]"
            text="Descargar archivo PDF"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadPdf1}
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
            onClick={handleDownloadExcel2}
          />

          <Button
            width="min-w-[14rem]"
            text="Descargar archivo PDF"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadPdf2}
          />
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
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
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
      {/*modal para elementos eliminados*/}
      <ReusableModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Empresa Eliminada"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDelete(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            La empresa fue eliminada correctamente.
          </p>
        </div>
      </ReusableModal>
      {/**modal para las listas de precios */}
      <ReusableModal
        isOpen={listPriceModal}
        onClose={() => setListPriceModal(false)}
        title="Listas de precios asignadas"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setListPriceModal(false)}
      >
        <div>
          {priceListResponse.length > 0
            ? priceListResponse.map((list, index) => (
                <p className="mt-0 text-base" key={index}>
                  {list.name}
                </p>
              ))
            : "No hay listas de precios asignadas"}
        </div>
      </ReusableModal>
      {/**modal para el mapa */}

      <ReusableModal
        isOpen={modalMap}
        onClose={() => setModalMap(false)}
        title="Marcar ubicacion"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setModalMap(false)}
        width="w-[45.37rem]"
      >
        <div className="flex flex-col">
          <PlaceAutocomplete
            onPlaceSelect={setSelectedPlace}
            value={direccion}
            setSelectManual={setSelectManual}
          />

          <div>
            {" "}
            <Map
              style={{ height: "15rem" }}
              mapId={"8c732c82e4ec29d9"}
              defaultCenter={coordenadasUruguay}
              defaultZoom={5}
              gestureHandling={"greedy"}
              center={selectManual === false ? null : selectManual}
              disableDefaultUI={true}
            >
              <Marker
                ref={markerRef}
                draggable={true}
                position={
                  selectManual === false
                    ? posiciones === null
                      ? null
                      : {
                          lat: Number(posiciones.lat),
                          lng: Number(posiciones.lng),
                        }
                    : selectManual
                }
                onDragEnd={(e) => {
                  setSelectManual({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  }),
                    console.log(e);
                }}
              />

              <AdvancedMarker
                className={`${selectManual === false ? "visible" : "invisible"}`}
                ref={markerRef}
                position={null}
                draggable={true}
                onDragEnd={(e) =>
                  setSelectManual({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  })
                }
              />
            </Map>
            <MapHandler
              place={selectedPlace}
              marker={marker}
              setValue={setValue}
              setDireccion={setDireccion}
            />
          </div>
        </div>
      </ReusableModal>
    </div>
  );
};

export default CompaniesPage;
