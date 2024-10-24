import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import Input from "../components/inputs/Input.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import SearchInput from "../components/inputs/SearchInput.jsx";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { useForm } from "react-hook-form";
import useSellerRoutes from "../hooks/sellerRoutes/useSellerRoutes.js";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes.js";
import useDeleteSellerRoute from "../hooks/sellerRoutes/useDeleteSellerRoutes.js";
import DownloadIcon from "../assets/icons/download.svg";
import UnitTemplateRow from "../components/UnitTemplateRow.jsx";
import { BASE_URL } from "../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
const UnitTemplate = () => {
  const { changedSellerRoute } = usePutSellerRoute();
  const { deleteSellerRoute } = useDeleteSellerRoute();
  const [routeId, setRouteId] = useState(null);
  const {
    sellerRoutesResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setIsActive,
    setSearch,
  } = useSellerRoutes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    setIsExportModalOpen(false);
    setIsModalOpen(false);
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

  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const handleConfirmDelete = () => {
    deleteSellerRoute(routeId, setModified);
    closeConfirmDeleteModal();
  };
  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const openExportModal = () => {
    setIsExportModalOpen(true);
  };
  const handleRouteCreation = async (routeData) => {
    try {
      const newRoute = await changedSellerRoute(
        routeData,
        routeId,
        setModified,
      );
      if (newRoute) {
        setSaveConfirmationModalOpen(true);
      } else {
        console.error("No se actualizó la ruta, por favor intenta de nuevo");
      }
    } catch (error) {
      console.error("Error al actualizar la ruta:", error);
      setIsModalOpen(true);
    }
  };

  const stringToBoolean = (str) => JSON.parse(str);
  const onSubmit = (data) => {
    const { name, zone, status } = data;
    const sellerData = {
      name,
      zone,
      isActive: stringToBoolean(status),
    };
    handleRouteCreation(sellerData);
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <Link to="/inicio/taller" className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Taller
          </h1>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              className={`w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Planilla UNIT
            </h2>
          </div>
          <div className="flex items-center">
            <h2
              className={`cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 text-black_m`}
            >
              Período
            </h2>
            <Select
              className="w-52"
              placeholder="OCTUBRE 2024"
              onSelectionChange={(values) => setValue("status", values)}
            >
              <SelectItem>Enero 2024</SelectItem>
              <SelectItem>Febrero 2024</SelectItem>
              <SelectItem>Marzo 2024</SelectItem>
              <SelectItem>Abril 2024</SelectItem>
              <SelectItem>Mayo 2024</SelectItem>
              <SelectItem>Junio 2024</SelectItem>
              <SelectItem>Julio 2024</SelectItem>
              <SelectItem>Agosto 2024</SelectItem>
              <SelectItem>Septiembre 2024</SelectItem>
              <SelectItem>Octubre 2024</SelectItem>
              <SelectItem>Noviembre 2024</SelectItem>
              <SelectItem>Diciembre 2024</SelectItem>
            </Select>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            <div className="flex space-x-4">
              <Button
                text="Exportar lista"
                icon={DownloadIcon}
                color={"cancel"}
                onClick={() => openExportModal()}
              />
            </div>
          </div>
        </div>

        <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray">
                <th></th>

                <th className="text-center text-md font-semibold leading-[1.125rem]">
                  Empresa
                </th>
                <th></th>
                <th></th>
                <th className="text-center text-md font-semibold leading-[1.125rem]">
                  Polvo
                </th>
                <th></th>
                <th></th>
                <th className="text-center text-md font-semibold leading-[1.125rem]">
                  Marca UNIT
                </th>
              </tr>
              <tr>
                <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                  Fecha ing.
                </th>
                <th className="bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Nombre
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Dirección
                </th>
                <th className="bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Tipo
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Mar./Color
                </th>
                <th className="bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Cap.(kg/l)
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Fabr.
                </th>
                <th className="bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Actual
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Matrícula
                </th>
                <th className="bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Ensayo
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Presión (MPa)
                </th>
                <th className="bg-gray p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Exp. Rem. (%)
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Baja
                </th>
              </tr>
            </thead>
            <tbody>
              <UnitTemplateRow
                id={""}
                entryDate={"12/07/2024"}
                name={"Nombre"}
                direction={"Calle 123"}
                type={"A"}
                color={"AB"}
                capacity={"4"}
                factory={"Si"}
                current={"1234"}
                registration={"N12345"}
                trial={"12/24"}
                pressure={"34"}
                exp={"1,3"}
                discontinued={"No"}
              />
            </tbody>
          </table>
          <div className="flex justify-center p-6">
            <Pagination
              pageIndex={setItemsPerPage}
              currentPage={page}
              totalPages={totalPage}
              onPageChange={setPage}
              itemPerPage={itemsPerPage}
              total={total}
            />
          </div>
        </div>
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Ruta"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={"Nombre Completo"}
            placeholder={"Escribir..."}
            {...register("name", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Debe tener máximo 50 caracteres",
              },
            })}
            errorApi={errors.name}
            msjError={errors.name ? errors.name.message : ""}
          />
          <Input
            label={"Zona"}
            placeholder={"Escribir..."}
            {...register("zone", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Debe tener máximo 50 caracteres",
              },
            })}
            errorApi={errors.zone}
            msjError={errors.zone ? errors.zone.message : ""}
          />
          <div className="mb-4 space-y-2">
            <label className="text-gray-700 block text-sm font-light">
              Asignar estado:
            </label>
            <Select
              onSelectionChange={(value) => setValue("status", value)}
              placeholder="Estado"
              className="rounded-lg border"
              {...register("status", {
                validate: (value) =>
                  value ? true : "Debes seleccionar una opción",
              })}
            >
              <SelectItem key={true}>Activo</SelectItem>
              <SelectItem key={false}>Inactivo</SelectItem>
            </Select>
            <p className="font-roboto text-xs text-red_e">
              {errors.status ? errors.status.message : ""}
            </p>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <a href={`${BASE_URL}/${getClientsExcel}`} download target="_blank">
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a href={`${BASE_URL}/${getClientsPdf}`} download target="_blank">
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo PDF"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
        </div>
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
        title="Eliminar ruta"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(routeId)}
      >
        Esta ruta será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default UnitTemplate;
