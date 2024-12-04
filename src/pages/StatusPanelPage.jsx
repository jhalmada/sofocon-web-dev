import StatusCard from "../components/cards/StatusCard";
import useOrders from "../hooks/orders/useOrders";
import { useEffect } from "react";
import useUsersSellers from "../hooks/users/useUsersSellers";
import { Controller, useForm } from "react-hook-form";
import CompleteSearchInput from "../components/Searchs/CompleteSearchInput";

const StatusPanelPage = () => {
  const { ordersResponse, getAllOrders, setUser } = useOrders();
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSelectSeller = (selectedSeller) => {
    if (selectedSeller) {
      setUser(selectedSeller);
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
      (order) => order.status === status || order.status === translatedStatus,
    ).length;
  };
  const translateStatus = (status) => {
    const statusTranslations = {
      REQUEST: "Solicitado",
      PREPARATION: "En preparación",
      READY_PICKUP: "Para retirar",
      EGRESS: "Egreso",
      DELIVERED: "Entregado",
      Solicitado: "REQUEST",
      "En preparación": "PREPARATION",
      "Para retirar": "READY_PICKUP",
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
    getAllOrders({});
  }, [getAllOrders]);

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
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
                placeholder="Buscar vendedores"
                {...field}
              />
            )}
          />
          {errors.user && (
            <p className="text-xs text-red_e">{errors.user.message}</p>
          )}
        </div>
        <div className="mt-4 grid grid-cols-5 text-center font-semibold">
          <p>Solicitado ({countOrdersByStatus("REQUEST")})</p>
          <p>Preparación ({countOrdersByStatus("PREPARATION")})</p>
          <p>Para retirar ({countOrdersByStatus("READY_PICKUP")})</p>
          <p>Egreso ({countOrdersByStatus("EGRESS")})</p>
          <p>Entregado ({countOrdersByStatus("DELIVERED")})</p>
        </div>
        <div className="grid grid-cols-5">
          <div className="space-y-6 border-r-2 border-gray px-1 2xl:px-4">
            {ordersResponse.filter(
              (order) =>
                order.status === "REQUEST" || order.status === "Solicitado",
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    order.status === "REQUEST" || order.status === "Solicitado",
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
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
                order.status === "Para retirar",
            ).length === 0 ? (
              <p className="mt-28 flex justify-center text-md font-semibold">
                Sin resultados
              </p>
            ) : (
              ordersResponse
                .filter(
                  (order) =>
                    order.status === "READY_PICKUP" ||
                    order.status === "Para retirar",
                )
                .map((order, index) => (
                  <StatusCard
                    id={order.id}
                    key={index}
                    clientName={order?.client?.name}
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
