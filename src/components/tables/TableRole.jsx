import { useState } from "react";
import editIcon from "../../assets/icons/pencil-square.svg";
import deleteIcon from "../../assets/icons/trash3.svg";
import useDeleteRoles from "../../hooks/roles/useDeleteRoles";
import { Select, SelectItem } from "@nextui-org/select";
import { permisos } from "../../utils/permisons";
import usePatchRoles from "../../hooks/roles/usePatchRoles";
import { useForm } from "react-hook-form";
import useRoles from "../../hooks/roles/use.roles";
import ReusableModal from "../modals/ReusableModal";
import Input from "../inputs/Input";
import notFoundImg from "../../assets/images/notFound.svg";
import SaveImg from "../../assets/img/save.svg";
import deleteImg from "../../assets/img/deleted.svg";

const translatePermission = (permission) => {
  switch (permission) {
    case "USER_SUPER_ADMIN":
      return "ADMIN";
    case "ACCESS_APP":
      return "APP";
    case "SECTION_ROUTES":
      return "RUTAS";
    case "SECTION_ADMINISTRATION":
      return "EMPRESAS";
    case "SECTION_SELLER":
      return "VENDEDORES";
    case "SECTION_WORKSHOP":
      return "TALLER";
    case "SECTION_PRODUCTS":
      return "PRODUCTOS";
    case "SECTION_ORDERS":
      return "ORDENES";
    default:
      return permission;
  }
};
const formatPermisos = (permisos, excludeWords = ["USER_ADMIN"]) => {
  return permisos
    .filter((p) => !excludeWords.includes(p))
    .map(translatePermission)
    .join("/");
};

const TableRole = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [permisosSelected, setPermisosSelected] = useState([]);

  const { changedUser } = usePatchRoles();

  const { deleteUser } = useDeleteRoles();
  const [roleId, setRoleId] = useState("");
  const { RolesResponse, setRolModified } = useRoles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtons, setModalButtons] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [deleteAdmin, setDeleteAdmin] = useState(false);

  const paginatedRoles = RolesResponse ? RolesResponse : [];

  const openModal = (id) => {
    const roleEdit = RolesResponse.find((role) => role.id === id);
    setPermisosSelected(roleEdit.permissions);

    if (roleEdit) {
      setValue("name", roleEdit.name);
    }
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
      permissions: [...data.permissions.split(","), "USER_ADMIN"],
    };
    changedUser(roleData, roleId, setRolModified);
    openSaveConfirmationModal();
  };

  const handleEditClick = (id) => {
    openModal(id);
    setModalTitle("Editar Rol");
    setModalButtons(["cancel", "save"]);
  };

  const handleDeleteClick = (role) => {
    if (
      role.permissions.includes("ADMIN") ||
      role.permissions.includes("USER_SUPER_ADMIN")
    ) {
      setDeleteAdmin(true);
      setModalMessage(
        "No se puede eliminar el rol que contenga el permiso ADMIN.",
      );
    } else {
      setDeleteAdmin(false);
      setModalMessage(
        "Este rol será eliminado de forma permanente. ¿Desea continuar?",
      );
    }
    setRoleId(role.id);
    setConfirmCancelModalOpen(true);
  };

  const handleConfirmCancelBackClick = (id) => {
    deleteUser(id, setRolModified);
    closeConfirmCancelModal();
    closeModal();
    setConfirmDelete(true);
  };

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    closeModal();
  };

  const onChangesPermissions = (e) => {
    setValue("permissions", e.target.value);
  };

  return (
    <div className="flex flex-grow flex-col items-center overflow-auto rounded-tr-lg bg-white p-5">
      {paginatedRoles.length === 0 ? (
        <tr>
          <td colSpan="5" className="p-4 text-center">
            <p className="text-md font-semibold leading-[1.3rem] text-black_l">
              Tu búsqueda no arrojó resultados. !Prueba algo distinto!. <br />{" "}
              Puedes encontrar los roles creados aquí.
            </p>
            <img src={notFoundImg} alt="Tabla vacía" className="mx-auto" />
          </td>
        </tr>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Rol
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Permisos
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log("roles", paginatedRoles)}
            {paginatedRoles.map((role, index) => (
              <tr key={index} className="border-b border-gray text-center">
                <td className="p-2 text-left">{role.name}</td>

                <td className="p-2">{formatPermisos(role.permissions)}</td>

                <td className="p-2">
                  <div className="flex justify-center gap-4">
                    <img
                      src={editIcon}
                      alt="Edit icon"
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => {
                        handleEditClick(role.id);
                        setRoleId(role.id);
                      }}
                    />
                    <img
                      src={deleteIcon}
                      alt="Delete icon"
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => {
                        handleDeleteClick(role);
                        setRoleId(role.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
            defaultSelectedKeys={permisosSelected}
            labelPlacement="outside"
            label="Asignar permisos"
            selectionMode="multiple"
            placeholder="Permisos"
            className="max-w mt-10 rounded-md border font-roboto font-light"
            {...register("permissions", {
              required: "Debes asignar al menos un permiso",
            })}
            onChange={onChangesPermissions}
          >
            {permisos
              .filter((permiso) => permiso.key !== "USER_SUPER_ADMIN")
              .map((permiso) => (
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
        buttons={deleteAdmin ? ["accept"] : ["back", "accept"]}
        onAccept={() =>
          deleteAdmin
            ? setConfirmCancelModalOpen(false)
            : handleConfirmCancelBackClick(roleId)
        }
      >
        {modalMessage}
      </ReusableModal>

      <ReusableModal
        isOpen={isSaveConfirmationModalOpen}
        onClose={closeSaveConfirmationModal}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmSaveClick}
      >
        <div className="flex flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
      </ReusableModal>
      {/*modal para elementos eliminados*/}
      <ReusableModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Rol eliminado"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDelete(false)}
      >
        <div className="flex flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            El rol fue eliminado correctamente.
          </p>
        </div>
      </ReusableModal>
    </div>
  );
};

export default TableRole;
