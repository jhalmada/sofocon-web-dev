import { useState } from "react";
import ReusableModal from "../modals/ReusableModal";
import Select from "../selects/Select";
import Input from "../inputs/Input";
import { roles } from "../../utils/Datainfo";

const formatPermisos = (permisos) => {
  return permisos.join("/");
};

const TableRole = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalButtons, setModalButtons] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleConfirmCancelBackClick = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    closeModal();
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
          {roles.map((role, index) => (
            <tr key={index}>
              <td className="p-2">
                <img src={role.avatarSrc} alt="role icon" className="h-6 w-6" />
              </td>
              <td className="p-2">{role.fullName}</td>
              <td className="p-2">{formatPermisos(role.permisos)}</td>
              <td className="p-2">
                <div className="flex gap-5">
                  <img
                    src={role.editIconSrc}
                    alt="Edit icon"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => handleEditClick()}
                  />
                  <img
                    src={role.deleteIconSrc}
                    alt="Delete icon"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => handleDeleteClick()}
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
        onSubmit={handleSubmit}
        buttons={modalButtons}
        handleCancelClick={handleCancelClick}
      >
        <Input
          label={"Nombre del rol"}
          placeholder={"Escribe el nombre del rol..."}
        />
        <Select
          label={"Asignar permisos"}
          option={"Permisos"}
          variant={"permisos"}
        />
      </ReusableModal>

      <ReusableModal
        isOpen={isConfirmCancelModalOpen}
        onClose={closeConfirmCancelModal}
        title="Eliminar rol"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={handleConfirmCancelBackClick}
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
    </div>
  );
};

export default TableRole;
