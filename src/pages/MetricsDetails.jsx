import { Link } from "react-router-dom";

import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import MetricsCircle from "../components/metrics/MetricsCircle.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import useGetSellerBest from "../hooks/metrics/useGetSellerBest.js";
import useMetricsOrders from "../hooks/metrics/useGetMetricsOrders.js";
import MetricsVentas from "../components/metrics/MetricsVentas.jsx";
import TableNextUI from "../components/tables/TableNextUI.jsx";
import useUsers from "../hooks/users/use.users.js";
import useUsersSellers from "../hooks/users/useUsersSellers.js";

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

const MetricsDetail = () => {
  const { metricsOrdersResponse, setMonth, month } = useMetricsOrders();
  const { sellerBestResponse, setMonth: setMonthCircle } = useGetSellerBest();
  const { userSellerResponse, totalPage, setPage, page } = useUsersSellers();

  const handleChangeMonthCircle = (value) => {
    console.log(value);
    setMonthCircle(value);
  };

  const handleChangeMonth = (value) => {
    console.log(value);
    setMonth(value);
  };
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to=".." className="text-sm font-medium leading-4">
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
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Metricas
          </h1>
        </div>
        <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
          <div className="mt-5 flex justify-around">
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
                  <p className="text-center text-xs">
                    Prueba cambiando el mes.
                  </p>
                </>
              )}
              <MetricsCircle dataArray={sellerBestResponse} width={600} />
            </div>
            <div className="flex w-[600px] flex-col justify-between rounded-[0.875rem] bg-white shadow-card">
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
          </div>
          <div>
            <TableNextUI
              array={userSellerResponse}
              totalPage={totalPage}
              setPage={setPage}
              page={page}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDetail;
