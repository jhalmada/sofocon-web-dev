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
import { BASE_URL, SOFOCON_JWT_TOKEN } from "../utils/Constants";
import { getOrderPdf } from "../services/orders/orders.routes";
import ReusableModal from "../components/modals/ReusableModal";

const ClientsOrdersPage = () => {
  const {
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
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempStatus, setTempStatus] = useState(null);

  const accessToken = localStorage.getItem(SOFOCON_JWT_TOKEN);
  const handleDownloadClick = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${getOrderPdf}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("La red respondió incorrectamente");
      }

      const buffer = await response.arrayBuffer();

      // Forzar tipo PDF
      const blob = new Blob([buffer], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);

      // 1. Abrir correctamente en nueva pestaña
      const newTab = window.open();
      if (newTab) {
        newTab.location.href = fileURL;
      }

      // 2. Forzar descarga real
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `order_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // 3. Liberar memoria después
      setTimeout(() => {
        window.URL.revokeObjectURL(fileURL);
      }, 10000);
    } catch (error) {
      console.error("Falló al descargar el archivo:", error);
    }
  };

  const discountPercent = orderDetails?.discountPercent || 0;
  const stateOptions = ["Para retirar del taller", "Entregado"];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${month}/${year}`;
  };

  const translateState = (state) => {
    switch (state) {
      case "REQUEST":
        return "Ingreso a taller";
      case "En preparación":
        return "PREPARATION";
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

  const translatePayMethod = (method) => {
    switch (method) {
      case "CASH":
        return "Efectivo";
      case "CREDIT":
        return "Crédito";
      case "CHECK":
        return "Cheque";

      default:
        return method;
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
        case "Ingreso a taller":
          return "REQUEST";
        case "En preparación":
          return "PREPARATION";
        case "Para retirar del taller": {
          setTempStatus("READY_PICKUP");
          setIsModalOpen(true);
          return null;
        }
        case "Egreso":
          return "EGRESS";
        case "Entregado": {
          setTempStatus("DELIVERED");
          setConfirmationModalOpen(true);
          return null;
        }
        default:
          return state;
      }
    };

    const newStatus = translateState(e.target.value);
    if (newStatus) {
      await updateOrderState(newStatus);
    }
  };

  const updateOrderState = async (status) => {
    setSelectedState(status);
    const updatedData = { status };
    if (status === "READY_PICKUP") {
      updatedData.workShopDateEntry = new Date();
    }
    await changedOrder({ status }, orderDetails.id);
    if (tempStatus) {
      setTempStatus(null);
      navigate("/inicio/ordenes");
    }
  };

  const handleConfirm = () => {
    updateOrderState(tempStatus);
    setConfirmationModalOpen(false);
  };
  const handleConfirmState = async () => {
    updateOrderState(tempStatus);

    setIsModalOpen(false);
  };

  const handleClose = () => {
    setSelectedState(orderDetails?.status);
    setTempStatus(null);
    setConfirmationModalOpen(false);
    setIsModalOpen(false);
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
          {orderDetails?.orderId || "sin id"}
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
              placeholder={
                !selectedState
                  ? translateState(orderDetails?.status)
                  : translateState(selectedState)
              }
              selectedKeys={selectedState ? [selectedState] : []}
              onChange={handleStateChange}
              disabled={isLoading}
            >
              {stateOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>

            <ReusableModal
              isOpen={isModalOpen}
              onClose={handleClose}
              title="Cambio de estado"
              onAccept={handleConfirmState}
              variant="confirmation"
              buttons={["accept"]}
            >
              La orden fue movida a taller
            </ReusableModal>
            <ReusableModal
              isOpen={confirmationModalOpen}
              onClose={handleClose}
              title="Confirmación de orden"
              onAccept={handleConfirm}
              variant="confirmation"
              buttons={["back", "accept"]}
            >
              ¿Estás seguro/a que deseas marcar como Entregado?
            </ReusableModal>

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                border="none"
                label={"ID de orden"}
                placeholder={orderDetails?.orderId}
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
              <div className="flex w-full flex-col" key={order.id}>
                <div className="flex space-x-2">
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
                      value={"$" + (order.fixedPrice || "precio")}
                      disabled
                    />
                    <Input
                      type="number"
                      label="Desc."
                      placeholder="%"
                      value={(order.discountPercent || 0) + "%"}
                      bg="bg-gray"
                      placeholderColor="placeholder-black_b"
                      border="none"
                      disabled
                    />
                    <div className="w-full">
                      <Input
                        type="number"
                        label="Recarga"
                        placeholder={
                          order?.product?.isToRecharge === "true" ? "Si" : "No"
                        }
                        bg="bg-gray"
                        placeholderColor="placeholder-black_b"
                        border="none"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col 2xl:items-end">
                  {order.itemsRemoval?.map((item, index) => (
                    <div
                      key={index}
                      className="grid w-full grid-cols-5 gap-4 2xl:w-1/2"
                    >
                      <div className="w-full">
                        <span className="text-sm font-semibold text-black_b">
                          Cód.
                        </span>
                        <p className="text-black_b">
                          {item.barCode || "sin datos"}
                        </p>
                      </div>
                      <div className="w-full">
                        <span className="text-sm font-semibold text-black_b">
                          Matrícula
                        </span>
                        <p className="text-black_b">
                          {item.enrollment || "sin datos"}
                        </p>
                      </div>
                      <div className="w-full">
                        <span className="text-sm font-semibold text-black_b">
                          N° UNIT de fábrica
                        </span>
                        <p className="text-black_b">
                          {item.fabricUNIT || "sin datos"}
                        </p>
                      </div>
                      <div className="w-full">
                        <span className="text-sm font-semibold text-black_b">
                          N° UNIT actual
                        </span>
                        <p className="text-black_b">
                          {item.newUNIT || "sin datos"}
                        </p>
                      </div>
                      <div className="w-full">
                        <span className="text-sm font-semibold text-black_b">
                          Fecha última carga
                        </span>
                        <p className="text-black_b">
                          {formatDate(item.lastDate) || "sin datos"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subtotal"}
                placeholder={"$" + subTotal}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"IVA 22%"}
                placeholder={"$" + iva}
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
              placeholder={"$" + total}
              disabled
            />

            <div className="w-1/2">
              <Input
                bg="bg-gray"
                border="none"
                label={"Forma de pago"}
                placeholder={translatePayMethod(orderDetails?.paymentType)}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Compra autorizada por:"}
                placeholder={orderDetails?.clientAuthorize}
                placeholderColor="placeholder-black_b"
                disabled
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-end">
            <Button
              text={"DESCARGAR"}
              color={"save"}
              icon={DownloadIcon}
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadClick();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ClientsOrdersPage;
