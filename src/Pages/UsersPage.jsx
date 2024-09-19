import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow";
import { users } from "../utils/Datainfo";
import TableRole from "../components/tables/TableRole";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import Select from "../components/selects/Select";
import Checkbox from "../components/checkboxs/Checkbox";
import SearchInput from "../components/inputs/SearchInput";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import PlusIcon from "../assets/icons/plus.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";

const USER_TAB = "users";
const ROLES_TAB = "roles";
const NEW_USER_DEFAULT = false;

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState(USER_TAB);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState(NEW_USER_DEFAULT);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };

  const openConfirmCancelModal = () => {
    setConfirmCancelModalOpen(true);
  };

  const closeConfirmCancelModal = () => {
    setConfirmCancelModalOpen(false);
  };

  const openSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(true);
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };

  const openConfirmDeleteModal = (user) => {
    setSelectedUser(user);
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    console.log("usuario eliminado");

    closeConfirmDeleteModal();
  };

  const handleCancelClick = () => {
    openConfirmCancelModal();
  };

  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openSaveConfirmationModal();
  };

  useEffect(() => {
    setNewUser(NEW_USER_DEFAULT);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      {newUser === false && (
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
                  <Link to={"agregar-usuario"} onClick={() => setNewUser(true)}>
                    <Button text="Nuevo Usuario" icon={PlusIcon} />
                  </Link>
                </div>
              )}
              {activeTab === ROLES_TAB && (
                <Link to="agregar-rol" onClick={() => setNewUser(true)}>
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
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]"></th>
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                      Nombre Completo
                    </th>
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                      Email
                    </th>
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                      Contraseña
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
                  {users.map((user, index) => (
                    <UserRow
                      key={index}
                      avatarSrc={user.avatarSrc}
                      fullName={user.fullName}
                      email={user.email}
                      password={user.password}
                      role={user.role}
                      editIconSrc={user.editIconSrc}
                      deleteIconSrc={user.deleteIconSrc}
                      onEditClick={openModal}
                      onDeleteClick={() => openConfirmDeleteModal(user)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === ROLES_TAB && <TableRole />}
        </div>
      )}
      <div className="flex justify-center p-6">
        <Pagination />
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Editar Usuario"
        onSubmit={handleSubmit}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <Input
          label={"Nombre completo"}
          placeholder={"Escribe el nombre completo del usuario..."}
        />
        <Input
          label={"Correo electrónico"}
          placeholder={"Escribe el email del usuario..."}
        />
        <div>
          <Input
            label={"Contraseña"}
            placeholder={"Escribe la contraseña..."}
            type="password"
            icon1={IconEye}
            icon2={IconEyeSlash}
          />
          <p className="-mt-6 text-xs leading-[.875rem] text-black_b">
            *Este campo debe contener entre 8 y 20 caracteres alfanuméricos
          </p>
        </div>
        <Checkbox text={"Asignar rol existente"} />
        <Select option={"Rol"} />
        <Checkbox text={"Asignar nuevo rol"} />
        <Input placeholder={"Escribe el nombre del rol..."} />
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
        onAccept={handleConfirmDelete}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default UsersPage;
