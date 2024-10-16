import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import useAddroles from "../hooks/roles/useAddroles";
import { permisos } from "../utils/permisons";
import ReusableModal from "../components/modals/ReusableModal";
import { useForm } from "react-hook-form";
import BackButton from "../components/buttons/BackButton";
const AddRolePage = () => {
  const { postAddRoles, loading, idRol } = useAddroles();
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const newRole = await postAddRoles({
      name: data.name,
      permissions: [...data.permissions, "USER_ADMIN"],
    });
    setSaveConfirmationModalOpen(true);
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    setSaveConfirmationModalOpen(false);
  };
  return (
    <div className="flex min-h-full flex-col justify-between overflow-auto bg-gray">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <BackButton route="/inicio/personal" />
        </div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Roles
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-10 shadow-t"
        >
          <div className="flex flex-col">
            <Input
              {...register("name", {
                required: "Este campo es obligatorio",
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
          </div>
          <div className="flex justify-end pt-6">
            <div>
              <Button
                text={"GUARDAR"}
                color={"save"}
                type={"submit"}
                icon={ArrowRightIcon}
              />
            </div>
          </div>
        </form>
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
export default AddRolePage;
