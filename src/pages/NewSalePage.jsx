import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/react";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import barCodeIcon from "../assets/icons/barcode.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import useAddOrders from "../hooks/orders/useAddOrders.js";
import useCompanies from "../hooks/companies/useCompanies.js";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput.jsx";
import useGetProducts from "../hooks/products/useGetProducts.js";
import useGetPriceList from "../hooks/priceList/useGetPriceList.js";
import ProductsAutocomplete from "../components/autocomplete/ProductsAutocomplete.jsx";
import x from "../assets/icons/x.svg";
import BarcodeReader from "../components/scan/BarcodeReader.jsx";
import useOrders from "../hooks/orders/useOrders.js";
import Calendar from "../components/calendar/Calendar.jsx";
import checkIcon from "../assets/images/checkOrder.svg";

const NewSalePage = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { barCode, setBarCode } = useOrders();
  const { postAddOrders, status } = useAddOrders();
  const {
    companiesResponse,
    setSearch: setSearchCompanies,
    getAllCompanies,
  } = useCompanies({});
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();
  const {
    productsResponse,
    setSearch: setSearchProducts,
    setList,
  } = useGetProducts();
  const {
    priceListResponse,
    getAllPriceList,
    setSearch: setSearchList,
  } = useGetPriceList();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [rutValue, setRutValue] = useState("");
  const [company, setCompany] = useState(null);
  const [seller, setSeller] = useState(null);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("Efectivo");
  const [isPriceListSelected, setIsPriceListSelected] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [openScannerModal, setOpenScannerModal] = useState(false);
  const [isSaveConfirmationModalOpen, setIsSaveConfirmationModalOpen] =
    useState(false);
  const [deliveredValue, setDeliveredValue] = useState(false);
  const [companies, setCompanies] = useState("");
  const [sellers, setSellers] = useState("");
  const [lists, setLists] = useState("");

  const [quantity, setQuantity] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState([]);
  const [discount2, setDiscount2] = useState("");
  const [numChecks, setNumChecks] = useState(0);

  const total = subtotal
    ? subtotal * 1.22 - subtotal * 1.22 * (discount2 / 100)
    : 0;

  const checkQuantity = watch("checkQuantity");
  const isDirectValue = watch("isDirect", false);

  const handleOrderCreation = async (orderData) => {
    const {
      isDirect,
      client,
      rut,
      dateV,
      user,
      productInOrder,
      itemsRemoval,
      discountPercent,
      barCode,
      enrollment,
      fabricUNIT,
      numberUNIT,
      paymentType,
      value,
      clientAuthorize,
      checkNumber,
      checkQuantity,
      delivered,
    } = orderData;
    try {
      const newdata = new Date(
        dateV?.year || 1,
        dateV?.month - 1 || 1,
        dateV?.day || 1,
      );
      const formattedDate = newdata.toISOString();
      const newOrder = await postAddOrders({
        workShopDateEntry: new Date().toISOString(),
        workShopDateDeparture:
          delivered !== "DELIVERED" ? new Date().toISOString() : null,
        isPreOrder: false,
        isDirect,
        client,
        rut,
        user,
        productInOrder: productInOrder.map((product) => {
          return {
            ...product,
            isRecharge: product.isRecharge,
            itemsRemoval:
              product.isRecharge === "true"
                ? product.itemsRemoval.map((item) => {
                    return {
                      ...item,
                      lastDate: (item.lastDate = new Date(
                        item.lastDate.year,
                        item.lastDate.month - 1,
                        item.lastDate.day,
                      ).toISOString()),
                    };
                  })
                : [],
          };
        }),
        itemsRemoval,
        discountPercent: discountPercent ? discountPercent : 0,
        barCode,
        enrollment,
        fabricUNIT,
        status: delivered ? "DELIVERED" : "REQUEST",
        numberUNIT,
        paymentType,
        value,
        clientAuthorize,
        checkNumber,
        checkQuantity,
        isDelivered: delivered,
        sellDate: formattedDate ? formattedDate : null,
      });

      if (newOrder) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  const onSubmit = (data) => {
    setOrderData({ ...data, delivered: deliveredValue });
    setIsConfirmationModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOpenScannerModal(false);
  };

  const closeSaveConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setIsSaveConfirmationModalOpen(false);
    navigate("/inicio/ordenes");
  };
  const handleConfirmSaveClick = () => {
    setConfirmation(true);
    setIsConfirmationModalOpen(false);
    if (orderData) {
      handleOrderCreation({
        ...orderData,
        client: isDirectValue
          ? { rut: orderData.rut, name: orderData.client }
          : company,
        user: seller,
      });
    }
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
  const handleSelectSeller = (selectedSeller) => {
    if (selectedSeller) {
      setSeller(selectedSeller);
    } else {
      setSeller(null);
    }
  };
  const handleWriteCompany = (writedCompany) => {
    if (writedCompany) {
      setRutValue(writedCompany);
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
    const updatedQuantities = { ...quantity };
    delete updatedQuantities[id];

    setValue("products", updatedSelectedItems);
    setAutocompleteResults(updatedSelectedItems);
    setQuantity(updatedQuantities);

    const newSubtotal = updatedSelectedItems.reduce((acc, item) => {
      const itemQuantity = updatedQuantities[item.id] || 1;
      const itemPrice = item.list[0].price;
      const discountPercentage =
        discount[updatedSelectedItems.indexOf(item)] || 0;
      const discountedPrice = itemPrice * (1 - discountPercentage / 100);

      return acc + discountedPrice * itemQuantity;
    }, 0);

    setSubtotal(newSubtotal);
  };

  const handleSelectionPaymentChange = (value) => {
    const selectedValue = value.anchorKey;

    if (
      selectedValue === "Efectivo" ||
      selectedValue === "Cheque" ||
      selectedValue === "Crédito"
    ) {
      setSelectedPayment(selectedValue);
      setValue("paymentType", value);
    } else {
      console.error("Tipo de pago no soportado: ", selectedValue);
    }
  };
  const handleSelectionListChange = (item) => {
    if (item) {
      const selectedValue = item.id;
      setList(selectedValue);
      setValue("priceList", item);
      setIsPriceListSelected(false);
    } else {
      setList(null);
      setValue("priceList", null);
      setIsPriceListSelected(false);
    }
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

  useEffect(() => {
    if (checkQuantity) {
      setNumChecks(parseInt(checkQuantity, 10));
    }
  }, [checkQuantity]);

  useEffect(() => {
    setSearchCompanies(companies);
  }, [companies]);

  useEffect(() => {
    setSearchSellers(sellers);
  }, [sellers]);

  useEffect(() => {
    setSearchList(lists);
  }, [lists, setSearchList]);

  useEffect(() => {
    if (status === 201) {
      setIsSaveConfirmationModalOpen(true);
    }
  }, [status]);
  useEffect(() => {
    getAllCompanies();
    getAllPriceList();
  }, [getAllPriceList, getAllCompanies]);

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
          Nueva venta
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
          className="flex flex-grow flex-col justify-between rounded-tr-lg bg-white px-14 py-10"
        >
          <div>
            <div>
              <Checkbox
                radius="full"
                className="mb-2"
                size="sm"
                {...register("isDirect")}
                isSelected={isDirectValue}
                onChange={(e) => setValue("isDirect", e.target.checked)}
              >
                Orden de venta directa
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
                        companies={setCompanies}
                        placeholder={
                          company ? company.name : "Buscar empresa..."
                        }
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
              <Input
                label={"R.U.T./CI"}
                placeholder={"Escribir..."}
                onChange={handleWriteCompany}
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
                  Fecha de venta
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
                      name={"user.name"}
                      setValue={setValue}
                      onChange={setSearchSellers}
                      onSelect={handleSelectSeller}
                      sellers={setSellers}
                      setRUT={setRutValue}
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
                <CompleteSearchInput
                  label={"Lista de precios"}
                  array={priceListResponse}
                  name={"priceList"}
                  setValue={setValue}
                  onChange={setSearchList}
                  lists={setLists}
                  placeholder={"Buscar lista de precios..."}
                  onSelect={handleSelectionListChange}
                  setRut={setRutValue}
                />

                {errors.priceList && (
                  <p className="text-xs text-red_e">
                    {errors.priceList.message}
                  </p>
                )}
              </div>
              <div className="mt-4 w-1/2">
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
                      setQuantity={setQuantity}
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
                          type={"number"}
                          label={"Cantidad"}
                          value={quantity[item.id]}
                          placeholder={"1"}
                          onInput={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              handleQuantityChange(item.id, value);
                            }
                          }}
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
                          defaultValue={0}
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
                        <div className="w-full">
                          <label className="block text-sm font-light">
                            Recarga
                          </label>

                          <Input
                            disabled={true}
                            defaultValue={
                              item.isToRecharge === "true" ? "Si" : "No"
                            }
                            value={item.isToRecharge === "true" ? "Si" : "No"}
                            className="rounded-lg border"
                            {...register(
                              `productInOrder[${index}].isRecharge`,
                              {
                                value: item.isToRecharge,
                              },
                            )}
                          ></Input>
                        </div>
                      </div>
                    </div>
                  ))}
                  {autocompleteResults.map((item, index) => {
                    return (
                      item.isToRecharge === "true" &&
                      Array.from({ length: quantity[item.id] || 1 }).map(
                        (_, indexRemoval) => (
                          <div
                            key={`recharged-${item.id}-${indexRemoval}`}
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
                                value={barCode || null}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].itemsRemoval[${indexRemoval}].barCode`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={
                                  errors?.productInOrder?.[index]
                                    ?.itemsRemoval?.[indexRemoval]?.barCode
                                    ?.message || ""
                                }
                              />
                              <span className="flex items-center">
                                <div
                                  className="mt-2 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur"
                                  onClick={() => setOpenScannerModal(true)}
                                >
                                  <img
                                    src={barCodeIcon}
                                    alt=""
                                    className="h-5 w-5"
                                  />
                                </div>
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                label={"Matrícula"}
                                placeholder={"X234234"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].itemsRemoval[${indexRemoval}].enrollment`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={
                                  errors?.productInOrder?.[index]
                                    ?.itemsRemoval?.[indexRemoval]?.enrollment
                                    ?.message || ""
                                }
                              />
                              <Input
                                label={"N° UNIT de fábrica"}
                                placeholder={"123455"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].itemsRemoval[${index}].fabricUNIT`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={
                                  errors?.productInOrder?.[index]
                                    ?.itemsRemoval?.[indexRemoval]?.fabricUNIT
                                    ?.message || ""
                                }
                              />
                            </div>
                            <div className="flex w-full space-x-2">
                              <div className="w-full">
                                <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                                  Fecha última carga
                                </span>

                                <Calendar
                                  forward={false}
                                  control={control}
                                  errors={errors}
                                  name={`productInOrder[${index}].itemsRemoval[${indexRemoval}].lastDate`}
                                />
                              </div>
                              <Input
                                label={"N° UNIT actual"}
                                placeholder={"123455"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].itemsRemoval[${indexRemoval}].numberUNIT`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={
                                  errors?.productInOrder?.[index]
                                    ?.itemsRemoval?.[indexRemoval]?.numberUNIT
                                    ?.message || ""
                                }
                              />
                            </div>
                          </div>
                        ),
                      )
                    );
                  })}
                </div>
              )}
            </div>

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
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                    Forma de pago
                  </span>
                  <Select
                    placeholder="Seleccionar forma de pago"
                    className="rounded-lg border font-roboto font-medium"
                    defaultSelectedKeys={["Efectivo"]}
                    {...register("paymentType", {
                      required: "Este campo es obligatorio",
                    })}
                    onSelectionChange={handleSelectionPaymentChange}
                  >
                    <SelectItem key={"Efectivo"} value={"Efectivo"}>
                      Efectivo
                    </SelectItem>
                    <SelectItem key={"Cheque"} value={"Cheque"}>
                      Cheque
                    </SelectItem>
                    <SelectItem key={"Crédito"} value={"Crédito"}>
                      Crédito
                    </SelectItem>
                  </Select>
                  {errors.paymentType && (
                    <span className="text-xs text-red_e">
                      {errors.paymentType.message}
                    </span>
                  )}
                </div>
                {selectedPayment === "Efectivo" ||
                selectedPayment === "Crédito" ? null : (
                  <div className="flex w-1/2 flex-col space-y-2">
                    <div className="mt-[0.05rem]">
                      <Input
                        type="number"
                        label={"Cant."}
                        placeholder={"Cant."}
                        bg="bg-white"
                        {...register("checkQuantity", {
                          required: "Este campo es obligatorio",
                        })}
                        msjError={
                          errors.checkQuantity
                            ? errors.checkQuantity.message
                            : ""
                        }
                      />
                    </div>

                    {Array.from({ length: numChecks }, (_, index) => (
                      <div key={index} className="flex w-full space-x-2">
                        <div className="mt-[.06rem] w-full">
                          <Input
                            label={`Nro de cheque`}
                            placeholder={"..."}
                            {...register(`checkNumber${index + 1}`, {
                              required: "Este campo es obligatorio",
                            })}
                            msjError={
                              errors[`checkNumber${index + 1}`]
                                ? errors[`checkNumber${index + 1}`].message
                                : ""
                            }
                          />
                        </div>

                        <div className="mt-[.06rem] w-full">
                          <Input
                            type="number"
                            label={`Valor `}
                            placeholder={"$"}
                            {...register(`value${index + 1}`, {
                              required: "Este campo es obligatorio",
                            })}
                            msjError={
                              errors[`value${index + 1}`]
                                ? errors[`value${index + 1}`].message
                                : ""
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Input
                label={"Compra autorizada por:"}
                placeholder={"Nombre"}
                {...register("clientAuthorize", {
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
                msjError={
                  errors.clientAuthorize ? errors.clientAuthorize.message : ""
                }
              />

              <div>
                <Checkbox
                  radius="full"
                  className="font-light"
                  size="sm"
                  {...register("delivered")}
                  isSelected={deliveredValue}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setDeliveredValue(checked);
                  }}
                >
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
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          title="Confirmación"
          variant="confirmation"
          buttons={["accept", "cancel"]}
          onAccept={handleConfirmSaveClick}
        >
          Los datos de la orden no se podrán modificar. ¿Continuar?
        </ReusableModal>
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="ORDEN GENERADA"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={closeSaveConfirmationModal}
        >
          <div className="flex h-[16rem] flex-col items-center">
            <img src={checkIcon} alt="checkIcon" />
            {deliveredValue ? (
              <p>
                La orden fue creada exitosamente y se encuentra en órdenes como
                <strong> Entregada</strong>.
              </p>
            ) : (
              <p>
                La orden fue creada exitosamente y se encuentra en taller como
                <strong> Ingreso a taller</strong>.
              </p>
            )}
          </div>
        </ReusableModal>
        <ReusableModal
          isOpen={openScannerModal}
          onClose={closeModal}
          title="Código de barras"
          handleCancelClick={closeModal}
        >
          <p className="text-sm leading-[1rem] text-black_m">
            Escanea el código de barras del producto para localizar la orden de
            compra donde se encuentra, o ingresa el código de manera manual.
          </p>
          <div className="px-2">
            <BarcodeReader
              onBarcodeChange={(code) => {
                setBarCode(code);
              }}
              closeModal={closeModal}
            />
          </div>
        </ReusableModal>
      </div>
    </div>
  );
};
export default NewSalePage;
