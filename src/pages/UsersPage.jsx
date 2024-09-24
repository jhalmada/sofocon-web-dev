import { useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow";
import TableRole from "../components/tables/TableRole";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/react";
import SearchInput from "../components/inputs/SearchInput";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
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
import useRoles from "../hooks/roles/use.roles";
import useDeleteUsers from "../hooks/users/useDeleteUsers.js";

const USER_TAB = "users";
const ROLES_TAB = "roles";

const UsersPage = () => {
  const [userPage, setUserPage] = useState(5);
  const { changedUser, isChanged } = usePutUsers();
  const [userId, setUserId] = useState(null);
  const { usersResponse, loading } = useUsers();
  const { RolesResponse } = useRoles();
  const { deleteUser, isDeleted, isLoading } = useDeleteUsers();
  const [activeTab, setActiveTab] = useState(USER_TAB);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isExistingRoleChecked, setIsExistingRoleChecked] = useState(false);
  const [isNewRoleChecked, setIsNewRoleChecked] = useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const [userData, setUserData] = useState(null);

  const totalUsers = usersResponse ? usersResponse.result.length : 0;
  const totalPages = Math.ceil(totalUsers / userPage);

  const startIndex = (currentPage - 1) * userPage;
  const paginatedUsers = usersResponse
    ? usersResponse.result.slice(startIndex, startIndex + userPage)
    : [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const openModal = (id) => {
    const userToEdit = usersResponse.result.find((user) => user.id === id);
    if (userToEdit) {
      setUserData({
        userInfo: {
          fullName: userToEdit.userInfo.fullName,
          email: userToEdit.email,
        },
        role: {
          id: userToEdit.role.id,
        },
      });
      // Set form values
      setValue("fullName", userToEdit.userInfo.fullName);
      setValue("email", userToEdit.email);
      setValue("role", userToEdit.role.id);
    }
    setIsModalOpen(true);
    setUserId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };

  const pageIndexChange = (e) => {
    setUserPage(e);
  };

  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const openSaveConfirmationModal = () => setSaveConfirmationModalOpen(true);
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
    deleteUser(userId);
    closeConfirmDeleteModal();
  };

  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await changedUser(userData, userId);
      console.log(newUser);
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
            s,
          },
        });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <div className="mb-4 flex items-center">
          <img
            src={ChevronLeftIcon}
            alt="arrow left"
            className="-ml-1 h-4 w-4"
          />
          <Link
            to="/inicio"
            className="cursor-pointer text-sm font-medium leading-4"
          >
            Volver
          </Link>
        </div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(USER_TAB)}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === USER_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab(ROLES_TAB)}
              className={`${activeTab === ROLES_TAB ? "bg-white" : "bg-gray"} w-36 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Roles
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-between gap-[0.875rem] rounded p-2">
            <SearchInput placeholder="Buscar..." />
            {activeTab === USER_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                />
                <Link to={"agregar-usuario"}>
                  <Button text="Nuevo Usuario" icon={PlusIcon} />
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
          <div className="rounded-tr-lg bg-white p-5 shadow-t">
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
                    <h3>Rol</h3>
                    <div className="flex gap-2">
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
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <UserRow
                    key={index}
                    fullName={`${user.userInfo.fullName} `}
                    email={user.email}
                    password=""
                    role={user?.role?.name}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    onEditClick={() => openModal(user.id)}
                    onDeleteClick={() => openConfirmDeleteModal(user.id)}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex justify-center p-6">
              <Pagination
                pageIndex={pageIndexChange}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
              required: "El nombre completo es obligatorio",
            })}
            errorApi={errors.fullName}
            msjError={errors.fullName ? errors.fullName.message : ""}
          />
          <Input
            label={"Correo electrónico"}
            placeholder={"Escribe el email del usuario..."}
            {...register("email", {
              required: "El correo electrónico es obligatorio",
            })}
            errorApi={errors.email}
            msjError={errors.email ? errors.email.message : ""}
          />
          <div>
            <Input
              type="password"
              label={"Contraseña"}
              placeholder={"Escribe la contraseña..."}
              icon1={IconEye}
              icon2={IconEyeSlash}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Debes incluir al menos una mayúscula",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Debes incluir al menos una minúscula",
                  hasNumber: (value) =>
                    /\d/.test(value) || "Debes incluir al menos un número",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*()_+\-=\[\]{}|;':"\\/,.<>?]/.test(value) ||
                    "Debes incluir al menos un carácter especial",
                },
              })}
              errorApi={errors.password}
              msjError={errors.password ? errors.password.message : ""}
            />
          </div>
          <div className="mb-4 space-y-2">
            <Checkbox
              defaultSelected={checkSelected === "existente"}
              isSelected={checkSelected === "existente"}
              onClick={() => setCheckSelected("existente")}
              radius="full"
            >
              Asignar rol existente
            </Checkbox>
            <Select
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
          </div>
          <div className="space-y-2">
            <Checkbox
              radius="full"
              isSelected={checkSelected === "nuevo"}
              onClick={() => setCheckSelected("nuevo")}
            >
              Asignar nuevo rol
            </Checkbox>
            <Input
              label={"Nombre del rol"}
              disabled={checkSelected === "existente"}
              placeholder={"Escribe el nombre del rol..."}
              {...register("nameRole", {
                required:
                  checkSelected === "nuevo"
                    ? "Debes ingresar el nombre del rol"
                    : false,
              })}
              error={errors.nameRole?.message}
            />
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
        onAccept={() => handleConfirmDelete(userId)}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default UsersPage;
