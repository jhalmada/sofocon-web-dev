import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import { Select, SelectItem } from "@nextui-org/select";
import PlusIcon from "../assets/icons/plus.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import useUsers from "../hooks/users/use.users.js";

import usePutUsers from "../hooks/users/usePutUsers.js";
import { useForm } from "react-hook-form";
import useRoles from "../hooks/roles/use.roles";
import useDeleteUsers from "../hooks/users/useDeleteUsers.js";
import { Checkbox, DatePicker } from "@nextui-org/react";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";

const NOTES_TAB = "notes";

const AddNotesPage = () => {
  const [userPage, setUserPage] = useState(5);
  const { changedUser, isChanged } = usePutUsers();
  const [userId, setUserId] = useState(null);
  const { usersResponse, loading } = useUsers();
  const { RolesResponse } = useRoles();
  const { deleteUser, isDeleted, isLoading } = useDeleteUsers();
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
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
          to="/inicio/empresas/notas"
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
            Nombre Empresa
          </h1>
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(NOTES_TAB)}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === NOTES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nueva nota
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)} // Usamos handleSubmit de React Hook Form
          className="rounded-tr-lg bg-white px-14 py-4 shadow-t"
        >
          <div className="flex flex-col">
            <Input label={"Nombre de nota"} placeholder={"Escribir..."} />
            <Input label={"Contenido"} placeholder={"Escribir..."} />

            {errors.permissions && (
              <span className="font-roboto text-xs text-red_e">
                {errors.permissions.message}
              </span>
            )}
          </div>
          <div className="flex gap-[4.4rem]">
            <div>
              <Checkbox
                defaultSelected={checkSelected === "existente"}
                isSelected={checkSelected === "existente"}
                onClick={() => setCheckSelected("existente")}
                radius="full"
              >
                <span className="text-sm font-light leading-[1rem] text-black_b">
                  Asignar fecha
                </span>
              </Checkbox>
              <div className="flex w-[18rem]">
                <DatePicker className="rounded-lg border" />
              </div>
            </div>

            <div className="w-[12.6rem]">
              <Checkbox
                defaultSelected={checkSelected === "existente"}
                isSelected={checkSelected === "existente"}
                onClick={() => setCheckSelected("existente")}
                radius="full"
              >
                <span className="text-sm font-light leading-[1rem] text-black_m">
                  Destacar como recordatorio
                </span>
              </Checkbox>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <div>
              <Button
                text={"GUARDAR"}
                color={"save"}
                type={"submit"}
                icon={ArrowRightIcon}
              />
            </div>
          </div>
        </form>
      </div>

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

export default AddNotesPage;
