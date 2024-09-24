import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
//import Checkbox from "../components/checkboxs/Checkbox";
import Input from "../Components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import Button from "../Components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../Hooks/users/use.addUsers";
import ReusableModal from "../Components/modals/ReusableModal";
import { permisos } from "../utils/permisons";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../Hooks/roles/use.roles";
import { Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const AddUserPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { RolesResponse } = useRoles();
  const { postAddUsers, loading } = AddUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [values, setValues] = useState(new Set([]));

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
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
  };

  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <div className="mb-4 flex items-center">
          <img
            src={ChevronLeftIcon}
            alt="arrow left"
            className="-ml-1 h-4 w-4"
          />
          <Link
            to="/inicio/usuarios"
            className="cursor-pointer text-sm font-medium leading-4"
          >
            Volver
          </Link>
        </div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-36 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nuevo usuario
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-10 shadow-t"
        >
          <div className="space-y-3">
            {/* Nombre Completo */}
            <Input
              label={"Nombre Completo"}
              placeholder={"Escribe el nombre completo del usuario..."}
              {...register("fullName", {
                required: "El nombre completo es obligatorio",
              })}
              errorApi={errors.fullName}
              msjError={errors.fullName ? errors.fullName.message : ""}
            />

            {/* Correo electrónico */}
            <Input
              label={"Correo electrónico"}
              placeholder={"Escribe el email del usuario..."}
              {...register("email", {
                required: "El correo electrónico es obligatorio",
              })}
              errorApi={errors.email}
              msjError={errors.email ? errors.email.message : ""}
            />

            {/* Contraseña */}
            <div className="pb-8">
              <Input
                type="password"
                label={"Contraseña"}
                placeholder={"Escribe la contraseña..."}
                icon1={IconEye}
                icon2={IconEyeSlash}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
                errorApi={errors.password}
                msjError={errors.password ? errors.password.message : ""}
              />
              <p className="mt-5 text-xs leading-[.875rem] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos
              </p>
            </div>

            {/* Asignar rol existente */}
            <Checkbox
              defaultSelected={checkSelected === "existente"}
              isSelected={checkSelected === "existente"}
              onClick={() => setCheckSelected("existente")}
              radius="full"
            >
              Asignar rol existente
            </Checkbox>

            <Select
              isDisabled={checkSelected === "nuevo"}
              label="Selecciona un rol"
              {...register("role", {
                required:
                  checkSelected === "existente"
                    ? "Debes seleccionar un rol"
                    : false,
              })}
              onSelectionChange={(value) => setValue("role", value)}
            >
              {RolesResponse &&
                RolesResponse.map((rol) => (
                  <SelectItem key={rol.id}>{rol.name}</SelectItem>
                ))}
            </Select>

            {/* Asignar nuevo rol */}
            <div className="flex flex-col">
              <Checkbox
                radius="full"
                isSelected={checkSelected === "nuevo"}
                onClick={() => setCheckSelected("nuevo")}
              >
                Asignar nuevo rol
              </Checkbox>

              <div className="flex w-full flex-row justify-around">
                <div className="w-[48%]">
                  <Input
                    label={"Nombre del rol"}
                    disabled={checkSelected === "existente"}
                    placeholder={"Escribe el nombre del rol..."}
                    {...register("nameRole", {
                      required:
                        checkSelected === "nuevo"
                          ? "Debes ingresar el nombre del rol"
                          : false,
                    })}
                    error={errors.nameRole?.message}
                  />
                </div>

                <div className="mt-5 w-[48%]">
                  <Select
                    isDisabled={checkSelected === "existente"}
                    label="Asignar permisos"
                    selectionMode="multiple"
                    {...register("permissions", {
                      required:
                        checkSelected === "nuevo"
                          ? "Debes asignar permisos"
                          : false,
                    })}
                    onSelectionChange={(values) =>
                      setValue("permissions", values)
                    }
                  >
                    {permisos.map((permiso) => (
                      <SelectItem key={permiso.key}>{permiso.label}</SelectItem>
                    ))}
                  </Select>
                  {errors.permissions && (
                    <span className="text-red-500">
                      {errors.permissions.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              text={"GUARDAR"}
              color={"save"}
              type={"submit"}
              icon={ArrowRightIcon}
            />
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

export default AddUserPage;
