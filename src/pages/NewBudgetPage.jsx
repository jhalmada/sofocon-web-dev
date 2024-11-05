import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import cameraIcon from "../assets/icons/camera.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import useOrders from "../hooks/orders/useOrders.js";
import useAddOrders from "../hooks/orders/useAddOrders.js";
import useCompanies from "../hooks/companies/useCompanies.js";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput.jsx";
import useGetProducts from "../hooks/products/useGetProducts.js";
import useGetPriceList from "../hooks/priceList/useGetPriceList.js";
import ProductsAutocomplete from "../components/autocomplete/ProductsAutocomplete.jsx";
import x from "../assets/icons/x.svg";

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
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [name, setName] = useState("productos");
  const [rechargued, setRechargued] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Efectivo");
  const [isPriceListSelected, setIsPriceListSelected] = useState(true);
  const [quantity, setQuantity] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState([]);
  const [discount2, setDiscount2] = useState("");
  const total = subtotal
    ? subtotal * 1.22 - subtotal * 1.22 * (discount2 / 100)
    : 0;

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
  const { postAddOrders } = useAddOrders();
  const { companiesResponse, setSearch: setSearchCompanies } = useCompanies();
  const { ordersResponse } = useOrders();
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();
  const {
    productsResponse,
    setSearch: setSearchProducts,
    setList,
  } = useGetProducts();
  const { priceListResponse } = useGetPriceList();
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
      empresa,
      company,
      dateV,
      vendedores,
      priceList,
      productos,
      quantity,
      discount,
      rechargue,
      barCode,
      registration,
      factoryUnit,
      status,
      actualUnit,
      discount2,
      paymentType,
      value,
      authorizedCompany,
      checkNumber,
      checkQuantity,
    } = data;

    const newdata = new Date(
      dateV?.year || 1,
      dateV?.month - 1 || 1,
      dateV?.day || 1,
    );
    const formattedDate = newdata.toISOString();
    handleOrderCreation({
      empresa,
      company,
      vendedores,
      priceList,
      productos,
      quantity,
      discount,
      rechargue,
      barCode,
      registration,
      factoryUnit,
      status,
      actualUnit,
      discount2,
      paymentType,
      value,
      authorizedCompany,
      checkNumber,
      checkQuantity,

      date: dateSelected ? formattedDate : null,
    });
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate("/inicio/ordenes");
  };
  const handleSelectCompany = (selectedCompany) => {
    if (selectedCompany) {
      setRutValue(selectedCompany);
    } else {
      setRutValue("");
    }
  };

  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
  };
  const handleDeleteSelection = (id) => {
    const updatedSelectedItems = autocompleteResults.filter(
      (selection) => selection.id !== id,
    );

    setValue(name, updatedSelectedItems);
    setAutocompleteResults(updatedSelectedItems);
  };

  const handleSelectionChange = (value) => {
    const selectedValue = value.anchorKey === "true" ? true : false;
    setRechargued(selectedValue);
  };
  const handleSelectionPaymentChange = (value) => {
    const selectedValue =
      value.anchorKey === "Efectivo" ? "Efectivo" : "Cheque";
    setSelectedPayment(selectedValue);
    setValue("paymentType", value);
  };
  const handleSelectionListChange = (value) => {
    const selectedValue = value.anchorKey;
    setList(selectedValue);
    setValue("priceList", value);
    setIsPriceListSelected(false);
  };
  const handleQuantityChange = (itemId, value) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleProductDiscountInput = (e, index) => {
    const value = e.target.value.slice(0, 2);
    setDiscount((prevDiscount) => {
      const newDiscount = [...prevDiscount];
      newDiscount[index] = value;
      return newDiscount;
    });
  };

  const handleDiscount2Input = (e) => {
    const value = e.target.value.slice(0, 2);
    setDiscount2(value);
  };
  const truncateToTwoDecimals = (num) => {
    return Math.floor(num * 100) / 100;
  };
  useEffect(() => {
    const total = autocompleteResults.reduce((acc, item, index) => {
      const itemQuantity = quantity[item.id] || 1;
      const itemPrice = item.list[0].price;
      const discountPercentage = discount[index] ? discount[index] / 100 : 0;
      const discountedPrice = itemPrice * (1 - discountPercentage);

      return acc + discountedPrice * itemQuantity;
    }, 0);

    setSubtotal(total);
  }, [autocompleteResults, quantity, discount]);

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
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
          Nuevo presupuesto
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
              {ordersResponse.isDirect ? (
                <Input
                  label={"Empresa"}
                  placeholder={"..."}
                  {...register("empresa", {
                    required: "Este campo es obligatorio",
                  })}
                  msjError={errors.empresa ? errors.empresa.message : ""}
                />
              ) : (
                <div className="-mt-1 mb-4 w-full">
                  <CompleteSearchInput
                    label={"Empresa"}
                    array={companiesResponse}
                    name={"company"}
                    setValue={setValue}
                    onChange={setSearchCompanies}
                    placeholder="Buscar empresa"
                    onSelect={handleSelectCompany}
                  />
                  <p>{errors.company && errors.company.message}</p>
                </div>
              )}
            </div>
            {ordersResponse.isDirect ? null : (
              <Input label={"R.U.T./CI"} placeholder="Escribir..." />
            )}

            <div className="flex space-x-2">
              <div className="w-1/2">
                <span className="text-sm font-light leading-[1rem] text-black_b">
                  Fecha de presupuesto
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
                <CompleteSearchInput
                  label={"Vendedor"}
                  array={transformData(userSellerResponse?.result || []) || []}
                  name={"vendedor"}
                  setValue={setValue}
                  onChange={setSearchSellers}
                  placeholder="Buscar vendedor"
                />
                <p>{errors.vendedor && errors.vendedor.message}</p>
              </div>
            </div>
            <div className="mb-4 flex space-x-2">
              <div className="mt-4 w-1/2">
                <label className="block text-sm font-light">
                  Lista de precios
                </label>
                <Select
                  placeholder="Elegir lista de precios..."
                  className="rounded-lg border"
                  {...register("priceList")}
                  onSelectionChange={handleSelectionListChange}
                >
                  {priceListResponse.map((option) => (
                    <SelectItem key={option.id}>{option.name}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="mt-3 w-1/2">
                <ProductsAutocomplete
                  label={"Productos"}
                  array={productsResponse || []}
                  name={"productos"}
                  setValue={setValue}
                  onChange={setSearchProducts}
                  placeholder="Buscar productos"
                  setAutocompleteResults={setAutocompleteResults}
                  selectedItems={autocompleteResults}
                  isDisabled={isPriceListSelected}
                />
                <p>{errors.productos && errors.productos.message}</p>
              </div>
            </div>

            <div>
              {autocompleteResults.length > 0 && (
                <div>
                  {autocompleteResults.map((item, index) => (
                    <div className="flex w-full space-x-2" key={item.id}>
                      <div className="w-1/2">
                        <span className="mt-[1.50rem] flex h-10 w-full items-center justify-between rounded-lg p-2 shadow-br">
                          {item.name}
                          <img
                            src={x}
                            alt="delete"
                            className="mr-1 cursor-pointer"
                            onClick={() => handleDeleteSelection(item.id)}
                          />
                        </span>
                      </div>
                      <div className="flex w-1/2 space-x-2">
                        <Input
                          type="number"
                          label={"Cantidad"}
                          defaultValue={1}
                          minValue={1}
                          placeholder={"Cant."}
                          onInput={(e) => {
                            handleQuantityChange(item.id, e.target.value);
                          }}
                          {...register(`quantity${index}`, {})}
                          msjError={
                            errors[`quantity${index}`]
                              ? errors[`quantity${index}`].message
                              : ""
                          }
                        />
                        <Input
                          bg="bg-gray"
                          placeholderColor="placeholder-black_b"
                          border="none"
                          label={"Precio"}
                          value={
                            item.list[0].price *
                            (quantity[item.id] || 1) *
                            (1 - (discount[index] ? discount[index] / 100 : 0))
                          }
                          disabled
                        />

                        <Input
                          type="number"
                          label={"Desc."}
                          placeholder={"%"}
                          value={discount[index] || ""}
                          onInput={(e) => handleProductDiscountInput(e, index)}
                          {...register(`discount${index}`, {})}
                          msjError={
                            errors[`discount${index}`]
                              ? errors[`discount${index}`].message
                              : ""
                          }
                        />

                        <div className="w-full">
                          <label className="block text-sm font-light">
                            Recarga
                          </label>
                          <Select
                            className="rounded-lg border"
                            placeholder="Si/No"
                            {...register("rechargue")}
                            onSelectionChange={handleSelectionChange}
                          >
                            <SelectItem key={true}>Si</SelectItem>
                            <SelectItem key={false}>No</SelectItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {rechargued ? (
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
                      {...register("status")}
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
                    msjError={
                      errors.actualUnit ? errors.actualUnit.message : ""
                    }
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-2 flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subtotal"}
                value={`$${truncateToTwoDecimals(subtotal)}`}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"IVA 22%"}
                value={truncateToTwoDecimals(subtotal * 0.22)}
                disabled
              />
              <Input
                type="number"
                label={"Desc."}
                placeholder={"%"}
                value={discount2}
                onInput={handleDiscount2Input}
                {...register("discount2", {
                  required: "Este campo es obligatorio",
                })}
              />
            </div>
            <Input
              bg="bg-gray"
              placeholderColor="placeholder-black_b"
              fontWeight="font-bold"
              border="none"
              label={"TOTAL"}
              value={`$${truncateToTwoDecimals(total)}`}
              disabled
            />
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
          title="Órden creada"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          La órden fue creada exitosamente.
        </ReusableModal>
      </div>
    </div>
  );
};
export default NewSalePage;
