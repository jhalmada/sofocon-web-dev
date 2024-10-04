import { useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow.jsx";
import TableRole from "../components/tables/TableRole.jsx";
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
import DownloadIcon from "../assets/icons/download.svg";
import useUsers from "../hooks/users/use.users.js";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import usePutUsers from "../hooks/users/usePutUsers.js";
import { useForm } from "react-hook-form";
import useRoles from "../hooks/roles/use.roles.js";
import useDeleteUsers from "../hooks/users/useDeleteUsers.js";
import { permisos } from "../utils/permisons";
import { BASE_URL } from "../utils/Constants.js";
import { getClientsExcel } from "../services/companies/companies.routes.js";
import SellerRow from "../components/SellerRow.jsx";

const USER_TAB = "users";
const SELLERS_TAB = "sellers";
const ROLES_TAB = "roles";

const UsersPage = () => {
  const { changedUser } = usePutUsers();
  const [userId, setUserId] = useState(null);
  const {
    usersResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useUsers();
  const { RolesResponse } = useRoles();
  const { deleteUser } = useDeleteUsers();
  const [activeTab, setActiveTab] = useState(USER_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
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
    const userToEdit = usersResponse.find((user) => user.id === id);

    if (userToEdit) {
      // Set form values
      setValue("fullName", userToEdit.userInfo.fullName);
      setValue("email", userToEdit.email);
      setValue("role", userToEdit?.role?.id || "");
    }
    setIsModalOpen(true);
    setUserId(id);
  };

  const openExportModal = (id) => {
    setIsExportModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
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
    setUserId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

  const handleConfirmDelete = () => {
    deleteUser(userId, setModified);
    closeConfirmDeleteModal();
  };

  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await changedUser(userData, userId, setModified);

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
            Personal
          </h1>
          <SearchInput placeholder="Buscar..." />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(USER_TAB)}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === USER_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab(SELLERS_TAB)}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === SELLERS_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Vendedores
            </h2>
            <h2
              onClick={() => setActiveTab(ROLES_TAB)}
              className={`${activeTab === ROLES_TAB ? "bg-white" : "bg-gray"} w-36 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Roles
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === USER_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"agregar-usuario"}>
                  <Button text="Nuevo Usuario" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === SELLERS_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"agregar-vendedor"}>
                  <Button text="Nuevo Vendedor" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === ROLES_TAB && (
              <Link to="agregar-rol">
                <Button text="Nuevo Rol" icon={PlusIcon} />
              </Link>
            )}
          </div>
        </div>
        {activeTab === USER_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre Completo
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Email
                  </th>
                  <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
                    <div className="flex gap-2">
                      <h3>Rol</h3>
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
                {usersResponse.map((user, index) => (
                  <UserRow
                    key={index}
                    fullName={`${user.userInfo.fullName} `}
                    email={user.email}
                    password=""
                    role={user?.role?.name}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    onEditClick={() => {
                      openModal(user.id);
                    }}
                    onDeleteClick={() => openConfirmDeleteModal(user.id)}
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
                    Nombre Completo
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Contacto
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Ruta
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Estado
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Mas info
                  </th>
                  <th className="p-2 text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersResponse.map((user, index) => (
                  <SellerRow
                    key={index}
                    fullName={`${user.userInfo.fullName} `}
                    email={user.email}
                    route={"Ruta"}
                    state={"Activo"}
                    info={"Ver más"}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    onEditClick={() => {
                      openModal(user.id);
                    }}
                    onDeleteClick={() => openConfirmDeleteModal(user.id)}
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
                itemPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
        {activeTab === ROLES_TAB && <TableRole />}
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
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-5">
          <a href={`${BASE_URL}/${getClientsExcel}`} download target="_blank">
            <Button
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"selected"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
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
        onAccept={() => handleConfirmDelete(userId)}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default UsersPage;
