import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ChevronRightIcon from "../assets/icons/chevron-right.svg";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import usePutOrders from "../hooks/orders/usePutOrders";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
import useUsersSellers from "../hooks/users/useUsersSellers";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput";
import Calendar from "../components/calendar/Calendar";

const RechargePage = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mnsError, setMnsError] = useState("");
  const { changedOrder, isLoading } = usePutOrders();
  const { getOneOrder, setModified } = useGetOneOrder(id);
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();

  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(orderDetails?.status);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [seller, setSeller] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setIsSaveConfirmationModalOpen] =
    useState(false);
  const [confirmStatus, setConfirmStatus] = useState(false);

  const [newStatus, setNewStatus] = useState(null);

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
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${month}/${year}`;
  };

  const onSubmit = async (data) => {
    const newdata = new Date(
      data.dateV?.year || 1,
      data.dateV?.month - 1 || 1,
      data.dateV?.day || 1,
    );
    const formattedDate = newdata.toISOString();

    if (newStatus === "EGRESS") {
      await changedOrder(
        {
          status: newStatus,
          user: data.user,
          sellDate: formattedDate ? formattedDate : null,
          workShopDateDeparture: new Date().toISOString(),
        },
        orderDetails.id,
        setModified,
      );
    } else {
      await changedOrder({ status: newStatus }, orderDetails.id, setModified);
    }
  };
  const onSubmitWithValidation = (data) => {
    if (Object.keys(errors).length === 0 || Object.keys(errors).length === 1) {
      setConfirmStatus(true);
      handleCloseModal();
      onSubmit(data);
    }
    setConfirmStatus(true);
  };
  const translateStateToEnglish = (state) => {
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

  const handleState = async (e) => {
    const newStatus = translateStateToEnglish(e.target.value);
    setSelectedState(newStatus);
    const currentDate = new Date().toISOString();
    const updatedOrderData = { status: newStatus };

    if (newStatus === "EGRESS") {
      updatedOrderData.workShopDateEntry = currentDate;
      setIsConfirmModal(true);
      setNewStatus("EGRESS");
    } else {
      setNewStatus(newStatus);
    }
  };

  const handleCloseModal = () => {
    setConfirmStatus(false);
    setIsConfirmModal(false);
    setIsModalOpen(false);
    navigate("/inicio/taller");
  };
  const handleSelectSeller = (selectedSeller) => {
    if (selectedSeller) {
      setSeller(selectedSeller);
    } else {
      setSeller(null);
    }
  };
  const closeSaveConfirmationModal = () => {
    setIsSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate("/inicio/taller");
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
              onChange={handleState}
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
            {/* <label className="-mb-6 block text-sm">Recargas</label> */}

            {orderDetails?.productInOrder?.map((order) => (
              <div className="flex" key={order.id}>
                <div className="flex w-[49.8%] space-x-2">
                  <div className="w-full">
                    <Input
                      bg="bg-gray"
                      placeholderColor="placeholder-black_b"
                      border="none"
                      placeholder={order.product?.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="-mt-6 flex w-1/2 flex-col space-y-4 pl-2">
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
                            item.status === "" || item.status === "PENDING"
                              ? "bg-gray text-black_b"
                              : item.status === "Inhabilitado"
                                ? "bg-red_e text-white"
                                : item.status === "Habilitado"
                                  ? "bg-green text-white"
                                  : "text-white"
                          }`}
                        >
                          {item.status === "" || item.status === "PENDING"
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
        </form>
        <ReusableModal
          isOpen={confirmStatus}
          onClose={handleCloseModal}
          title="Cambio de estado"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleCloseModal}
        >
          La orden fue movida a órdenes.
        </ReusableModal>
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
        <ReusableModal
          isOpen={isConfirmModal}
          onClose={handleCloseModal}
          title="Egreso de orden"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleSubmit(onSubmitWithValidation)}
        >
          <div>
            <span className="text-sm font-light leading-[1rem] text-black_b">
              Fecha de egreso
            </span>
            <Calendar control={control} errors={errors} name="dateV" />
          </div>
          <div className="-mt-[.08rem]">
            <Controller
              name="user"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <CompleteSearchInput
                  label={"Vendedores"}
                  array={transformData(userSellerResponse?.result || []) || []}
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
        </ReusableModal>
      </div>
    </div>
  );
};
export default RechargePage;
