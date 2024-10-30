import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import CheckLgIcon from "../assets/icons/check-lg.svg";
import DownloadIcon from "../assets/icons/download-white.svg";

const BudgetDataPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { postAddUsers, loading } = AddUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const [mnsError, setMnsError] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const { userSellerResponse, setSearch } = useUsersSellers();

  const stateOptions = ["Entregado", "Solicitado", "Preparación", "Retiro"];
  const pricesList = ["Lista 1", "Lista 2", "Lista 3"];
  const productsOptions = ["Polvo", "Arena"];
  const subProductsOptions = ["Subproducto 1", "Subproducto 2"];
  const colorsOptions = ["Color 1", "Color 2", "Color 3"];
  const paymentsOptions = ["Efectivo", "Tarjeta"];
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
          <Link to="/inicio/ordenes" className="text-sm font-medium leading-4">
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
          ID de órden
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Detalle
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-tr-lg bg-white px-14 py-10"
        >
          <div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                border="none"
                placeholderColor="placeholder-black_b"
                disabled
                label={"ID de órden"}
                placeholder={"1234566"}
              />
              <Input
                bg="bg-gray"
                border="none"
                placeholderColor="placeholder-black_b"
                disabled
                label={"Cliente"}
                placeholder={"..."}
              />
            </div>
            <Input
              label={"R.U.T./CI"}
              placeholder={"123456789"}
              bg="bg-gray"
              border="none"
              placeholderColor="placeholder-black_b"
              disabled
            />
            <div className="flex space-x-2">
              <div className="w-1/2">
                <span className="text-sm font-light leading-[1rem] text-black_b">
                  Fecha de presupuesto
                </span>
                <Input
                  placeholder={"14/09/2024"}
                  bg="bg-gray"
                  border="none"
                  placeholderColor="placeholder-black_b"
                  disabled
                />
              </div>
              <div className="w-1/2">
                <Input
                  label={"Vendedor"}
                  placeholder={"Nombre vendedor"}
                  bg="bg-gray"
                  border="none"
                  placeholderColor="placeholder-black_b"
                  disabled
                />
              </div>
            </div>

            <label className="block text-sm font-semibold text-black_b">
              Detalle
            </label>

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Producto"}
                placeholder={"Producto 1"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Cant."}
                placeholder={"1"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subproducto"}
                placeholder={"-"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Color"}
                placeholder={"-"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Precio"}
                placeholder={"$345"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Desc."}
                placeholder={"10%"}
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                placeholder={"Recarga"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                placeholder={"1"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                placeholder={"PA"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                placeholder={"Amarillo"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                placeholder={"$432"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                placeholder={"10%"}
                disabled
              />
            </div>

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subtotal"}
                placeholder={"$10000"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"IVA 22%"}
                placeholder={"$1000"}
                disabled
              />

              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"TOTAL"}
                placeholder={"$100000"}
                disabled
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-end">
            <Button
              text={"DESCARGAR"}
              color={"save"}
              type={"submit"}
              icon={DownloadIcon}
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
export default BudgetDataPage;
