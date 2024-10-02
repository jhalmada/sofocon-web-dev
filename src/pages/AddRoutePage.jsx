import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import geoaltIcon from "../assets/icons/geo-alt.svg";
import { Link } from "react-router-dom";
import Input from "../components/inputs/Input";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../hooks/roles/use.roles";
import { Calendar, Checkbox, DatePicker } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const AddRoutePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { RolesResponse } = useRoles();
  const { postAddUsers, loading } = AddUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);

  const [checkSelected, setCheckSelected] = useState("existente");

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await postAddUsers(userData);
      console.log(newUser);
      if (newUser) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setIsModalOpen(true);
    }
  };

  const onSubmit = (data) => {
    const { fullName, email, password, role, nameRole, permissions } = data;

    switch (checkSelected) {
      case "existente":
        handleUserCreation({
          fullName,
          email,
          password,
          role: { id: role }, // Pasamos el rol existente
        });
        break;
      default:
        handleUserCreation({
          fullName,
          email,
          password,
          role: {
            name: nameRole,
            permissions: [...permissions, "USER_ADMIN"], // Permisos asignados
          },
        });
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
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

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
  };

  const handleCancelClick = () => closeModal();

  return (
    <div className="flex min-h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/rutas"
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
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Rutas
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-38 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nueva ruta
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-4 shadow-t"
        >
          <div>
            <Input
              label={"Nombre"}
              placeholder={"Escribir..."}
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />

            <Input label={"Zona"} placeholder={"Escribir..."} />

            <div className="mb-4 space-y-2">
              <label className="text-gray-700 block text-sm font-light">
                Asignar estado:
              </label>
              <Select
                placeholder="Estado"
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
            <div className="mb-4 space-y-2">
              <label className="text-gray-700 block text-sm font-light">
                Asignar vendedores
              </label>
              <Select
                placeholder="Vendedores"
                className="rounded-lg border"
                {...register("status", {
                  required: "El estado es obligatorio",
                })}
                errorApi={errors.status}
                msjError={errors.status ? errors.status.message : ""}
              >
                <SelectItem>vendedor 1</SelectItem>
                <SelectItem>vendedor 2</SelectItem>
                <SelectItem>vendedor 3</SelectItem>
                <SelectItem>vendedor 4</SelectItem>
              </Select>
            </div>

            <div className="mb-2 flex flex-col items-start">
              <span className="text-gray-700 block text-sm font-light">
                Asignar nuevo vendedor
              </span>

              <Button
                text="Nueva vendedor"
                icon={PlusFillIcon}
                iconPosition={"left"}
                width="w-50"
                color={"cancel"}
              />
            </div>
            <div className="mb-4 space-y-2">
              <label className="text-gray-700 block text-sm font-light">
                Asignar empresas
              </label>
              <Select
                placeholder="Empresas"
                className="rounded-lg border"
                {...register("status", {
                  required: "El estado es obligatorio",
                })}
                errorApi={errors.status}
                msjError={errors.status ? errors.status.message : ""}
              >
                <SelectItem>empresa 1</SelectItem>
                <SelectItem>empresa 2</SelectItem>
                <SelectItem>empresa 3</SelectItem>
                <SelectItem>empresa 4</SelectItem>
              </Select>
            </div>
            <div className="mb-2 flex flex-col items-start">
              <span className="text-gray-700 block text-sm font-light">
                Asignar nueva empresa
              </span>
              <Link to={"/inicio/empresas/agregar-empresa"}>
                <Button
                  text="Nueva Empresa"
                  icon={PlusFillIcon}
                  iconPosition={"left"}
                  width="w-50"
                  color={"cancel"}
                />
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-end py-6">
            <Button
              text={"GUARDAR"}
              color={"save"}
              type={"submit"}
              icon={ArrowRightIcon}
            />
          </div>
        </form>
        <ReusableModal
          width="w-[45.37rem]"
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Marcar ubicación en el mapa"
          onSubmit={handleSubmit(onSubmit)}
          buttons={["cancel", "save"]}
          handleCancelClick={handleCancelClick}
        >
          <div className="flex flex-col">
            <Input label={"Dirección"} placeholder={"Escribir..."} />
            <div className="flex h-[15rem] items-center justify-center bg-blue_l text-2xl text-white">
              Mapa
            </div>
          </div>
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
    </div>
  );
};

export default AddRoutePage;
