import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import DownloadIcon from "../assets/icons/download-white.svg";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
import usePutOrders from "../hooks/orders/usePutOrders";
import { BASE_URL } from "../utils/Constants";
import { getOrderPdf } from "../services/orders/orders.routes";

const ClientsOrdersPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOneOrder, setModified } = useGetOneOrder(id);
  const { changedOrder, isLoading } = usePutOrders();

  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(orderDetails?.status);
  const [subTotal, setSubTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const discountPercent = orderDetails?.discountPercent || 0;

  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Para retirar",
    "Egreso",
  ];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

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
      default:
        return state;
    }
  };
  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };

  useEffect(() => {
    oneOrder(id);
  }, [id]);

  useEffect(() => {
    let newSubTotal = 0;
    orderDetails?.productInOrder?.forEach((order) => {
      const price = order.fixedPrice || 0;
      const amount = order.amount || 1;
      const productDiscount = (price * (order.discountPercent || 0)) / 100;
      const discountedPrice = price - productDiscount;

      newSubTotal += discountedPrice * amount;
    });

    const newIva = newSubTotal * 0.22;
    const discountAmount = (newSubTotal + newIva) * (discountPercent / 100);
    const newTotal = newSubTotal + newIva - discountAmount;

    setSubTotal(newSubTotal.toFixed(2));
    setIva(newIva.toFixed(2));
    setTotal(newTotal.toFixed(2));
    setDiscount(discountAmount.toFixed(2));
  }, [orderDetails, discountPercent]);

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
        default:
          return state;
      }
    };
    const newStatus = translateState(e.target.value);
    setSelectedState(newStatus);
    await changedOrder({ status: newStatus }, orderDetails.id, setModified);
  };

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
          {orderDetails?.id || "sin id"}
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Detalle
            </span>
          </div>
        </div>
        <form className="flex flex-grow flex-col justify-between rounded-tr-lg bg-white px-14 py-10">
          <div>
            <Select
              className="mb-4 w-1/6 rounded-lg border"
              label="Estado"
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
                border="none"
                label={"ID de órden"}
                placeholder={orderDetails?.id}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Empresa"}
                placeholder={orderDetails?.client?.name}
                placeholderColor="placeholder-black_b"
                disabled
              />
            </div>
            <Input
              bg="bg-gray"
              border="none"
              label={"R.U.T./CI"}
              placeholder={orderDetails?.client?.rut || "sin rut"}
              placeholderColor="placeholder-black_b"
              disabled
            />
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
            {orderDetails?.productInOrder?.map((order) => (
              <div className="flex w-full space-x-2" key={order.id}>
                <div className="w-1/2">
                  <span className="mt-[1.50rem] flex h-10 w-full items-center justify-between rounded-lg bg-gray p-2">
                    {order.product?.name || "nombre del producto"}
                  </span>
                </div>

                <div className="flex w-1/2 space-x-2">
                  <Input
                    type="number"
                    label="Cantidad"
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    disabled
                    defaultValue={order.amount || 1}
                    minValue={1}
                    placeholder="Cant."
                  />
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label="Precio"
                    value={order.fixedPrice || "precio"}
                    disabled
                  />
                  <Input
                    type="number"
                    label="Desc."
                    placeholder="%"
                    value={order.discountPercent + "%"}
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    disabled
                  />
                  <div className="w-full">
                    <Input
                      type="number"
                      label="Recarga"
                      placeholder={order.isRechargue ? "Si" : "No"}
                      bg="bg-gray"
                      placeholderColor="placeholder-black_b"
                      border="none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subtotal"}
                placeholder={subTotal}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"IVA 22%"}
                placeholder={iva}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Desc."}
                placeholder={orderDetails?.discountPercent + "%"}
                disabled
              />
            </div>
            <Input
              bg="bg-gray"
              placeholderColor="placeholder-black_b"
              fontWeight="font-bold"
              border="none"
              label={"TOTAL"}
              placeholder={total}
              disabled
            />

            <div className="w-1/2">
              <Input
                bg="bg-gray"
                border="none"
                label={"Forma de pago"}
                placeholder={orderDetails?.paymentType}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Compra autorizada por:"}
                placeholder={orderDetails?.user?.userInfo?.fullName}
                placeholderColor="placeholder-black_b"
                disabled
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-end">
            <a
              href={`${BASE_URL}/${getOrderPdf}/${id}`}
              download
              target="_blank"
            >
              <Button text={"DESCARGAR"} color={"save"} icon={DownloadIcon} />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ClientsOrdersPage;
