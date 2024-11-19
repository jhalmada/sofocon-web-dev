import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import barCodeIcon from "../assets/icons/barCode.svg";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
import { Checkbox } from "@nextui-org/react";
import useAddProducts from "../hooks/products/useAddProducts";
import { div } from "framer-motion/client";
const RechargeDataPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOneOrder, setModified } = useGetOneOrder(id);
  const { postAddProducts } = useAddProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };
  const stateOptions = ["Habilitado", "Inhabilitado"];
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

  const handleDetailsCreation = async (ProductData) => {
    const {
      productInOrder,
      itemsRemoval,
      newUNIT,
      color,
      pressure,
      expansion,
    } = ProductData;
    try {
      const newProductDetails = await postAddProducts({
        productInOrder,
        itemsRemoval,
        newUNIT,
        color,
        pressure,
        expansion,
      });

      if (newProductDetails) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear los detalles de la orden", error);
    }
  };

  const onSubmit = (data) => {
    handleDetailsCreation({
      ...data,
    });
    navigate(`/inicio/taller/recarga/${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate(`/inicio/taller/recarga/${id}`);
  };
  useEffect(() => {
    oneOrder(id);
  }, [id]);
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to={`/inicio/taller/recarga/${id}`}>
            <div className="mb-4 flex items-center text-sm font-medium leading-4">
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
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              {orderDetails?.id}
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-tr-lg bg-white px-14 py-10"
        >
          {console.log(orderDetails?.productInOrder)}
          {orderDetails?.productInOrder?.map((order, index) => (
            <div key={order.id}>
              <Select
                className="mb-4 w-1/6 rounded-lg border"
                label="Estado del extintor"
                labelPlacement="outside"
                placeholder="Estado"
                {...register(
                  `${order[index]}.ItemsRemoval[${index}].removalStatus`,
                )}
                onSelectionChange={(values) =>
                  setValue(
                    `${order[index]}.ItemsRemoval[${index}].removalStatus`,
                    values,
                  )
                }
              >
                {stateOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>

              {isEditable ? (
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <Input
                      label={"Código de barras"}
                      placeholder={order.itemsRemoval?.barCode}
                      {...register(
                        `productInOrder[${index}].ItemsRemoval[${index}].barCode`,
                        {
                          required: "Este campo es obligatorio",
                        },
                      )}
                      msjError={errors.barCode?.message || ""}
                    />
                  </div>
                  <div className="w-1/2">
                    <div className="mt-[1.5rem] flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur">
                      <img src={barCodeIcon} alt="barCodeIcon" />
                    </div>
                  </div>
                </div>
              ) : (
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Código de barras"}
                  placeholder={order.itemsRemoval?.barCode}
                  disabled
                />
              )}
              <Checkbox
                radius="full"
                className="mb-2"
                size="sm"
                isSelected={isEditable}
                onChange={() => setIsEditable(!isEditable)}
              >
                Modificar código de barras
              </Checkbox>
              <div className="flex space-x-2">
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Matrícula"}
                  placeholder={order.itemsRemoval?.enrollment}
                  disabled
                />
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"N° UNIT de fábrica"}
                  placeholder={order.itemsRemoval?.fabricUNIT}
                  disabled
                />
              </div>
              <div className="flex space-x-2">
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Fecha última carga"}
                  placeholder={order.itemsRemoval?.lastDate}
                  disabled
                />
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"N° UNIT anterior"}
                  placeholder={order.itemsRemoval?.numberUNIT}
                  disabled
                />
              </div>
              <div className="w-[49.8%] space-x-2">
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Capacidad (kg/l)"}
                  placeholder={order.itemsRemoval?.capacity}
                  disabled
                />
              </div>
              <div className="flex space-x-2">
                <span className="-mt-2 flex w-full items-center">
                  <div className="flex w-full flex-col">
                    <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                      Fecha ensayo
                    </span>
                    <Select
                      className="rounded-lg border"
                      placeholder="Mes"
                      {...register(
                        `${order[index]}.ItemsRemoval[${index}].testDate`,
                      )}
                      onSelectionChange={(values) =>
                        setValue(
                          `${order[index]}.ItemsRemoval[${index}].testDate`,
                          values,
                        )
                      }
                    >
                      {monthsOptions.map((month) => (
                        <SelectItem key={month}>{month}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </span>
                <Input
                  label={"N° UNIT actual"}
                  placeholder={"Escribir..."}
                  {...register("newUNIT", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "El UNIT actual debe contener al menos 2 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El UNIT actual no puede exceder los 50 caracteres.",
                    },
                  })}
                  msjError={errors.newUNIT ? errors.newUNIT.message : ""}
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex w-1/2 flex-col">
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Tipo"}
                    placeholder={order.product?.type}
                    disabled
                  />
                </div>
                <div className="flex w-1/2 items-center space-x-2">
                  <div className="flex w-full flex-col">
                    <Input
                      label={"Color"}
                      placeholder={"Escribir..."}
                      {...register("color", {
                        required: "Este campo es obligatorio",
                        minLength: {
                          value: 2,
                          message:
                            "El color debe contener al menos 2 caracteres.",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El color no puede exceder los 50 caracteres.",
                        },
                      })}
                      msjError={errors.color ? errors.color.message : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <Input
                  label={"Presión (MPa)"}
                  placeholder={"35"}
                  {...register("pressure", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "La presión debe contener al menos 2 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message: "La presión no puede exceder los 50 caracteres.",
                    },
                  })}
                  msjError={errors.pressure ? errors.pressure.message : ""}
                />

                <Input
                  label={"Expansión (%)"}
                  placeholder={"1,23"}
                  {...register("expansion", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "La expansión debe contener al menos 2 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "La expansión no puede exceder los 50 caracteres.",
                    },
                  })}
                  msjError={errors.expansion ? errors.expansion.message : ""}
                />
              </div>
            </div>
          ))}
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
