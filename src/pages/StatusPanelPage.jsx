import StatusCard from "../components/cards/StatusCard";
import useOrders from "../hooks/orders/useOrders";
import { useEffect, useState } from "react";
import useUsersSellers from "../hooks/users/useUsersSellers";
import { Controller, useForm } from "react-hook-form";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput";

const StatusPanelPage = () => {
  const [modificador, setModificador] = useState(false);
  const { ordersResponse, ordersAmount, getAllOrders, setUser, isCharged, setIsCharged } = useOrders();
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [sellers, setSellers] = useState("");

  const handleSelectSeller = (selectedSeller) => {
    if (selectedSeller) {
      setUser(selectedSeller.id);
      setModificador((prev) => !prev);
      alert("nueva petición");
    } else {
      setUser(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
  };
  const countOrdersByStatus = (status) => {
    const translatedStatus = translateStatus(status);
    return ordersResponse.filter(
      (order) =>
        (order.status === status && !order.isPreOrder) ||
        (order.status === translatedStatus && !order.isPreOrder),
    ).length;
  };
  const translateStatus = (status) => {
    const statusTranslations = {
      REQUEST: "Ingreso a taller",
      PREPARATION: "En preparación",
      READY_PICKUP: "Para retirar del taller",
      EGRESS: "Egreso",
      DELIVERED: "Entregado",
      "Ingreso a taller": "REQUEST",
      "En preparación": "PREPARATION",
      "Para retirar del taller": "READY_PICKUP",
      Egreso: "EGRESS",
      Entregado: "DELIVERED",
    };
    return statusTranslations[status] || status;
  };

  const translatePaymentStatus = (state) => {
    switch (state) {
      case "CASH":
        return "Efectivo";
      case "CREDIT":
        return "Crédito";
      case "CHECK":
        return "Cheque";
      default:
        return state;
    }
  };

  useEffect(() => {
    getAllOrders({ itemsPerPage: 100, inBoard: true });
  }, [getAllOrders]);

  useEffect(() => {
    setSearchSellers(sellers);
  }, [sellers, setSearchSellers]);

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="flex w-[22rem] items-center gap-2">
            <Controller
              name="user"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <CompleteSearchInput
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
          <div className="flex items-center gap-4">
            <select
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={isCharged}
              onChange={(e) => {
                setIsCharged(e.target.value);
                setModificador((prev) => !prev);
              }}
            >
              <option value="">Todos</option>
              <option value="true">Facturado</option>
              <option value="false">No facturado</option>
            </select>
            <p className="mr-8">Total: ${ordersAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 text-center font-semibold">
          <p>Ingreso a taller ({countOrdersByStatus("REQUEST")})</p>
          <p>En preparación ({countOrdersByStatus("PREPARATION")})</p>
          <p>Para retirar del taller ({countOrdersByStatus("READY_PICKUP")})</p>
          <p>Egreso ({countOrdersByStatus("EGRESS")})</p>
          <p>Entregado ({countOrdersByStatus("DELIVERED")})</p>
        </div>
        <div className="grid grid-cols-5">
          <div className="space-y-6 border-r-2 border-gray px-1 2xl:px-4">
            {ordersResponse.filter(
              (order) =>
                (order.status === "REQUEST" && !order.isPreOrder) ||
                (order.status === "Ingreso a taller" && !order.isPreOrder),
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    (order.status === "REQUEST" && !order.isPreOrder) ||
                    (order.status === "Ingreso a taller" && !order.isPreOrder),
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
                    clientAddress={order?.client?.address}
                    orderId={"ID: " + order?.orderId}
                    productsList={order?.productInOrder || []}
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    discountTotal={order?.discountPercent || 0}
                    paymentType={translatePaymentStatus(order?.paymentType)}
                    charged={order?.isCharged}
                  />
                ))
            )}
          </div>

          <div className="space-y-6 border-r-2 border-gray px-1 2xl:px-4">
            {ordersResponse.filter(
              (order) =>
                order.status === "PREPARATION" ||
                order.status === "En preparación",
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    order.status === "PREPARATION" ||
                    order.status === "En preparación",
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
                    clientAddress={order?.client?.address}
                    orderId={"ID: " + order?.orderId}
                    productsList={order?.productInOrder || []}
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-red_b"
                    discountTotal={order?.discountPercent || 0}
                    paymentType={translatePaymentStatus(order?.paymentType)}
                    charged={order?.isCharged}
                  />
                ))
            )}
          </div>
          <div className="space-y-6 border-r-2 border-gray px-1 2xl:px-4">
            {ordersResponse.filter(
              (order) =>
                order.status === "READY_PICKUP" ||
                order.status === "Para retirar del taller",
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    order.status === "READY_PICKUP" ||
                    order.status === "Para retirar del taller",
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
                    clientAddress={order?.client?.address}
                    orderId={"ID: " + order?.orderId}
                    productsList={order?.productInOrder || []}
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-yellow"
                    discountTotal={order?.discountPercent || 0}
                    paymentType={translatePaymentStatus(order?.paymentType)}
                    charged={order?.isCharged}
                  />
                ))
            )}
          </div>

          <div className="space-y-6 border-r-2 border-gray px-1 2xl:px-4">
            {ordersResponse.filter(
              (order) => order.status === "EGRESS" || order.status === "Egreso",
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    order.status === "EGRESS" || order.status === "Egreso",
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
                    clientAddress={order?.client?.address}
                    orderId={"ID: " + order?.orderId}
                    productsList={order?.productInOrder || []}
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-blue_b"
                    discountTotal={order?.discountPercent || 0}
                    paymentType={translatePaymentStatus(order?.paymentType)}
                    charged={order?.isCharged}
                  />
                ))
            )}
          </div>

          <div className="space-y-6 border-r-2 border-gray px-1 2xl:px-4">
            {ordersResponse.filter(
              (order) =>
                order.status === "DELIVERED" || order.status === "Entregado",
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    order.status === "DELIVERED" ||
                    order.status === "Entregado",
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
                    clientAddress={order?.client?.address}
                    orderId={"ID: " + order?.orderId}
                    productsList={order?.productInOrder || []}
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-green"
                    isToDeliver={true}
                    discountTotal={order?.discountPercent || 0}
                    paymentType={translatePaymentStatus(order?.paymentType)}
                    charged={order?.isCharged}
                    modified={modificador}
                    changeState={() =>
                      getAllOrders({ itemsPerPage: 100, inBoard: true })
                    }
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatusPanelPage;
