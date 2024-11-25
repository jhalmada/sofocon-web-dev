import MetricsVentas from "../components/metrics/MetricsVentas";
import MetricsAnual from "../components/metrics/MetricsAnual";
import CardMetrics from "../components/cards/CardMetrics";
import useGetMetrics from "../hooks/metrics/useGetMetrics";
import { Select, SelectItem } from "@nextui-org/select";
import useMetricsOrders from "../hooks/metrics/useGetMetricsOrders";
import useMetricsProduts from "../hooks/metrics/useGetMetricsProducts";
import MetricsCircle from "../components/metrics/MetricsCircle";
import useGetSellerBest from "../hooks/metrics/useGetSellerBest";
import { useSocket } from "../services/socket/socket.service";
import { useEffect, useState } from "react";
import { a } from "framer-motion/client";

const months = [
  { label: "Enero", value: "01" },
  { label: "Febrero", value: "02" },
  { label: "Marzo", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Mayo", value: "05" },
  { label: "Junio", value: "06" },
  { label: "Julio", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Septiembre", value: "09" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
];

const years = [
  { label: "2024", value: 2024 },
  { label: "2025", value: 2025 },
  { label: "2026", value: 2026 },
  { label: "2027", value: 2027 },
  { label: "2028", value: 2028 },
  { label: "2029", value: 2029 },
  { label: "2030", value: 2030 },
  { label: "2031", value: 2031 },
  { label: "2032", value: 2032 },
  { label: "2033", value: 2033 },
  { label: "2034", value: 2034 },
];

const HomePage = () => {
  //estados
  //hooks
  const { socketConnected } = useSocket();
  const [userLocation, setUserLocation] = useState(null);
  const { metricsResponse } = useGetMetrics();
  const { metricsOrdersResponse, setMonth, month, year } = useMetricsOrders();
  const { metricsProductsResponse, setYear } = useMetricsProduts();
  const { sellerBestResponse, setMonth: setMonthCircle } = useGetSellerBest();
  //funciones
  const keys = metricsResponse ? Object.keys(metricsResponse) : [];

  const handleChangeMonth = (value) => {
    console.log(value);
    setMonth(value);
  };
  const handleChangeMonthCircle = (value) => {
    console.log(value);
    setMonthCircle(value);
  };

  const handleChangeYear = (value) => {
    setYear(value);
  };

  useEffect(() => {
    const socket = socketConnected();
    if (socket) {
      socket.on("user-location", (data) => {
        console.log("user-location", data);
      });
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-4.375rem)] bg-gray p-6">
      <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
        Inicio
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          {keys.map((key) => (
            <CardMetrics key={key} title={key} total={metricsResponse[key]} />
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-[0.875rem] bg-white shadow-card">
          <div className="flex w-full justify-between p-4">
            <p className="text-lg font-medium">Ventas Mensuales</p>
            <Select
              defaultSelectedKeys={[month.toString()]}
              labelPlacement="outside"
              placeholder="Mes"
              label=""
              size="lg"
              className="w-[9.375rem] rounded-lg border"
              onChange={(e) => handleChangeMonth(e.target.value)}
              aria-label="Mes"
            >
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <MetricsVentas apiData={metricsOrdersResponse} />
        </div>
        <div className="flex justify-between gap-2">
          <div className="relative h-[19rem] rounded-[0.875rem] bg-white shadow-card">
            <div className="flex w-full justify-between p-4">
              <p className="text-lg font-medium">Ventas por Vendedores</p>
              <Select
                defaultSelectedKeys={[month.toString()]}
                labelPlacement="outside"
                placeholder="Mes"
                label=""
                size="lg"
                className="w-[9.375rem] rounded-lg border"
                aria-label="Mes"
                onChange={(e) => handleChangeMonthCircle(e.target.value)}
              >
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {sellerBestResponse && sellerBestResponse.length === 0 && (
              <>
                <h4 className="mt-9 text-center">
                  No hay Registros en nuestra base de datos.
                </h4>
                <p className="text-center text-xs">Prueba cambiando el mes.</p>
              </>
            )}
            <MetricsCircle dataArray={sellerBestResponse} />
          </div>
          <div className="w-full max-w-[59rem] rounded-[0.875rem] bg-white shadow-card">
            <div className="flex w-full justify-between p-4">
              <p className="text-lg font-medium">Ventas: anual/productos</p>
              <Select
                defaultSelectedKeys={[year.toString()]}
                labelPlacement="outside"
                placeholder="Mes"
                label=""
                size="lg"
                className="w-[9.375rem] rounded-lg border"
                aria-label="Mes"
                onChange={(e) => handleChangeYear(e.target.value)}
              >
                {years.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <MetricsAnual dataApi={metricsProductsResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
