import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import React, { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import barCodeIcon from "../assets/icons/barcode.svg";
import { Checkbox } from "@nextui-org/react";
import useGetRemovalItem from "../hooks/orders/useGetRemovalItem";
import usePatchRemovalItem from "../hooks/orders/usePatchRemovalItem";
import Calendar from "../components/calendar/Calendar";
import BarcodeReader from "../components/scan/BarcodeReader";
import useOrders from "../hooks/orders/useOrders";
import SaveImg from "../assets/img/save.svg";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const RechargeDataPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  let query = useQuery();

  const { getOneItemRemoval } = useGetRemovalItem(id);
  const { patchOneItem } = usePatchRemovalItem(id);
  const { barCode, setBarCode } = useOrders();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [openScannerModal, setOpenScannerModal] = useState(false);

  const oneItem = async (id) => {
    const newdatos = await getOneItemRemoval(id);

    setItemDetails(newdatos);
  };
  const stateOptions = ["Habilitado", "Inhabilitado"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${month}/${year}`;
  };

  const handleDetailsCreation = async (itemData) => {
    const { testDate, pressure, expansion, color, newUNIT } = itemData;
    try {
      const newItemsDetails = await patchOneItem({
        ...itemData,
        testDate: testDate
          ? new Date(
              testDate.year,
              testDate.month - 1,
              testDate.day,
            ).toISOString()
          : null,
        pressure,
        expansion,
        color,
        newUNIT,
      });

      if (newItemsDetails) {
        navigate(`/inicio/taller/recarga/${query.get("id")}`);
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOpenScannerModal(false);
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate(`/inicio/taller/recarga/${query.get("id")}`);
  };
  useEffect(() => {
    oneItem(id);
  }, [id]);

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to={`/inicio/taller/recarga/${query.get("id")}`}>
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

        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              {query.get("orderId") || "sin id"}
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-tr-lg bg-white px-14 py-10"
        >
          <div>
            <Select
              className="mb-8 w-1/6 rounded-lg border"
              label="Estado del extintor"
              labelPlacement="outside"
              placeholder={
                itemDetails?.status === "PENDING" || !itemDetails?.status === ""
                  ? "Pendiente"
                  : itemDetails?.status
              }
              defaultSelectedKeys={[itemDetails?.status]}
              {...register("status", {})}
              onSelectionChange={(values) => {
                setValue(`status`, values.anchorKey);
              }}
            >
              {stateOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
            <p className="-mt-4 font-roboto text-xs text-red_e">
              {errors.status ? errors.status.message : ""}
            </p>

            {isEditable ? (
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <Input
                    label={"Código de barras"}
                    placeholder={itemDetails?.barCode}
                    value={barCode || null}
                    {...register(`barCode`, {
                      required: "Este campo es obligatorio",
                    })}
                    msjError={errors.barCode?.message || ""}
                  />
                </div>
                <div className="w-1/2">
                  <div
                    className="mt-[1.5rem] flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur"
                    onClick={() => setOpenScannerModal(true)}
                  >
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
                placeholder={itemDetails?.barCode || "sin codigo"}
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
                placeholder={itemDetails?.enrollment}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"N° UNIT de fábrica"}
                placeholder={itemDetails?.fabricUNIT}
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Fecha última carga"}
                placeholder={formatDate(itemDetails?.lastDate)}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"N° UNIT anterior"}
                placeholder={itemDetails?.numberUNIT}
                disabled
              />
            </div>
            <div className="w-[49.8%] space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Capacidad (Kg/l)"}
                placeholder={
                  itemDetails?.productInOrder?.product?.amount || "sin dato"
                }
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <span className="-mt-2 flex w-full items-center">
                <div className="flex w-full flex-col">
                  <span className="mb-1 text-sm font-light leading-[1rem] text-black_b">
                    Fecha ensayo
                  </span>
                  <Calendar
                    control={control}
                    errors={errors}
                    forward={false}
                    name="testDate"
                  />
                </div>
              </span>
              <Input
                label={"N° UNIT actual"}
                placeholder={itemDetails?.newUNIT || "Escribir..."}
                defaultSelectedKeys={itemDetails?.newUNIT}
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
                  placeholder={
                    itemDetails?.productInOrder?.product?.type || "sin dato"
                  }
                  disabled
                />
              </div>
              <div className="flex w-1/2 items-center space-x-2">
                <div className="flex w-full flex-col">
                  <Input
                    type="text"
                    label={"Color"}
                    placeholder={itemDetails?.color || "Escribir..."}
                    defaultSelectedKeys={itemDetails?.color}
                    {...register(`color`, {
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 2,
                        message:
                          "El color debe contener al menos 2 caracteres.",
                      },
                      maxLength: {
                        value: 50,
                        message: "El color no puede exceder los 50 caracteres.",
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
                placeholder={itemDetails?.pressure || "Escribir..."}
                defaultSelectedKeys={itemDetails?.pressure}
                {...register("pressure", {
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 2,
                    message: "La presión debe contener al menos 2 caracteres.",
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
                placeholder={itemDetails?.expansion || "Escribir..."}
                defaultSelectedKeys={itemDetails?.expansion}
                {...register("expansion", {
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 2,
                    message:
                      "La expansión debe contener al menos 2 caracteres.",
                  },
                  maxLength: {
                    value: 50,
                    message: "La expansión no puede exceder los 50 caracteres.",
                  },
                  pattern: {
                    value: /^[0-9]+([,][0-9]+)?$/,
                    message:
                      "Por favor ingrese un número válido (por ejemplo, 10 o 10,5).",
                  },
                })}
                msjError={errors.expansion ? errors.expansion.message : ""}
              />
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
          isOpen={openScannerModal}
          onClose={closeModal}
          title="Código de barras"
          handleCancelClick={closeModal}
        >
          <p className="text-sm leading-[1rem] text-black_m">
            Escanea el código de barras del producto para localizar la orden de
            compra donde se encuentra, o ingresa el código de manera manual.
          </p>
          <form className="space-y-4">
            <div className="px-2">
              <BarcodeReader onBarcodeChange={setBarCode} />
            </div>
          </form>
        </ReusableModal>
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          <div className="flex h-[16rem] flex-col items-center justify-center">
            <img src={SaveImg} alt="save" />
            <p className="font-roboto text-sm font-light text-black">
              Los cambios fueron guardados correctamente.
            </p>
          </div>
        </ReusableModal>
      </div>
    </div>
  );
};
export default RechargeDataPage;
