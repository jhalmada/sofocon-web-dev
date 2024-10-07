import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import Input from "../components/inputs/Input.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/react";
import SearchInput from "../components/inputs/SearchInput.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import DownloadIcon from "../assets/icons/download.svg";
import useCompanies from "../hooks/companies/useCompanies.js";
import usePutCompany from "../hooks/companies/usePutCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import { useForm } from "react-hook-form";

import { permisos } from "../utils/permisons.js";
import useRoles from "../hooks/roles/use.roles.js";
import RouteMapDetailsRow from "../components/RouteMapDetailsRow.jsx";
import RouteSellerDetailsRow from "../components/RouteSellerDetailsRow.jsx";
import RouteCompanieDetailsRow from "../components/RouteCompanieDetailsRow.jsx";

const MAP_TAB = "map";
const SELLERS_TAB = "sellers";
const COMPANIES_TAB = "companies";

const RouteMapDetailsPage = () => {
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
  const { RolesResponse } = useRoles();

  const [activeTab, setActiveTab] = useState(MAP_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const openModal = (id) => {
    const companyToEdit = companiesResponse.find(
      (company) => company.id === id,
    );
    if (companyToEdit) {
      // Set form values
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

  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
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

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await changedUser(userData, companyId, setModified);

      if (newUser) {
        setSaveConfirmationModalOpen(true);
      } else {
        console.error(
          "No se recibió un nuevo usuario después de la actualización",
        );
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setIsModalOpen(true);
    }
  };

  const onSubmit = (data) => {
    const { fullName, email, password, role, nameRole, permissions } = data;

    switch (checkSelected) {
      case "existente":
        handleUserCreation({
          email,
          password,
          userInfo: {
            fullName,
          },
          role: { id: role },
        });
        break;
      default:
        handleUserCreation({
          email,
          password,
          fullName: {
            fullName,
          },
          role: {
            name: nameRole,
            permissions: [...permissions, "USER_ADMIN"],
          },
        });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses están indexados desde 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/rutas"
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
            Nombre de ruta
          </h1>
          <SearchInput placeholder="Buscar..." />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(MAP_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === MAP_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Mapa
            </h2>
            <h2
              onClick={() => setActiveTab(SELLERS_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === SELLERS_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Vendedores
            </h2>
            <h2
              onClick={() => setActiveTab(COMPANIES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === COMPANIES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Empresas
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {(activeTab === MAP_TAB || activeTab === COMPANIES_TAB) && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                />
                <Link to={"/inicio/empresas/agregar-empresa"}>
                  <Button text="Agregar empresa" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === SELLERS_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                />
                <Link to={"/inicio"}>
                  <Button text="Agregar vendedor" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === MAP_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Zona
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Empresas
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Vendedores
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
                </tr>
              </thead>
              <tbody>
                <RouteMapDetailsRow
                  name="nombre de ruta"
                  zone="zona de la ruta"
                  companies="214"
                  sellers="35"
                  state="Activo"
                />
              </tbody>
            </table>
            <div className="flex justify-center p-6">
              <Pagination
                pageIndex={setItemsPerPage}
                currentPage={page}
                totalPages={totalPage}
                onPageChange={setPage}
                itemPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
        {activeTab === SELLERS_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre completo
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Contacto
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
                <RouteSellerDetailsRow
                  name="Nombre completo"
                  contact={"email/tel"}
                  state="Activo"
                  deleteIconSrc={deleteIcon}
                  onDeleteClick={() => openConfirmDeleteModal()}
                />
              </tbody>
            </table>
            <div className="flex justify-center p-6">
              <Pagination
                pageIndex={setItemsPerPage}
                currentPage={page}
                totalPages={totalPage}
                onPageChange={setPage}
                itemPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
        {activeTab === COMPANIES_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>

                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Dirección
                  </th>

                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Próx. visita
                  </th>
                  <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
                    <div className="flex w-full gap-2">
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
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Notas
                  </th>
                  <th className="p-2 text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {companiesResponse.map((companie, index) => (
                  <RouteCompanieDetailsRow
                    key={index}
                    name={companie.name}
                    direction={companie.address}
                    nextVisits={formatDate(companie.nextVisit)}
                    state={"activo"}
                    notes={"ver notas"}
                    deleteIconSrc={deleteIcon}
                    onDeleteClick={() => openConfirmDeleteModal(companie.id)}
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
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Editar Usuario"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={"Nombre Completo"}
            placeholder={"Escribe el nombre completo del usuario..."}
            {...register("fullName", {
              required: "Este campo es obligatorio",
            })}
            errorApi={errors.fullName}
            msjError={errors.fullName ? errors.fullName.message : ""}
          />
          <Input
            placeholder={"Escribe tu correo"}
            label={"Dirección de correo"}
            {...register("email", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              pattern: {
                value:
                  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                message: "Formato de email incorrecto",
              },
            })} // Add this line
            errorApi={errors.email}
            msjError={errors.email ? errors.email.message : ""}
          />

          <div className="space-y-4">
            <Checkbox
              defaultSelected={checkSelected === "existente"}
              isSelected={checkSelected === "existente"}
              onClick={() => setCheckSelected("existente")}
              radius="full"
              className="font-light"
            >
              Asignar rol existente
            </Checkbox>
            <Select
              className="rounded-lg border"
              isDisabled={checkSelected === "nuevo"}
              {...register("role", {
                required:
                  checkSelected === "existente"
                    ? "Debes seleccionar un rol"
                    : false,
              })}
              onSelectionChange={(value) => setValue("role", value)}
            >
              {RolesResponse &&
                RolesResponse.map((rol) => (
                  <SelectItem key={rol.id}>{rol.name}</SelectItem>
                ))}
            </Select>

            <Checkbox
              radius="full"
              isSelected={checkSelected === "nuevo"}
              onClick={() => setCheckSelected("nuevo")}
              className="font-light"
            >
              Asignar nuevo rol
            </Checkbox>

            <Input
              disabled={checkSelected === "existente"}
              placeholder={"Escribe el nombre del rol..."}
              {...register("nameRole", {
                required:
                  checkSelected === "nuevo"
                    ? "Debes ingresar el nombre del rol"
                    : false,
              })}
              errorApi={errors.nameRole}
              msjError={errors.nameRole ? errors.nameRole.message : ""}
            />

            <Select
              isDisabled={checkSelected === "existente"}
              placeholder="Permisos"
              selectionMode="multiple"
              className="max-w rounded-lg border font-roboto font-medium"
              {...register("permissions", {
                required:
                  checkSelected === "nuevo" ? "Debes asignar permisos" : false,
              })}
              onSelectionChange={(values) => setValue("permissions", values)}
            >
              {permisos.map((permiso) => (
                <SelectItem key={permiso.key}>{permiso.label}</SelectItem>
              ))}
            </Select>
            {errors.permissions && errors.permissions.message ? (
              <span className="font-roboto text-xs text-red_e">
                {errors.permissions.message}
              </span>
            ) : (
              " "
            )}
          </div>
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
        title="Eliminar usuario"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(companyId)}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default RouteMapDetailsPage;
