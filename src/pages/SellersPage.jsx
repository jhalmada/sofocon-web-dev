import React, { useState } from "react";
import SellerRow from "../components/SellerRow";
import Pagination from "../components/Pagination";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useUsersSellers from "../hooks/users/useUsersSellers";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import ReusableModal from "../components/modals/ReusableModal";
import useRoles from "../hooks/roles/use.roles";
import Input from "../components/inputs/Input";
import useSellerRoutes from "../hooks/sellerRoutes/useSellerRoutes";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import FilterSelect from "../components/filters/FilterSelect";
import usePutusers from "../hooks/users/usePutUsers";
import notFoundImg from "../assets/images/notFound.svg";

const SellersPage = ({
  openConfirmDeleteModal,
  userSellerResponse,
  setItemsPerPage,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
  setModified,
  setIsActive,
}) => {
  //estados

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [stateFilter, setStateFilter] = useState("");

  const stateOptions = ["Activo", "Inactivo"];
  const [mnsError, setMnsError] = useState("");
  //hooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { RolesResponse } = useRoles();
  const { changedUser } = usePutusers();

  const { sellerRoutesResponse, setSearch } = useSellerRoutes();

  //funciones

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await changedUser(userData, userId, setModified);
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
    const { phone, ci, fullName, email, role, state, route } = data;
    handleUserCreation({
      email,
      userInfo: {
        fullName,
        ci,
        phone,
      },
      role: { id: role },
      isActive: state === "Activo" ? true : false,
    });
  };
  //funcion para editar
  const openModal = (id) => {
    const userToEdit = userSellerResponse?.result.find(
      (user) => user.id === id,
    );
    if (userToEdit) {
      setValue("phone", userToEdit.userInfo.phone);
      setValue("ci", userToEdit.userInfo.ci);
      setValue("fullName", userToEdit.userInfo.fullName);
      setValue("email", userToEdit.email);
      setValue("role", userToEdit?.role?.id || "");
      setValue("state", userToEdit.isActive ? "Activo" : "Inactivo");
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
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const handleCancelClick = () => openConfirmCancelModal();
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  //funcion para transformar los Arrays
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
    }));
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
        break;
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
      <div></div>
      {userSellerResponse.length === 0 ? (
        <tr>
          <td colSpan="5" className="p-4 text-center">
            <p className="text-md font-semibold leading-[1.3rem] text-black_l">
              Tu búsqueda no arrojó resultados. !Prueba algo distinto!. <br />{" "}
              Puedes encontrar a los vendedores creados aquí.
            </p>
            <img src={notFoundImg} alt="Tabla vacía" className="mx-auto" />
          </td>
        </tr>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Nombre Completo
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Contacto
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Ruta
              </th>
              <th className="text-lecenterft p-2 text-md font-semibold leading-[1.125rem]">
                <div className="flex flex-col gap-2">
                  <FilterSelect
                    options={stateOptions}
                    placeholder="Estado"
                    onChange={handleStateFilterChange}
                  />
                </div>
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Mas info
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {userSellerResponse?.result?.map((user, index) => (
              <SellerRow
                key={index}
                fullName={`${user.userInfo.fullName} `}
                email={user.email}
                route={"Ruta"}
                info={"Ver más"}
                editIconSrc={editIcon}
                deleteIconSrc={deleteIcon}
                state={user.isActive}
                onEditClick={() => {
                  openModal(user.id);
                }}
                onDeleteClick={() => openConfirmDeleteModal(user.id)}
              />
            ))}
          </tbody>
        </table>
      )}

      <div
        className={
          userSellerResponse.length === 0 ? "hidden" : `flex justify-center p-6`
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
      {/**modal para editar */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Usuario"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            label={"Nombre Completo"}
            placeholder={"Escribe el nombre completo del usuario..."}
            {...register("fullName", {
              required: "Este campo es obligatorio",
            })}
            errorApi={errors.fullName}
            msjError={errors.fullName ? errors.fullName.message : ""}
          />
          <Input
            label={"Telefono"}
            placeholder={"Escribe tu numero telefónico."}
            {...register("phone", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[0-9]+$/, // Acepta solo números
                message: "Solo se permiten números",
              },
              minLength: {
                value: 15,
                message: "El número debe tener al menos 15 dígitos",
              },
              maxLength: {
                value: 15,
                message: "El número no puede tener más de 15 dígitos",
              },
            })}
            errorApi={errors.phone}
            msjError={errors.phone ? errors.phone.message : ""}
          />
          <Input
            label={"CI"}
            placeholder={"Escribe tu numero de CI."}
            {...register("ci", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[0-9]+$/, // Acepta solo números
                message: "Solo se permiten números",
              },
              minLength: {
                value: 8,
                message: "El número debe tener al menos 8 dígitos",
              },
              maxLength: {
                value: 8,
                message: "El número no puede tener más de 8 dígitos",
              },
            })}
            errorApi={errors.ci}
            msjError={errors.ci ? errors.ci.message : ""}
          />
          <div>
            <Input
              placeholder={"Escribe tu correo"}
              label={"Dirección de correo"}
              {...register("email", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                pattern: {
                  value:
                    /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                  message: "Formato de email incorrecto",
                },
              })}
              errorApi={errors.email}
              msjError={errors.email ? errors.email.message : ""}
            />
          </div>
          <div className="mt-2">
            <Select
              labelPlacement="outside"
              label="Estado"
              placeholder="Seleccione un estado"
              className="mt-2 rounded-lg border"
              {...register("state", {
                validate: (value) =>
                  value
                    ? true
                    : "Este campo es requerido, Porfavor elija un rol",
              })}
              onSelectionChange={(value) => setValue("state", value)}
            >
              {stateOptions.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="relative">
            <NextAutoComplete
              label2={"Rutas Asignadas"}
              array={transformData(sellerRoutesResponse || []) || []}
              name={"route"}
              label={"Asignar Ruta"}
              setValue={setValue}
              onChange={setSearch}
            />
            <p>{errors.vendedores && errors.vendedores.message}</p>
          </div>
          <div className="mt-2">
            <Select
              labelPlacement="outside"
              label="Rol"
              className="mt-2 rounded-lg border"
              {...register("role", {
                required:
                  "Este campo es obligatorio, por favor seleccione un rol",
              })}
              onSelectionChange={(value) => setValue("role", value)}
            >
              {RolesResponse &&
                RolesResponse.map((rol) => (
                  <SelectItem key={rol.id}>{rol.name}</SelectItem>
                ))}
            </Select>
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
    </div>
  );
};

export default SellersPage;
