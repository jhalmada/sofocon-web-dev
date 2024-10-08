import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../hooks/roles/use.roles";
import { useForm } from "react-hook-form";
const AddSellerPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { RolesResponse } = useRoles();
  const { postAddUsers, loading } = AddUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const [mnsError, setMnsError] = useState("");
  const handleUserCreation = async (userData) => {
    try {
      const newUser = await postAddUsers(userData);

      if (newUser) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setMnsError("El correo electrónico ya se encuentra registrado");
        setIsModalOpen(true);
      } else {
        setMnsError("Error al crear el usuario");
      }
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
          role: { id: role },
        });
        break;
      default:
        handleUserCreation({
          fullName,
          email,
          password,
          role: {
            name: nameRole,
            permissions: [...permissions, "USER_ADMIN"],
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
    navigate("/inicio/usuarios");
  };
  return (
    <div className="flex min-h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/personal"
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
          Vendedores
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nuevo vendedor
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-10 shadow-t"
        >
          <div>
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
              label={"CI"}
              placeholder={"123456789"}
              {...register("fullName", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.fullName}
              msjError={errors.fullName ? errors.fullName.message : ""}
            />
            <Input
              label={"Teléfono de contacto"}
              placeholder={"123456789"}
              {...register("fullName", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.fullName}
              msjError={errors.fullName ? errors.fullName.message : ""}
            />
            <Input
              placeholder={"Escribe el email del usuario"}
              label={"Correo electrónico"}
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
                  maxLength: {
                    value: 20,
                    message: "La contraseña debe tener menos de 20 caracteres",
                  },
                  validate: {
                    hasNumber: (value) =>
                      /\d/.test(value) || "Debes incluir al menos un número",
                    hasLetter: (value) =>
                      /[a-zA-Z]/.test(value) ||
                      "Debes incluir al menos una letra",
                  },
                })}
                errorApi={errors.password}
                msjError={errors.password ? errors.password.message : ""}
              />
              <p className="text-xs leading-[.875rem] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 block text-sm font-light">
                  Asignar rol existente:
                </label>
                <Select
                  isDisabled={checkSelected === "nuevo"}
                  labelPlacement="outside"
                  placeholder="Rol"
                  className="max-w rounded-lg border font-roboto font-medium"
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
                {errors.role && errors.role.message ? (
                  <span className="font-roboto text-xs text-red_e">
                    {errors.role.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label className="text-gray-700 block text-sm font-light">
                  Asignar ruta:
                </label>
                <Select
                  isDisabled={checkSelected === "nuevo"}
                  labelPlacement="outside"
                  placeholder="Ruta"
                  className="max-w rounded-lg border font-roboto font-medium"
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
                {errors.role && errors.role.message ? (
                  <span className="font-roboto text-xs text-red_e">
                    {errors.role.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
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
            {mnsError}
          </ReusableModal>
        )}
      </div>
    </div>
  );
};
export default AddSellerPage;
