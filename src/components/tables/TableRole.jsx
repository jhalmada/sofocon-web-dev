import { useState } from "react";
import ReusableModal from "../modals/ReusableModal";
import Select from "../selects/Select";
import Input from "../inputs/Input";
import useRoles from "../../Hooks/roles/use.roles";
import Pagination from "../Pagination";
import icono from "../../assets/users/ImgEscudo.png";
import editIcon from "../../assets/icons/pencil-square.svg";
import deleteIcon from "../../assets/icons/trash3.svg";

const formatPermisos = (permisos) => {
  return permisos.join("/");
};

const TableRole = () => {
  const [rolePage, setRolePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { RolesResponse, loading } = useRoles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalButtons, setModalButtons] = useState([]);

  const totalRoles = RolesResponse ? RolesResponse.length : 0;
  const totalPages = Math.ceil(totalRoles / rolePage);

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
                    onClick={() => handleEditClick()}
                  />
                  <img
                    src={deleteIcon}
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
