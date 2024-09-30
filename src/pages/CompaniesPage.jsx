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
import useUsers from "../hooks/users/use.users.js";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import usePutUsers from "../hooks/users/usePutUsers.js";
import { useForm } from "react-hook-form";
import useRoles from "../hooks/roles/use.roles";
import useDeleteUsers from "../hooks/users/useDeleteUsers.js";
import CompanieRow from "../components/CompanieRow.jsx";
import CompetingPage from "./CompetingPage.jsx";
import notesIcon from "../assets/icons/sticky-fill.svg";
import { DatePicker } from "@nextui-org/react";
import PlusFillIcon from "../assets/icons/plus-fill.svg";

const COMPANIE_TAB = "companies";
const COMPETING_TAB = "competing";

const CompaniesPage = () => {
  const [userPage, setUserPage] = useState(5);
  const { changedUser, isChanged } = usePutUsers();
  const [userId, setUserId] = useState(null);
  const { usersResponse, loading } = useUsers();
  const { RolesResponse } = useRoles();
  const { deleteUser, isDeleted, isLoading } = useDeleteUsers();
  const [activeTab, setActiveTab] = useState(COMPANIE_TAB);
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

  const totalUsers = usersResponse ? usersResponse.length : 0;
  const totalPages = Math.ceil(totalUsers / userPage);

  const startIndex = (currentPage - 1) * userPage;
  const paginatedUsers = usersResponse
    ? usersResponse.slice(startIndex, startIndex + userPage)
    : [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const openModal = (id) => {
    const userToEdit = usersResponse.find((user) => user.id === id);
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
                {paginatedUsers.map((user, index) => (
                  <CompanieRow
                    key={index}
                    name={"Nombre empresa"}
                    departament={"Nombre dpto"}
                    direction={"Barrio"}
                    sellers={"Vendedores"}
                    nextVisits={"24/09/2024"}
                    state={"Frecuente"}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    notesIcon={notesIcon}
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label={"Nombre de la empresa"}
            placeholder={"Escribe el nombre del local..."}
          />
          <Input label={"Departamento/Barrio"} placeholder={"Escribir..."} />
          <div>
            <Input
              label={"Dirección"}
              placeholder={"Escribe la dirección del local..."}
            />
            <Input
              label={"Referente"}
              placeholder={"Escribe el nombre del referente..."}
            />
            <Input
              label={"Contacto"}
              placeholder={"Escribe el teléfono del contacto..."}
            />
            <Input
              label={"R.U.T./CI"}
              placeholder={"Escribe los datos fiscales de la empresa..."}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-light text-black">
              Próxima visita
            </label>
            <DatePicker className="rounded-lg border" />
          </div>

          <div className="mb-4 space-y-2">
            <label className="text-gray-700 mb-5 block text-sm font-medium">
              Asignar estado:
            </label>
            <Select
              labelPlacement="outside"
              label="Estado"
              className="rounded-lg border"
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
              />
            </div>
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

export default CompaniesPage;
