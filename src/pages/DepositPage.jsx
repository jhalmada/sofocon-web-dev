import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
import usePutOrders from "../hooks/orders/usePutOrders";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput";
import useUsersSellers from "../hooks/users/useUsersSellers";
import Calendar from "../components/calendar/Calendar";
import SaveImg from "../assets/img/save.png";
const DepositPage = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { changedOrder, isLoading } = usePutOrders();
  const { id } = useParams();
  const { getOneOrder, setModified } = useGetOneOrder(id);
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setIsSaveConfirmationModalOpen] =
    useState(false);
  const [mnsError, setMnsError] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(orderDetails?.status);
  const [newStatus, setNewStatus] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [seller, setSeller] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [sellers, setSellers] = useState("");

  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };
  const stateOptions = [
    "Ingreso a taller",
    "En preparación",
    "Para retirar del taller",
    "Egreso",
  ];
  const translateState = (state) => {
    switch (state) {
      case "REQUEST":
        return "Ingreso a taller";
      case "PREPARATION":
        return "En preparación";
      case "READY_PICKUP":
        return "Para retirar del taller";
      case "EGRESS":
        return "Egreso";
      case "DELIVERED":
        return "Entregado";
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
  };
  const handleSelectSeller = (selectedSeller) => {
    if (selectedSeller) {
      setSeller(selectedSeller);
    } else {
      setSeller(null);
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
      await changedOrder({ status: newStatus }, orderDetails.id, setModified);
    }
  };
  const translateStateToEnglish = (state) => {
    switch (state) {
      case "Ingreso a taller":
        return "REQUEST";
      case "En preparación":
        return "PREPARATION";
      case "Para retirar del taller":
        return "READY_PICKUP";
      case "Egreso":
        return "EGRESS";
      case "Entregado":
        return "DELIVERED";
      default:
        return state;
    }
  };
  const handleCloseModal = () => {
    setConfirmStatus(false);
    setIsConfirmModal(false);
    setIsModalOpen(false);
    navigate("/inicio/taller");
  };
  const closeSaveConfirmationModal = () => {
    setIsSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate("/inicio/taller");
  };
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
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
          Depósito
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
            {orderDetails?.productInOrder?.map((order) => (
              <div className="flex space-x-2" key={order.id}>
                <div className="w-1/2">
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Producto"}
                    placeholder={order.product?.name}
                    disabled
                  />
                </div>
                <div>
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Cantidad"}
                    placeholder={order.amount}
                    disabled
                  />
                </div>
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
          isOpen={isConfirmModal}
          onClose={handleCloseModal}
          title="Egreso de orden"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleSubmit(onSubmitWithValidation)}
        >
          <div>
            <span className="font-roboto text-sm leading-[1rem] text-black_b">
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
                  name={"user.name"}
                  setValue={setValue}
                  onChange={setSearchSellers}
                  onSelect={handleSelectSeller}
                  sellers={setSellers}
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
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          <div className="flex h-[14rem] flex-col items-center justify-center">
            <img src={SaveImg} alt="save" />
            <p className="font-roboto text-sm font-light text-black">
              Los cambios fueron guardados correctamente.
            </p>
          </div>
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
export default DepositPage;
