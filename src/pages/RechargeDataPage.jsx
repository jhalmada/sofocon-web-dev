import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import useRoles from "../hooks/roles/use.roles";
import { useForm } from "react-hook-form";
import cameraIcon from "../assets/icons/camera.svg";

const RechargeDataPage = () => {
  const {
    register,
    handleSubmit,
    control,
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
  const [dateSelected, setDateSelected] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);

  const stateOptions = ["Habilitado", "Inhabilitado"];
  const productsOptions = ["Polvo", "Arena"];
  const monthsOptions = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
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
  const onSubmit = () => {
    navigate("/inicio/taller/recarga");
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
          <Link
            to="/inicio/taller/recarga"
            className="text-sm font-medium leading-4"
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
              label="Estado del extintor"
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
              <Input label={"Código de barras"} placeholder={"1234566"} />
              <span className="flex w-full items-center">
                <Link to={"/inicio"}>
                  <div className="mt-2 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur">
                    <img src={cameraIcon} alt="" className="h-5 w-5" />
                  </div>
                </Link>
              </span>
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Matrícula"}
                placeholder={"X234234"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"N° UNIT de fábrica"}
                placeholder={"123455"}
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Fecha última carga"}
                placeholder={"07/2024"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"N° UNIT anterior"}
                placeholder={"12344"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Capacidad (kg/l)"}
                placeholder={"4"}
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <Input label={"N° UNIT actual"} placeholder={"1234566"} />
              <span className="-mt-3 flex w-full items-center">
                {" "}
                <div className="flex w-full flex-col">
                  <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                    Fecha ensayo
                  </span>
                  <Select
                    className="rounded-lg border"
                    placeholder="MM/AA"
                    onSelectionChange={(values) => setValue("status", values)}
                  >
                    {monthsOptions.map((month) => (
                      <SelectItem key={month.key}>{month}</SelectItem>
                    ))}
                  </Select>
                </div>
              </span>
            </div>
            <div className="flex space-x-2">
              <div className="flex w-1/2 flex-col">
                <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                  Producto
                </span>
                <Select
                  placeholder="Polvo"
                  className="max-w rounded-lg border font-roboto font-medium"
                >
                  {productsOptions.map((product) => (
                    <SelectItem key={product.key}>{product}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="mt-5 flex w-1/2 items-center space-x-2">
                <div className="flex w-1/2 flex-col">
                  <Select
                    placeholder="Subproducto"
                    className="max-w rounded-lg border font-roboto font-medium"
                  >
                    {productsOptions.map((product) => (
                      <SelectItem key={product.key}>{product}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex w-1/2 flex-col">
                  <Select
                    placeholder="Color"
                    className="max-w rounded-lg border font-roboto font-medium"
                  >
                    {productsOptions.map((product) => (
                      <SelectItem key={product.key}>{product}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <Input label={"Presión (MPa)"} placeholder={"35"} />

              <Input label={"Expansión (%)"} placeholder={"1,23"} />
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
      </div>
    </div>
  );
};
export default RechargeDataPage;
