import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { I18nProvider } from "@react-aria/i18n";
import { Checkbox, DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import cameraIcon from "../assets/icons/camera.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import useOrders from "../hooks/orders/useOrders.js";
import useAddOrders from "../hooks/orders/useAddOrders.js";
import useCompanies from "../hooks/companies/useCompanies.js";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput.jsx";

const NewSalePage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const [rutValue, setRutValue] = useState("");

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
  const quantityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const { postAddOrders } = useAddOrders();
  const { companiesResponse, setSearch: setSearchCompanies } = useCompanies();
  const { ordersResponse, setStatus } = useOrders();
  const { userSellerResponse, setSearch } = useUsersSellers();
  const navigate = useNavigate();

  const handleOrderCreation = async (orderData) => {
    try {
      const newOrder = await postAddOrders(orderData);

      if (newOrder) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear la órden:", error);
    }
  };

  const onSubmit = (data) => {
    const {
      company,
      seller,
      discount,
      barCode,
      registration,
      factoryUnit,
      actualUnit,
      capacity,
      invoiceNumber,
      value,
      authorizedCompany,
      dateV,
    } = data;

    const newdata = new Date(
      dateV?.year || 1,
      dateV?.month - 1 || 1,
      dateV?.day || 1,
    );
    const formattedDate = newdata.toISOString();
    handleOrderCreation({
      company,
      seller,
      discount,
      barCode,
      registration,
      factoryUnit,
      actualUnit,
      capacity,
      invoiceNumber,
      value,
      authorizedCompany,
      date: dateSelected ? formattedDate : null,
    });
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate("/inicio/personal");
  };
  const handleSelectCompany = (selectedCompany) => {
    if (selectedCompany) {
      setRutValue(selectedCompany);
    } else {
      setRutValue("");
    }
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
              {ordersResponse.isDirect ? (
                <Input
                  label={"Empresa"}
                  placeholder={"..."}
                  {...register("company", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={errors.company ? errors.company.message : ""}
                />
              ) : (
                <div className="-mt-1 mb-4 w-full">
                  <CompleteSearchInput
                    label={"Empresa"}
                    array={companiesResponse}
                    name={"empresa"}
                    setValue={setValue}
                    onChange={setSearchCompanies}
                    placeholder="Buscar empresa"
                    onSelect={handleSelectCompany}
                  />
                  <p>{errors.empresa && errors.empresa.message}</p>
                </div>
              )}
            </div>
            {ordersResponse.isDirect ? null : (
              <Input
                label={"R.U.T./CI"}
                placeholder={rutValue}
                bg="bg-gray"
                border="none"
                placeholderColor="placeholder-black_b"
                disabled
              />
            )}

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
              <div className="-mt-[.08rem] w-1/2">
                <NextAutoComplete
                  label={"Vendedor"}
                  array2={[]}
                  array={[]}
                  name={"products"}
                  setValue={setValue}
                  onChange={setSearch}
                  placeholder="Buscar vendedor"
                />
                <p>{errors.vendedores && errors.vendedores.message}</p>
              </div>
            </div>
            <div className="mb-4 flex space-x-2">
              <div className="mt-4 w-1/2">
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
              <div className="mt-3 w-1/2">
                <NextAutoComplete
                  label={"Producto"}
                  array2={[]}
                  array={[]}
                  name={"products"}
                  setValue={setValue}
                  onChange={setSearch}
                  placeholder="Buscar producto"
                />
                <p>{errors.vendedores && errors.vendedores.message}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Producto"}
                  placeholder={"Producto 1"}
                  disabled
                />
              </div>
              <div className="flex w-1/2 space-x-2">
                <div className="mt-[.1rem] w-full">
                  <label className="block text-sm font-light">Cantidad</label>
                  <Select
                    className="rounded-lg border"
                    placeholder="Cant."
                    onSelectionChange={(values) => setValue("quantity", values)}
                  >
                    {quantityOptions.map((month) => (
                      <SelectItem key={month.key}>{month}</SelectItem>
                    ))}
                  </Select>
                </div>

                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Precio"}
                  placeholder={"$345"}
                  disabled
                />
                <Input
                  label={"Desc."}
                  placeholder={"%"}
                  {...register("discount", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={errors.discount ? errors.discount.message : ""}
                />
                <div className="w-full">
                  <label className="block text-sm font-light">Recarga</label>
                  <Select
                    className="rounded-lg border"
                    placeholder="Si/No"
                    onSelectionChange={(values) => setValue("quantity", values)}
                  >
                    <SelectItem key={"si"}>Si</SelectItem>
                    <SelectItem key={"no"}>No</SelectItem>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray p-4">
              <div className="flex space-x-2">
                <Input
                  label={"Código de barras"}
                  placeholder={"..."}
                  bg="bg-white"
                  {...register("barcode", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={errors.barcode ? errors.barcode.message : ""}
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
                  {...register("registration", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={
                    errors.registration ? errors.registration.message : ""
                  }
                />
                <Input
                  label={"N° UNIT de fábrica"}
                  placeholder={"123455"}
                  bg="bg-white"
                  {...register("factoryUnit", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={
                    errors.factoryUnit ? errors.factoryUnit.message : ""
                  }
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
                <Input
                  label={"N° UNIT actual"}
                  placeholder={"123455"}
                  bg="bg-white"
                  {...register("actualUnit", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={errors.actualUnit ? errors.actualUnit.message : ""}
                />
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
              <Input label={"Desc."} placeholder={"%"} />
            </div>
            <Input
              bg="bg-gray"
              placeholderColor="placeholder-black_b"
              border="none"
              label={"TOTAL"}
              placeholder={"$100000"}
              disabled
            />
            <div className="space-y-3">
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
                      {quantityOptions.map((product) => (
                        <SelectItem key={product.key}>{product}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="mt-[.06rem] w-full">
                    <Input
                      label={"Valor"}
                      placeholder={"$"}
                      {...register("value", {
                        required: "Este campo es obligatorio",
                      })}
                      msjError={errors.value ? errors.value.message : ""}
                    />
                  </div>
                </div>
              </div>
              <Input
                label={"Compra autorizada por:"}
                placeholder={"Nombre de la empresa"}
                {...register("authorizedCompany", {
                  required: "Este campo es obligatorio",
                })}
                msjError={
                  errors.authorizedCompany
                    ? errors.authorizedCompany.message
                    : ""
                }
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
              text={"ACEPTAR"}
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
export default NewSalePage;
