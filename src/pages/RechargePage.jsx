import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import ChevronRightIcon from "../assets/icons/chevron-right.svg";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../hooks/roles/use.roles";
import { useForm } from "react-hook-form";
const RechargePage = () => {
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

  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Para retirar",
    "Egreso",
  ];

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
      state,
    } = data;
    switch (checkSelected) {
      case "existente":
        handleUserCreation({
          isActive: state === "Activo" ? true : false,
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
          isActive: state === "Activo" ? true : false,
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
    navigate("/inicio/taller");
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
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Recarga
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              ID de órden
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-tr-lg bg-white px-14 py-10"
        >
          <div>
            <Select
              className="mb-4 w-1/6 rounded-lg border"
              label="Estado"
              labelPlacement="outside"
              placeholder="Estado"
            >
              {stateOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"ID de órden"}
                placeholder={"1234566"}
                disabled
              />
              <span className="w-full"></span>
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Cliente"}
                placeholder={"..."}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"R.U.T./CI"}
                placeholder={"123456789"}
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Fecha de venta"}
                placeholder={"14/09/2024"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Vendedor"}
                placeholder={"Nombre vendedor"}
                disabled
              />
            </div>
            <div className="flex w-1/2 space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Producto"}
                placeholder={"Arena"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Cantidad"}
                placeholder={"3kg"}
                disabled
              />
            </div>
            <div className="flex">
              <div className="flex w-1/2 space-x-2">
                <div className="w-1/2">
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Recarga"}
                    placeholder={"Arena"}
                    disabled
                  />
                </div>
                <div className="flex w-1/2 space-x-2">
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Matrícula"}
                    placeholder={"M404"}
                    disabled
                  />
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Cód. de barras"}
                    placeholder={"1234567890"}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-2 flex w-1/2 items-center justify-between pl-2">
                <span className="flex h-[2.3rem] w-[7.5rem] items-center justify-center rounded-lg bg-green px-1 text-white">
                  Habilitado
                </span>
                <Link to={"/inicio/taller/datos-recarga"}>
                  <Button text="Datos Recarga" icon={ChevronRightIcon} />
                </Link>
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
export default RechargePage;
