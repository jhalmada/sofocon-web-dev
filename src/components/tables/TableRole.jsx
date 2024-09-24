import { useEffect, useState } from "react";
import ReusableModal from "../modals/ReusableModal";
import Input from "../inputs/Input";
import useRoles from "../../Hooks/roles/use.roles";
import Pagination from "../Pagination";
import icono from "../../assets/users/ImgEscudo.png";
import editIcon from "../../assets/icons/pencil-square.svg";
import deleteIcon from "../../assets/icons/trash3.svg";
import useDeleteRoles from "../../Hooks/roles/useDeleteRoles";
import { Select, SelectItem } from "@nextui-org/select";
import { permisos } from "../../utils/permisons";
import usePatchRoles from "../../Hooks/roles/usePatchRoles";
import { useForm } from "react-hook-form";

const formatPermisos = (permisos, excludeWords = ["USER_ADMIN"]) => {
  return permisos.filter((p) => !excludeWords.includes(p)).join("/");
};

const TableRole = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { changedUser, isChanged } = usePatchRoles();
  const [newName, setNewName] = useState("");

  const { isDeleted, isLoading, deleteUser } = useDeleteRoles();
  const [roleId, setRoleId] = useState("");
  const [rolePage, setRolePage] = useState(5);
  const { RolesResponse, loading } = useRoles();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalButtons, setModalButtons] = useState([]);

  const totalRoles = RolesResponse ? RolesResponse.length : 0;
  const totalPages = Math.ceil(totalRoles / rolePage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rolePage;
  const paginatedRoles = RolesResponse
    ? RolesResponse.slice(startIndex, startIndex + rolePage)
    : [];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  const handleCancelClick = () => {
    closeModal();
  };

  const onSubmit = (data) => {
    const roleData = {
      name: data.name,
      permissions: [...data.permissions, "USER_ADMIN"],
    };
    changedUser(roleData, roleId);
    openSaveConfirmationModal();
  };

  const handleEditClick = () => {
    openModal();
    setModalTitle("Editar Rol");
    setModalButtons(["cancel", "save"]);
  };

  const handleDeleteClick = () => {
    openConfirmCancelModal();
  };

  const handleConfirmCancelBackClick = (id) => {
    deleteUser(id);
    closeConfirmCancelModal();
    closeModal();
  };

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    closeModal();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const pageIndexChange = (e) => {
    setRolePage(e);
  };
  return (
    <div className="rounded-tr-lg bg-white p-5 shadow-t">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]"></th>
            <th className="w-[40.4%] p-2 text-left text-md font-semibold leading-[1.125rem]">
              Rol
            </th>
            <th className="flex p-2 text-left text-md font-semibold leading-[1.125rem]">
              Permisos
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedRoles.map((role, index) => (
            <tr key={index}>
              <td className="p-2">
                <img src={icono} alt="role icon" className="h-6 w-6" />
              </td>
              <td className="p-2">{role.name}</td>
              <td className="p-2">{formatPermisos(role.permissions)}</td>
              <td className="p-2">
                <div className="flex gap-5">
                  <img
                    src={editIcon}
                    alt="Edit icon"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      handleEditClick();
                      setRoleId(role.id);
                    }}
                  />
                  <img
                    src={deleteIcon}
                    alt="Delete icon"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      handleDeleteClick();
                      setRoleId(role.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        onSubmit={handleSubmit(onSubmit)}
        buttons={modalButtons}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            {...register("name", {
              required: "El nombre del rol es obligatorio",
            })}
            label={"Nombre del rol"}
            placeholder={"Escribe el nombre del rol..."}
            errorApi={errors.name}
            msjError={errors.name ? errors.name.message : ""}
          />
          <Select
            labelPlacement="outside"
            label="Asignar permisos"
            selectionMode="multiple"
            placeholder="Permisos"
            className="max-w mt-10 rounded-md border font-roboto font-medium"
            {...register("permissions", {
              required: "Debes asignar al menos un permiso",
            })}
            onSelectionChange={(values) => setValue("permissions", values)}
          >
            {permisos.map((permiso) => (
              <SelectItem key={permiso.key}>{permiso.label}</SelectItem>
            ))}
          </Select>
          {errors.permissions && (
            <span className="font-roboto text-xs text-red_e">
              {errors.permissions.message}
            </span>
          )}
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={isConfirmCancelModalOpen}
        onClose={closeConfirmCancelModal}
        title="Eliminar rol"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmCancelBackClick(roleId)}
      >
        Este rol será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>

      <ReusableModal
        isOpen={isSaveConfirmationModalOpen}
        onClose={closeSaveConfirmationModal}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmSaveClick}
      >
        Los cambios fueron guardados exitosamente.
      </ReusableModal>
      <div className="flex justify-center p-6">
        <Pagination
          pageIndex={pageIndexChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TableRole;
