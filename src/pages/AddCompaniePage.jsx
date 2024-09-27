import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import geoaltIcon from "../assets/icons/geo-alt.svg";
import { Link } from "react-router-dom";
import Input from "../components/inputs/Input";
import PlusIcon from "../assets/icons/plus.svg";
import PlusFillIcon from "../assets/icons/plus-fill.svg";

import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { permisos } from "../utils/permisons";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../hooks/roles/use.roles";
import { Calendar, Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const AddCompaniePage = () => {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
  };
  const handleCancelClick = () => openConfirmCancelModal();

  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/empresas"
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
          Empresas
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-38 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nueva Empresa
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-4 shadow-t"
        >
          <div>
            <Input
              label={"Nombre del local"}
              placeholder={"Escribe el nombre del local..."}
            />

            <Input
              label={"Dirección"}
              placeholder={"Escribe la dirección del local..."}
            />
            <div
              onClick={() => openModal()}
              className="flex w-[8rem] cursor-pointer"
            >
              <img src={geoaltIcon} alt="geo Icon" className="-mt-3 mb-3" />
              <span className="-mt-3 mb-3 text-xs leading-[.88rem] underline">
                Marcar en el mapa
              </span>
            </div>

            <Input
              label={"Referente"}
              placeholder={"Escribe el nombre del referente..."}
            />
            <Input
              label={"Contacto"}
              placeholder={"Escribe el teléfono del contacto..."}
            />
            <div className="flex gap-[.63rem]">
              <div className="w-full">
                <Checkbox
                  defaultSelected={checkSelected === "existente"}
                  isSelected={checkSelected === "existente"}
                  onClick={() => setCheckSelected("existente")}
                  radius="full"
                >
                  Asignar R.U.T.:
                </Checkbox>
                <Input placeholder={"Escribe los 12 caracteres del RUT..."} />
              </div>
              <div className="w-full">
                <Checkbox
                  defaultSelected={checkSelected === "existente"}
                  isSelected={checkSelected === "existente"}
                  onClick={() => setCheckSelected("existente")}
                  radius="full"
                >
                  Asignar CI:
                </Checkbox>
                <Input placeholder={"Escribe los 8 caracteres del CI..."} />
              </div>
            </div>
            <div className="flex">
              <div className="space-y-2">
                <span>Notas</span>
                <Button
                  text="Nueva Nota"
                  icon={PlusFillIcon}
                  iconPosition={"left"}
                  width="w-40"
                  color={"cancel"}
                />
              </div>
              <div className="flex w-full justify-end">
                <Calendar
                  aria-label="Date (Show Month and Year Picker)"
                  showMonthAndYearPickers
                />
              </div>
            </div>

            <label className="text-gray-700 -mb-4 mt-6 block text-sm font-medium">
              Asignar estado:
            </label>
            <Select labelPlacement="outside" label="Estado">
              <SelectItem>Frecuente</SelectItem>
              <SelectItem>Potencial</SelectItem>
              <SelectItem>De Baja</SelectItem>
              <SelectItem>Potencial/Competencia</SelectItem>
            </Select>
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
          width="w-[46rem]"
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Marcar ubicación en el mapa"
          onSubmit={handleSubmit(onSubmit)}
          buttons={["cancel", "save"]}
          handleCancelClick={handleCancelClick}
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
          <div className="flex gap-[4.4rem]"></div>
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

        {isModalOpen && (
          <ReusableModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Error al agregar usuario"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={handleCloseModal}
          >
            Ha ocurrido un error mientras se creaba el usuario
          </ReusableModal>
        )}
      </div>
    </div>
  );
};

export default AddCompaniePage;
