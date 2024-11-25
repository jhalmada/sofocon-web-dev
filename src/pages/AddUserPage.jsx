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
import { permisos } from "../utils/permisons";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../hooks/roles/use.roles";
import { Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";
const AddUserPage = () => {
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
    const {
      fullName,
      ci,
      phone,
      email,
      password,
      role,
      nameRole,
      permissions,
    } = data;
    switch (checkSelected) {
      case "existente":
        handleUserCreation({
          isActive: true,
          fullName,
          ci,
          phone,
          email,
          password,
          role: { id: role },
        });
        break;
      default:
        handleUserCreation({
          isActive: true,
          fullName,
          ci,
          phone,
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
    navigate("/inicio/personal");
  };
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to="/inicio/personal" className="text-sm font-medium leading-4">
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
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nuevo usuario
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col justify-between rounded-tr-lg bg-white px-14 py-10"
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
              type={"text"}
              pattern="[0-9]*"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              label={"CI"}
              placeholder={"123456789"}
              {...register("ci", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.fullName}
              msjError={errors.fullName ? errors.fullName.message : ""}
            />
            <Input
              type={"text"}
              pattern="[0-9]*"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              label={"Teléfono de contacto"}
              placeholder={"123456789"}
              {...register("phone", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.fullName}
              msjError={errors.fullName ? errors.fullName.message : ""}
            />
            <Input
              placeholder={"Escribe el email del usuario..."}
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
              <Checkbox
                defaultSelected={checkSelected === "existente"}
                isSelected={checkSelected === "existente"}
                onClick={() => setCheckSelected("existente")}
                radius="full"
                className="font-light"
                size="sm"
              >
                Asignar rol existente
              </Checkbox>
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
              <div className="flex flex-col">
                <Checkbox
                  radius="full"
                  isSelected={checkSelected === "nuevo"}
                  onClick={() => setCheckSelected("nuevo")}
                  className="font-light"
                  size="sm"
                >
                  Asignar nuevo rol
                </Checkbox>
                <div className="flex w-full flex-row justify-between">
                  <div className="mt-5 w-[48%]">
                    <Input
                      disabled={checkSelected === "existente"}
                      placeholder={"Escribe el nombre del rol..."}
                      {...register("nameRole", {
                        required:
                          checkSelected === "nuevo"
                            ? "Debes ingresar el nombre del rol"
                            : false,
                      })}
                      errorApi={errors.nameRole}
                      msjError={errors.nameRole ? errors.nameRole.message : ""}
                    />
                  </div>
                  <div className="mt-5 w-[48%]">
                    <Select
                      isDisabled={checkSelected === "existente"}
                      placeholder="Permisos"
                      selectionMode="multiple"
                      className="max-w rounded-lg border font-roboto font-medium"
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
                        <SelectItem key={permiso.key}>
                          {permiso.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {errors.permissions && errors.permissions.message ? (
                      <span className="font-roboto text-xs text-red_e">
                        {errors.permissions.message}
                      </span>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full justify-end">
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
export default AddUserPage;
