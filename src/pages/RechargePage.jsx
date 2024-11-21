import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import ChevronRightIcon from "../assets/icons/chevron-right.svg";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import usePutOrders from "../hooks/orders/usePutOrders";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
const RechargePage = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [mnsError, setMnsError] = useState("");
  const { changedOrder, isLoading } = usePutOrders();
  const { id } = useParams();
  const { getOneOrder, setModified } = useGetOneOrder(id);

  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(orderDetails?.status);

  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };
  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Para retirar",
    "Egreso",
  ];
  const translateState = (state) => {
    switch (state) {
      case "REQUEST":
        return "Solicitado";
      case "PREPARATION":
        return "En preparación";
      case "READY_PICKUP":
        return "Para retirar";
      case "EGRESS":
        return "Egreso";
      case "DELIVERED":
        return "Entregado";
      default:
        return state;
    }
  };
  const translateProductState = (state) => {
    switch (state) {
      case "PENDING":
        return "Pendiente";
      case "ENABLED":
        return "Habilitado";
      case "DISABLED":
        return "Inhabilitado";

      default:
        return state;
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${month}/${year}`;
  };

  const onSubmit = () => {
    navigate("/inicio/taller");
  };

  const handleStateChange = async (e) => {
    const translateState = (state) => {
      switch (state) {
        case "Solicitado":
          return "REQUEST";
        case "En preparación":
          return "PREPARATION";
        case "Para retirar":
          return "READY_PICKUP";
        case "Egreso":
          return "EGRESS";
        case "Entregado":
          return "DELIVERED";
        default:
          return state;
      }
    };
    const newStatus = translateState(e.target.value);
    setSelectedState(newStatus);
    await changedOrder({ status: newStatus }, orderDetails.id, setModified);
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
  useEffect(() => {
    oneOrder(id);
  }, [id]);
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
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
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              {orderDetails?.orderId}
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
              label="Seleccionar estado"
              labelPlacement="outside"
              placeholder={translateState(orderDetails?.status)}
              value={translateState(stateOptions)}
              onChange={handleStateChange}
              disabled={isLoading}
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
                label={"ID de orden"}
                placeholder={orderDetails?.orderId}
                disabled
              />
              <span className="w-full"></span>
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Empresa"}
                placeholder={orderDetails?.client?.name}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"R.U.T./CI"}
                placeholder={orderDetails?.client?.rut}
                disabled
              />
            </div>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Fecha de venta"}
                placeholder={formatDate(orderDetails?.sellDate)}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Vendedor"}
                placeholder={orderDetails?.user?.userInfo?.fullName}
                disabled
              />
            </div>
            <label className="block text-sm font-semibold text-black_b">
              Detalle
            </label>
            <label className="-mb-6 block text-sm">Recarga</label>

            {orderDetails?.productInOrder?.map((order) => (
              <div className="flex" key={order.id}>
                <div className="flex w-1/2 space-x-2">
                  <div className="mt-6 w-full">
                    <Input
                      bg="bg-gray"
                      placeholderColor="placeholder-black_b"
                      border="none"
                      placeholder={order.product?.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex w-1/2 flex-col space-y-4 pl-2">
                  {order.itemsRemoval?.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Input
                        bg="bg-gray"
                        placeholderColor="placeholder-black_b"
                        border="none"
                        label={"Matrícula"}
                        placeholder={item.enrollment}
                        disabled
                      />
                      <Input
                        bg="bg-gray"
                        placeholderColor="placeholder-black_b"
                        border="none"
                        label={"Cód."}
                        placeholder={item.barCode}
                        disabled
                      />
                      <div className="mt-3 flex items-center space-x-2">
                        <span
                          className={`flex h-[2.3rem] w-[7.5rem] items-center justify-center rounded-lg px-1 ${
                            item.status === ""
                              ? "bg-gray text-black_b"
                              : item.status === "Inhabilitado"
                                ? "bg-red_e text-white"
                                : item.status === "Habilitado"
                                  ? "bg-green text-white"
                                  : "text-white"
                          }`}
                        >
                          {item.status === ""
                            ? "Pendiente"
                            : translateProductState(item.status)}
                        </span>
                        <Link
                          to={`/inicio/taller/datos-recarga/${item.id}?orderId=${orderDetails.orderId}&id=${orderDetails.id}`}
                        >
                          <Button
                            width="w-[7.5rem] 2xl:w-[12rem]"
                            text="Ensayo"
                            icon={ChevronRightIcon}
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {orderDetails?.productInOrder?.map((order) => (
              <div className="flex w-1/2 space-x-2" key={order.id}>
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Producto"}
                  placeholder={order.product?.name}
                  disabled
                />
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Cantidad"}
                  placeholder={order.amount}
                  disabled
                />
              </div>
            ))}
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
