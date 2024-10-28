import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import DownloadIcon from "../assets/icons/download-white.svg";
import { I18nProvider } from "@react-aria/i18n";
import { Checkbox, DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import cameraIcon from "../assets/icons/camera.svg";
import PlusIconFilled from "../assets/icons/plus-fill.svg";

const NewSalePage = () => {
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
          Nueva venta
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
                label={"ID de órden"}
                placeholder={"1234566"}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                label={"Cliente"}
                placeholder={"..."}
                placeholderColor="placeholder-black_b"
              />
            </div>
            <div className="-mt-[3.27rem] mb-4">
              <NextAutoComplete
                array2={[]}
                label={"R.U.T./CI"}
                array={[]}
                name={"products"}
                setValue={setValue}
                onChange={setSearch}
                placeholder="Buscar RUT o CI..."
              />
              <p>{errors.vendedores && errors.vendedores.message}</p>
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <span className="text-sm font-light leading-[1rem] text-black_b">
                  Fecha de venta
                </span>
                <I18nProvider locale="es-ES">
                  <Controller
                    name={"dateV"}
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        minValue={today(getLocalTimeZone())}
                        className={`${errors.dateV ? "text-red_e" : ""} ${errors.dateV ? "border-red_e" : ""} rounded-lg border`}
                        {...field}
                        label={""}
                        placeholder="Seleccione una fecha"
                        granularity="day"
                        errorMessage={(value) => {
                          if (value.isInvalid) {
                            setErrorDataPicker(true);
                            return "";
                          } else {
                            setErrorDataPicker(false);
                            return "";
                          }
                        }}
                      />
                    )}
                    rules={{
                      required: dateSelected && "La fecha es obligatoria",
                    }}
                  />
                  <p className="font-roboto text-xs text-red_e">
                    {errors.dateV ? errors.dateV.message : ""}
                  </p>
                </I18nProvider>
              </div>
              <div className="w-1/2">
                <Input label={"Vendedor"} placeholder={"Escribir..."} />
              </div>
            </div>
            <div className="mb-4 flex space-x-2">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-black_b">
                  Detalle
                </label>
                <Select
                  placeholder="Elegir lista de precios..."
                  className="rounded-lg border"
                  {...register("status")}
                  onSelectionChange={(value) => setValue("status", value)}
                >
                  {pricesList.map((option) => (
                    <SelectItem key={option}>{option}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="-mt-[2rem] w-1/2">
                <NextAutoComplete
                  array2={[]}
                  array={[]}
                  name={"products"}
                  setValue={setValue}
                  onChange={setSearch}
                  placeholder="Producto 1"
                />
                <p>{errors.vendedores && errors.vendedores.message}</p>
              </div>
            </div>
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
            <div className="w-1/5 rounded-lg border p-2">
              {" "}
              <Checkbox
                placeholder="Retiro de extintores"
                radius="full"
                className="font-light"
                size="sm"
              >
                Retiro de extintores
              </Checkbox>
            </div>
            <div className="mt-4 rounded-lg bg-gray p-4">
              <div className="flex space-x-2">
                <Input
                  label={"Código de barras"}
                  placeholder={"..."}
                  bg="bg-white"
                />
                <span className="flex items-center">
                  <Link to={"/inicio"}>
                    <div className="mt-2 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur">
                      <img src={cameraIcon} alt="" className="h-5 w-5" />
                    </div>
                  </Link>
                </span>
              </div>
              <div className="flex space-x-2">
                <Input
                  label={"Matrícula"}
                  placeholder={"X234234"}
                  bg="bg-white"
                />
                <Input
                  label={"N° UNIT de fábrica"}
                  placeholder={"123455"}
                  bg="bg-white"
                />
              </div>
              <div className="flex w-full space-x-2">
                <div className="w-full">
                  <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                    Fecha última carga
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

                <Input label={"Capacidad"} placeholder={"..."} bg="bg-white" />
                <Input
                  label={"N° UNIT de fábrica"}
                  placeholder={"123455"}
                  bg="bg-white"
                />
              </div>
              <div className="flex w-full space-x-2">
                <div className="w-full">
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

                <div className="w-full">
                  <Select
                    placeholder="Subproducto"
                    className="max-w mt-6 rounded-lg border font-roboto font-medium"
                  >
                    {subProductsOptions.map((product) => (
                      <SelectItem key={product.key}>{product}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="w-full">
                  <Select
                    placeholder="Color"
                    className="max-w mt-6 rounded-lg border font-roboto font-medium"
                  >
                    {colorsOptions.map((product) => (
                      <SelectItem key={product.key}>{product}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="mt-3 flex w-[12rem] cursor-pointer items-center">
                <img src={PlusIconFilled} alt="geo Icon" />
                <span className="text-xs font-semibold leading-[.88rem] underline">
                  Agregar extintor para recarga
                </span>
              </div>
            </div>
            <div className="mt-2 flex space-x-2">
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
            <div className="space-y-3">
              <Input
                label={"Número de la factura"}
                placeholder={"Escribir..."}
              />
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                    Forma de pago
                  </span>
                  <Select
                    placeholder="Seleccionar forma de pago"
                    className="rounded-lg border font-roboto font-medium"
                  >
                    {paymentsOptions.map((product) => (
                      <SelectItem key={product.key}>{product}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex w-full space-x-2">
                  <div className="w-[4rem]">
                    <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                      Cant.
                    </span>
                    <Select
                      placeholder="1"
                      className="rounded-lg border font-roboto font-medium"
                    >
                      <SelectItem key={1}>1</SelectItem>
                      <SelectItem key={2}>2</SelectItem>
                    </Select>
                  </div>
                  <div className="mt-[.06rem] w-full">
                    <Input label={"Valor"} placeholder={"$"} />
                  </div>
                </div>
              </div>
              <Input
                label={"Compra autorizada por:"}
                placeholder={"Nombre del cliente"}
              />
              <div>
                <Checkbox radius="full" className="font-light" size="sm">
                  Entregado
                </Checkbox>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full justify-end">
            <Button
              text={"Descargar"}
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
export default NewSalePage;
