import { Select, SelectItem } from "@nextui-org/react";
import StatusCard from "../components/cards/StatusCard";
const StatusPanelPage = () => {
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

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex items-center gap-2">
          <p className="ml-2 text-black_m">Período</p>
          <Select
            className="w-52 rounded-lg border"
            placeholder="OCTUBRE 2024 "
          >
            {monthsOptions.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-4 grid grid-cols-5 text-center font-semibold">
          <p>Solicitado (+99)</p>
          <p>Preparación (2)</p>
          <p>Para retirar (47)</p>
          <p>Egreso (2)</p>
          <p>Entregado (+99)</p>
        </div>
        <div className="grid grid-cols-5">
          {/* Solicitado */}
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
            <StatusCard
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
            <StatusCard
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
          </div>
          {/* Preparación */}
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
            <StatusCard
              bg="bg-red_b"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
            <StatusCard
              bg="bg-red_b"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
          </div>
          {/* Para retirar */}
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
            <StatusCard
              bg="bg-yellow"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
            <StatusCard
              bg="bg-yellow"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
          </div>
          {/* Egreso */}
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
            <StatusCard
              bg="bg-blue_b"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
            <StatusCard
              bg="bg-blue_b"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
          </div>
          {/* Entregado */}
          <div className="space-y-6 border-r-2 border-gray px-2 2xl:px-4">
            <StatusCard
              bg="bg-green"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
            <StatusCard
              bg="bg-green"
              clientName={"Nombre del cliente"}
              orderId={"ID de la orden"}
              productsList={"Lista de productos"}
              date={"24/09/2024"}
              sellerName={"Nombre vendedor"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatusPanelPage;
