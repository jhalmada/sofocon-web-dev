import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/react";
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
import Calendar from "../components/calendar/Calendar.jsx";

const NewBudgetPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { postAddOrders } = useAddOrders();
  const { companiesResponse, setSearch: setSearchCompanies } = useCompanies();
  const { setStatus } = useOrders();
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();
  const {
    productsResponse,
    setSearch: setSearchProducts,
    setList,
  } = useGetProducts();
  const { priceListResponse } = useGetPriceList();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [rutValue, setRutValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [name, setName] = useState("productInOrder");
  const [recharged, setRecharged] = useState(false);
  const [isPriceListSelected, setIsPriceListSelected] = useState(true);
  const [quantity, setQuantity] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState([]);
  const [discount2, setDiscount2] = useState("");
  const [isDirectValue, setIsDirectValue] = useState(false);
  const [company, setCompany] = useState(null);
  const [seller, setSeller] = useState(null);

  const pathSegments = pathname.split("/").filter(Boolean);
  const lastPathItem = pathSegments[pathSegments.length - 1];
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

  const handleBudgetCreation = async (budgetData) => {
    const {
      client,
      rut,
      phone,
      dateV,
      user,
      productInOrder,
      ItemsRemoval,
      discountPercent,
      barCode,
      enrollment,
      fabricUNIT,
      status,
      numberUNIT,
      paymentType,
    } = budgetData;
    try {
      const newdata = new Date(
        dateV?.year || 1,
        dateV?.month - 1 || 1,
        dateV?.day || 1,
      );
      const formattedDate = newdata.toISOString();
      const newBudget = await postAddOrders({
        workShopDateEntry: new Date(),
        isPreOrder: lastPathItem === "nuevo-presupuesto" ? true : false,
        client,
        rut,
        phone,
        user,
        productInOrder,
        ItemsRemoval,
        discountPercent: discountPercent ? discountPercent : 0,
        barCode,
        enrollment,
        fabricUNIT,
        status,
        numberUNIT,
        paymentType: paymentType ? paymentType : "",

        sellDate: formattedDate,
      });

      if (newBudget) {
        setStatus("PREORDER");
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear el presupuesto:", error);
    }
  };

  const onSubmit = (data) => {
    if (data) {
      handleBudgetCreation({
        ...data,
        client: isDirectValue
          ? { rut: data.rut, name: data.client, phone: data.phone }
          : company,
        user: seller,
      });
    }
    isSaveConfirmationModalOpen(true);
    navigate("/inicio/ordenes");
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
      setCompany(selectedCompany);
      setRutValue(selectedCompany.rut);
      setValue("client", selectedCompany ? selectedCompany.name : "");
    } else {
      setCompany(null);
      setRutValue("");
      setValue("");
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
  const handleSelectSeller = (selectedSeller) => {
    if (selectedSeller) {
      setSeller(selectedSeller);
    } else {
      setSeller(null);
    }
  };
  const handleWriteRut = (writedRut) => {
    if (writedRut) {
      setRutValue(writedRut);
    } else {
      setRutValue("");
    }
  };

  const handleWritePhone = (writedPhone) => {
    if (writedPhone) {
      setPhoneValue(writedPhone);
    } else {
      setPhoneValue("");
    }
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
    let value = e.target.value;
    if (value === "100") {
      value = 100;
    } else {
      value = value.slice(0, 2);
      if (value === "" || isNaN(value)) {
        value = 0;
      } else {
        value = parseFloat(value);
      }
    }

    setDiscount((prevDiscount) => {
      const newDiscount = [...prevDiscount];
      newDiscount[index] = value;
      return newDiscount;
    });
  };

  const handleDiscount2Input = (e) => {
    let value = e.target.value;
    if (value === "100") {
      value = 100;
    } else {
      value = value.slice(0, 2);
    }
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
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Detalle
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-tr-lg bg-white px-14 py-10"
        >
          <div>
            <div>
              <Checkbox
                radius="full"
                className="mb-2"
                size="sm"
                isSelected={isDirectValue}
                onChange={() => setIsDirectValue(!isDirectValue)}
              >
                Presupuesto de venta directa
              </Checkbox>
            </div>
            <div className="flex space-x-2">
              {isDirectValue ? (
                <Input
                  label={"Empresa"}
                  placeholder={"Escribir..."}
                  {...register("client", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El nombre debe contener al menos 2 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message: "El nombre no puede exceder los 50 caracteres.",
                    },
                  })}
                  msjError={errors.client ? errors.client.message : ""}
                />
              ) : (
                <div className="-mt-1 mb-4 w-full">
                  <Controller
                    name="client"
                    control={control}
                    rules={{
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 2,
                        message:
                          "El nombre debe contener al menos 2 caracteres.",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El nombre no puede exceder los 50 caracteres.",
                      },
                    }}
                    render={({ field }) => (
                      <CompleteSearchInput
                        label={"Empresa"}
                        array={companiesResponse}
                        name={"client"}
                        setValue={setValue}
                        onChange={setSearchCompanies}
                        placeholder="Buscar empresa"
                        onSelect={handleSelectCompany}
                        setRut={setRutValue}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-xs text-red_e">
                    {errors.client && errors.client.message}
                  </p>
                </div>
              )}
            </div>
            {isDirectValue ? (
              <>
                <Input
                  label={"R.U.T./CI"}
                  placeholder={"Escribir..."}
                  onChange={handleWriteRut}
                  {...register("rut", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Mínimo de 2 caracteres.",
                    },
                    maxLength: {
                      value: 12,
                      message: "No se puede exceder de 12 caracteres.",
                    },
                  })}
                  errorApi={errors.rut}
                  msjError={errors.rut ? errors.rut.message : ""}
                />
                <Input
                  type="number"
                  label={"Contacto"}
                  placeholder={"Escribir..."}
                  onChange={handleWritePhone}
                  {...register("phone", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 9,
                      message: "No se permiten menos de 6 caracteres",
                    },
                    maxLength: {
                      value: 15,
                      message: "No se permiten más de 15 caracteres",
                    },
                  })}
                  errorApi={errors.phone}
                  msjError={errors.phone ? errors.phone.message : ""}
                />
              </>
            ) : (
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
                  Fecha de presupuesto
                </span>
                <Calendar control={control} errors={errors} name="dateV" />
              </div>
              <div className="-mt-[.08rem] w-1/2">
                <Controller
                  name="user"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <CompleteSearchInput
                      label={"Vendedores"}
                      array={
                        transformData(userSellerResponse?.result || []) || []
                      }
                      name={"user"}
                      setValue={setValue}
                      onChange={setSearchSellers}
                      onSelect={handleSelectSeller}
                      placeholder="Buscar vendedores"
                      {...field}
                    />
                  )}
                />
                {errors.user && (
                  <p className="text-xs text-red_e">{errors.user.message}</p>
                )}
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
                  {...register("priceList", {
                    required: "Este campo es obligatorio",
                  })}
                  onSelectionChange={handleSelectionListChange}
                >
                  {priceListResponse.map((option) => (
                    <SelectItem key={option.id}>{option.name}</SelectItem>
                  ))}
                </Select>
                {errors.priceList && (
                  <p className="text-xs text-red_e">
                    {errors.priceList.message}
                  </p>
                )}
              </div>
              <div className="mt-3 w-1/2">
                <Controller
                  name="products"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <ProductsAutocomplete
                      {...field}
                      label="Productos"
                      array={productsResponse || []}
                      name="products"
                      setValue={setValue}
                      onChange={setSearchProducts}
                      placeholder="Buscar productos"
                      setAutocompleteResults={setAutocompleteResults}
                      selectedItems={autocompleteResults}
                      isDisabled={isPriceListSelected}
                    />
                  )}
                />
                <p className="text-xs text-red_e">
                  {errors.products && errors.products.message}
                </p>
              </div>
            </div>

            <div>
              {autocompleteResults.length > 0 && (
                <div>
                  {autocompleteResults.map((item, index) => (
                    <div className="flex w-full space-x-2" key={item.id}>
                      <div className="h-10 w-1/2">
                        <span className="mt-[1.50rem] flex h-10 w-full items-center justify-between rounded-lg p-2 shadow-br">
                          {item.name}
                          <img
                            src={x}
                            alt="delete"
                            className="mr-1 cursor-pointer"
                            onClick={() => handleDeleteSelection(item.id)}
                          />
                        </span>
                        <Input
                          hidden={true}
                          value={item.id}
                          defaultValue={item.id}
                          {...register(`productInOrder[${index}].product.id`, {
                            value: item.id,
                          })}
                          disabled
                        />
                      </div>
                      <div className="flex w-1/2 space-x-2">
                        <Input
                          type="number"
                          label={"Cantidad"}
                          defaultValue={1}
                          minValue={1}
                          placeholder={"Cant."}
                          onInput={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          {...register(`productInOrder[${index}].amount`)}
                          msjError={
                            errors[`productInOrder[${index}].amount`]
                              ?.message || 0
                          }
                        />
                        <Input
                          bg="bg-gray"
                          placeholderColor="placeholder-black_b"
                          border="none"
                          label={"Precio"}
                          defaultValue={item.list[0].price}
                          value={
                            "$" +
                            (
                              item.list[0].price *
                              (quantity[item.id] || 1) *
                              (1 -
                                (discount[index] ? discount[index] / 100 : 0))
                            ).toFixed(2)
                          }
                          {...register(`productInOrder[${index}].fixedPrice`, {
                            value: item.list[0].price,
                          })}
                          disabled
                        />
                        <Input
                          type="number"
                          label={"Desc."}
                          defaultValue={1}
                          placeholder={"%"}
                          value={discount[index] || 0}
                          onInput={(e) => handleProductDiscountInput(e, index)}
                          {...register(
                            `productInOrder[${index}].discountPercent`,
                          )}
                          msjError={
                            errors[`productInOrder[${index}].discountPercent`]
                              ?.message || 0
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {autocompleteResults.map((item) => {
              return (
                recharged[item.id] &&
                Array.from({ length: quantity[item.id] || 1 }).map(
                  (_, index) => (
                    <div
                      key={`recharged-${item.id}-${index}`}
                      className="mb-8 rounded-lg bg-gray p-4"
                    >
                      <p className="text-center text-md">
                        Recarga del producto
                        <span className="ml-1 font-semibold uppercase">
                          {item.name}
                        </span>
                      </p>
                      <div className="flex space-x-2">
                        <Input
                          label={"Código de barras"}
                          placeholder={"..."}
                          bg="bg-white"
                          {...register(
                            `productInOrder[${index}].ItemsRemoval[${index}].barCode`,
                            {
                              required: "Este campo es obligatorio",
                            },
                          )}
                          msjError={errors.barCode?.message || ""}
                        />
                        <span className="flex items-center">
                          <Link to={"/inicio"}>
                            <div className="mt-2 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur">
                              <img
                                src={cameraIcon}
                                alt=""
                                className="h-5 w-5"
                              />
                            </div>
                          </Link>
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          label={"Matrícula"}
                          placeholder={"X234234"}
                          bg="bg-white"
                          {...register(
                            `productInOrder[${index}].ItemsRemoval[${index}].enrollment`,
                            {
                              required: "Este campo es obligatorio",
                            },
                          )}
                          msjError={errors.enrollment?.message || ""}
                        />
                        <Input
                          label={"N° UNIT de fábrica"}
                          placeholder={"123455"}
                          bg="bg-white"
                          {...register(
                            `productInOrder[${index}].ItemsRemoval[${index}].fabricUNIT`,
                            {
                              required: "Este campo es obligatorio",
                            },
                          )}
                          msjError={errors.fabricUNIT?.message || ""}
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
                            {...register(
                              `productInOrder[${index}].ItemsRemoval[${index}].lastDate`,
                            )}
                            onSelectionChange={(values) =>
                              setValue(
                                `productInOrder[${index}].ItemsRemoval[${index}].lastDate`,
                                values,
                              )
                            }
                          >
                            {monthsOptions.map((month) => (
                              <SelectItem key={month}>{month}</SelectItem>
                            ))}
                          </Select>
                        </div>
                        <Input
                          label={"N° UNIT actual"}
                          placeholder={"123455"}
                          bg="bg-white"
                          {...register(
                            `productInOrder[${index}].ItemsRemoval[${index}].numberUNIT`,
                            {
                              required: "Este campo es obligatorio",
                            },
                          )}
                          msjError={errors.numberUNIT?.message || ""}
                        />
                      </div>
                    </div>
                  ),
                )
              );
            })}

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
                value={"$" + truncateToTwoDecimals(subtotal * 0.22)}
                disabled
              />
              <Input
                type="number"
                defaultValue={0}
                label={"Desc."}
                placeholder={"%"}
                value={discount2}
                onInput={handleDiscount2Input}
                {...register("discountPercent", {})}
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
          <div className="mt-16 flex w-full justify-end">
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
          title="Presupuesto creado"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          El presupuesto fue creado exitosamente.
        </ReusableModal>
      </div>
    </div>
  );
};
export default NewBudgetPage;
