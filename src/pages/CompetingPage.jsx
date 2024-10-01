import { useState } from "react";
import Pagination from "../components/Pagination";
import { Select, SelectItem } from "@nextui-org/select";
import { permisos } from "../utils/permisons";
import usePatchRoles from "../hooks/roles/usePatchRoles";
import { useForm } from "react-hook-form";
import useRoles from "../hooks/roles/use.roles";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import CompetingRow from "../components/CompetingRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import notesIcon from "../assets/icons/sticky-fill.svg";
import DownloadIcon from "../assets/icons/download.svg";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import Button from "../components/buttons/Button";
import { DatePicker } from "@nextui-org/react";

const CompetingPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { changedUser, isChanged } = usePatchRoles();
  const [roleId, setRoleId] = useState("");
  const [rolePage, setRolePage] = useState(5);
  const { RolesResponse, loading } = useRoles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
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
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

  const handleConfirmDelete = () => {
    deleteUser();
    closeConfirmDeleteModal();
  };
  const openConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(true);
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
  const handleConfirmCancel = () => {
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
              Empresa actual
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
          {paginatedRoles.map((role, index) => (
            <CompetingRow
              key={index}
              name={"Nombre empresa"}
              direction={"Calle Nombre, 123"}
              currentCompany={"Nombre de la competencia"}
              sellers={"Nombre vendedores"}
              nextVisits={"24/09/2024"}
              state={"Frecuente"}
              editIconSrc={editIcon}
              deleteIconSrc={deleteIcon}
              notesIcon={notesIcon}
              onEditClick={() => openModal()}
              onDeleteClick={() => openConfirmDeleteModal()}
            />
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
            className="max-w mt-10 rounded-lg border font-roboto font-medium"
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
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-5">
          <Button
            text="Descargar archivo XML"
            icon={DownloadIcon}
            color={"selected"}
            shadow="shadow-blur"
            iconPosition={"left"}
          />
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
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Editar Empresa"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={"Nombre de la empresa"}
            placeholder={"Escribe el nombre del local..."}
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
            errorApi={errors.name}
            msjError={errors.name ? errors.name.message : ""}
          />
          <Input
            label={"Departamento"}
            placeholder={"Escribir..."}
            {...register("departament", {
              required: "El departamento es obligatorio",
            })}
            errorApi={errors.departament}
            msjError={errors.departament ? errors.departament.message : ""}
          />
          <Input
            label={"Barrio"}
            placeholder={"Escribir..."}
            {...register("neighborhood", {
              required: "El barrio es obligatorio",
            })}
            errorApi={errors.neighborhood}
            msjError={errors.neighborhood ? errors.neighborhood.message : ""}
          />
          <div>
            <Input
              label={"Dirección"}
              placeholder={"Escribe la dirección del local..."}
              {...register("address", {
                required: "La dirección es obligatoria",
              })}
              errorApi={errors.address}
              msjError={errors.address ? errors.address.message : ""}
            />
            <Input
              label={"Referente"}
              placeholder={"Escribe el nombre del referente..."}
              {...register("managerName", {
                required: "El referente es obligatorio",
              })}
              errorApi={errors.managerName}
              msjError={errors.managerName ? errors.managerName.message : ""}
            />
            <Input
              label={"Contacto"}
              placeholder={"Escribe el teléfono del contacto..."}
              {...register("phone", {
                required: "El teléfono es obligatorio",
              })}
              errorApi={errors.phone}
              msjError={errors.phone ? errors.phone.message : ""}
            />
            <Input
              label={"R.U.T./CI"}
              placeholder={"Escribe los datos fiscales de la empresa..."}
              {...register("rut", {
                required: "El R.U.T. es obligatorio",
              })}
              errorApi={errors.rut}
              msjError={errors.rut ? errors.rut.message : ""}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-light text-black">
              Próxima visita
            </label>
            <DatePicker
              className="rounded-lg border"
              {...register("nextVisit", {
                required: "la fecha es obligatoria",
              })}
              errorApi={errors.nextVisit}
              msjError={errors.nextVisit ? errors.nextVisit.message : ""}
            />
          </div>

          <div className="mb-4 space-y-2">
            <label className="text-gray-700 mb-5 block text-sm font-medium">
              Asignar estado:
            </label>
            <Select
              labelPlacement="outside"
              label="Estado"
              className="rounded-lg border"
              {...register("status", {
                required: "El estado es obligatorio",
              })}
              errorApi={errors.status}
              msjError={errors.status ? errors.status.message : ""}
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
                {...register("note", {
                  required: "La nota es obligatoria",
                })}
                errorApi={errors.note}
                msjError={errors.note ? errors.note.message : ""}
              />
            </div>
          </div>
        </form>
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

export default CompetingPage;
