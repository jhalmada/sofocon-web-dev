import { Select, SelectItem } from "@nextui-org/react";
import StatusCard from "../components/cards/StatusCard";
import useOrders from "../hooks/orders/useOrders";
import { useEffect } from "react";

const StatusPanelPage = () => {
  const { ordersResponse, getAllOrders, setEntryDate, setPage } = useOrders();

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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };
  const countOrdersByStatus = (status) => {
    return ordersResponse.filter(
      (order) =>
        order.status === status || order.status === translateStatus(status),
    ).length;
  };
  const translateStatus = (status) => {
    const statusTranslations = {
      REQUEST: "Solicitado",
      PREPARATION: "En preparación",
      READY_PICKUP: "Para retirar",
      EGRESS: "Egreso",
      DELIVERED: "Entregado",
    };
    return statusTranslations[status] || status;
  };
  const handleMonthChange = (e) => {
    const monthMap = {
      Enero: "01",
      Febrero: "02",
      Marzo: "03",
      Abril: "04",
      Mayo: "05",
      Junio: "06",
      Julio: "07",
      Agosto: "08",
      Septiembre: "09",
      Octubre: "10",
      Noviembre: "11",
      Diciembre: "12",
    };

    const selectedMonth = monthMap[e.target.value] || "";
    setEntryDate(selectedMonth ? `${selectedMonth}` : "");
    setPage(0);
  };

  useEffect(() => {
    getAllOrders({});
  }, [getAllOrders]);

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex items-center gap-2">
          <p className="ml-2 text-black_m">Período</p>
          <Select
            className="w-52 rounded-lg border"
            placeholder="Selecciona un mes"
            onChange={handleMonthChange}
          >
            {monthsOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 grid grid-cols-5 text-center font-semibold">
          <p>Solicitado ({countOrdersByStatus("REQUEST")})</p>
          <p>Preparación ({countOrdersByStatus("PREPARATION")})</p>
          <p>Para retirar ({countOrdersByStatus("READY_PICKUP")})</p>
          <p>Egreso ({countOrdersByStatus("EGRESS")})</p>
          <p>Entregado ({countOrdersByStatus("DELIVERED")})</p>
        </div>
        <div className="grid grid-cols-5">
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
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
                    key={index}
                    clientName={order?.client?.name}
                    orderId={"ID: " + order?.orderId}
                    productsList={
                      order?.productInOrder?.map(
                        (productInOrder) => productInOrder?.product?.name,
                      ) || []
                    }
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                  />
                ))
            )}
          </div>

          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
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
                    key={index}
                    clientName={order?.client?.name}
                    orderId={"ID: " + order?.orderId}
                    productsList={
                      order?.productInOrder?.map(
                        (productInOrder) => productInOrder?.product?.name,
                      ) || []
                    }
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-red_b"
                  />
                ))
            )}
          </div>
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
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
                    key={index}
                    clientName={order?.client?.name}
                    orderId={"ID: " + order?.orderId}
                    productsList={
                      order?.productInOrder?.map(
                        (productInOrder) => productInOrder?.product?.name,
                      ) || []
                    }
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-yellow"
                  />
                ))
            )}
          </div>

          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
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
                    key={index}
                    clientName={order?.client?.name}
                    orderId={"ID: " + order?.orderId}
                    productsList={
                      order?.productInOrder?.map(
                        (productInOrder) => productInOrder?.product?.name,
                      ) || []
                    }
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-blue_b"
                  />
                ))
            )}
          </div>

          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
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
                    key={index}
                    clientName={order?.client?.name}
                    orderId={"ID: " + order?.orderId}
                    productsList={
                      order?.productInOrder?.map(
                        (productInOrder) => productInOrder?.product?.name,
                      ) || []
                    }
                    date={formatDate(order?.sellDate)}
                    sellerName={
                      order?.user?.userInfo?.fullName || "Sin vendedor"
                    }
                    bg="bg-green"
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
