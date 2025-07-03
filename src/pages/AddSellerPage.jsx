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
import useSellerRoutes from "../hooks/sellerRoutes/useSellerRoutes";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
const AddSellerPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [mnsError, setMnsError] = useState("");

  //hooks
  const { RolesResponse } = useRoles();
  const { postAddUsers } = AddUsers();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { sellerRoutesResponse, setSearch } = useSellerRoutes();

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

  //funciones
  const onSubmit = (data) => {
    const { fullName, email, password, route, ci, phone } = data;

    handleUserCreation({
      email,
      fullName,
      password,
      ci,
      phone,
      role: { id: "b3137878-2db6-41a0-a697-49638086ca83" },
      sellerRoute: route?.map((route) => ({ id: route.id })) || [],
    });
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

  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
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
          Vendedores
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nuevo vendedor
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col justify-between rounded-tr-lg bg-white px-14 py-10"
        >
          <div className="space-y-4">
            <Input
              label={"Nombre Completo"}
              placeholder={"Escribe el nombre completo del usuario..."}
              {...register("fullName", {
                required: "Este campo es obligatorio",
                maxLength: {
                  value: 50,
                  message: "Solo se permiten 50 caracteres",
                },
                minLength: {
                  value: 2,
                  message: "Se requieren al menos 2 caracteres",
                },
              })}
              errorApi={errors.fullName}
              msjError={errors.fullName ? errors.fullName.message : ""}
            />
            <Input
              label={"CI"}
              placeholder={"123456789"}
              {...register("ci", {
                required: "Este campo es obligatorio",
                maxLength: {
                  value: 8,
                  message: "Solo se permiten 8 caracteres",
                },
                minLength: {
                  value: 8,
                  message: "Se requieren al menos 8 caracteres",
                },
              })}
              errorApi={errors.ci}
              msjError={errors.ci ? errors.ci.message : ""}
            />
            <Input
              type="number"
              label={"Teléfono de contacto"}
              placeholder={"123456789"}
              {...register("phone", {
                maxLength: {
                  value: 9,
                  message: "Solo se permiten 9 caracteres como máximo",
                },
                minLength: {
                  value: 2,
                  message: "Se requieren al menos 2 caracteres",
                },
              })}
              errorApi={errors.phone}
              msjError={errors.phone ? errors.phone.message : ""}
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
            <div>
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
            <div className="space-y-6">
              <div className="relative">
                <label className="text-gray-700 block text-sm font-light">
                  Rol
                </label>
                <Select
                  defaultSelectedKeys={["b3137878-2db6-41a0-a697-49638086ca83"]}
                  isDisabled={true}
                  labelPlacement="outside"
                  placeholder="Rol"
                  className="max-w rounded-lg border font-roboto font-medium"
                  {...register("role", {})}
                  onSelectionChange={(value) => setValue("role", value)}
                >
                  {RolesResponse &&
                    RolesResponse.map((rol) => (
                      <SelectItem key={rol.id}>{rol.name}</SelectItem>
                    ))}
                </Select>

                {errors.role && errors.role.message && (
                  <span className="absolute -bottom-5 left-0 font-roboto text-xs text-red_e">
                    {errors.role.message}
                  </span>
                )}
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
            </div>
          </div>
          <div className="mt-10 flex w-full justify-end">
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
