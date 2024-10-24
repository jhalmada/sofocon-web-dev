import { useState } from "react";
import { Link } from "react-router-dom";
import RouteRow from "../components/RouteRow.jsx";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import Input from "../components/inputs/Input.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import SearchInput from "../components/inputs/SearchInput.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { useForm } from "react-hook-form";
import useSellerRoutes from "../hooks/sellerRoutes/useSellerRoutes.js";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes.js";
import useDeleteSellerRoute from "../hooks/sellerRoutes/useDeleteSellerRoutes.js";
import FilterSelect from "../components/filters/FilterSelect.jsx";

import disconnectedImg from "../assets/images/disconnected.svg";

const SELLER_TAB = "sellers";
const RoutesPage = () => {
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
  const [activeTab, setActiveTab] = useState(SELLER_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const stateOptions = ["Activo", "Inactivo"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const openModal = (id) => {
    const sellerToEdit = sellerRoutesResponse.find(
      (seller) => seller.id === id,
    );
    if (sellerToEdit) {
      setValue("name", sellerToEdit.name);
      setValue("zone", sellerToEdit.zone);
      setValue("status", sellerToEdit.isActive);
    }
    setIsModalOpen(true);
    setRouteId(id);
  };
  const closeModal = () => {
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
  const openConfirmDeleteModal = (id) => {
    setRouteId(id);
    setConfirmDeleteModalOpen(true);
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
  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Activo":
        setIsActive(true);
        break;
      case "Inactivo":
        setIsActive(false);
        break;
      default:
        setIsActive(null);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to="/inicio" className="text-sm font-medium leading-4">
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
            Rutas
          </h1>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(SELLER_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === SELLER_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Listado
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === SELLER_TAB && (
              <div className="flex space-x-4">
                <Link to={"agregar-ruta"}>
                  <Button text="Nueva ruta" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === SELLER_TAB && (
          <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
            <div>
              {sellerRoutesResponse.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                      Ningún elemento coincide con tu búsqueda, inténtalo de
                      nuevo. <br /> Puedes encontrar las rutas creadas aquí.
                    </p>
                    <img
                      src={disconnectedImg}
                      alt="Tabla vacía"
                      className="mx-auto"
                    />
                  </td>
                </tr>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                        Nombre
                      </th>
                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        Zona
                      </th>
                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        Empresas
                      </th>
                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        Vendedores
                      </th>
                      <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                        <div className="flex flex-col gap-2">
                          <FilterSelect
                            options={stateOptions}
                            placeholder="Estado"
                            onChange={handleStateFilterChange}
                          />
                        </div>
                      </th>
                      <th className="p-2 text-md font-semibold leading-[1.125rem]">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerRoutesResponse.map((seller, index) => (
                      <RouteRow
                        id={seller.id}
                        key={index}
                        name={seller.name}
                        zone={seller.zone}
                        companies={seller.totalClients}
                        sellers={seller.user.length}
                        state={seller.isActive}
                        editIconSrc={editIcon}
                        deleteIconSrc={deleteIcon}
                        onEditClick={() => {
                          openModal(seller.id);
                        }}
                        onDeleteClick={() => openConfirmDeleteModal(seller.id)}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div
              className={
                sellerRoutesResponse.length === 0
                  ? "hidden"
                  : `flex justify-center p-6`
              }
            >
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
        )}
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
export default RoutesPage;
