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
import IconVisitRealizada from "../assets/icons/VisitVisitado.png";
import { useEffect, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import mapNotPermisse from "../assets/images/MapNotPermisses.png";
const coordenadasUruguay = {
  lat: -33.2405,
  lng: -56.0128,
};
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
  const datosGuardados = localStorage.getItem("SOFOCON_PERMISSIONS");
  const { socketConnected } = useSocket();
  const [usersActives, setUsersActive] = useState(
    JSON.parse(sessionStorage.getItem("usersActives")) || [], 
  );
  const { metricsResponse } = useGetMetrics();
  const { metricsOrdersResponse, setMonth, month, year } = useMetricsOrders();
  const { metricsProductsResponse, setYear } = useMetricsProduts();
  const { sellerBestResponse, setMonth: setMonthCircle } = useGetSellerBest();
  //funciones
  const keys = metricsResponse ? Object.keys(metricsResponse) : [];

  const [selectedMarker, setSelectedMarker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [infoUser, setInfoUser] = useState(null);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

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

  const tootltip = (data) => {
    setInfoUser(data);
    setSelectedMarker(true);
  };

  const handleSocketData = (data) => {
    const { id, longitude, latitude, userInfo, clientId } = data;

    // Buscamos el usuario existente o creamos uno nuevo
    const numberIndex = usersActives.findIndex((user) => user.id === id);
    console.log(data);

    if (numberIndex >= 0) {
      usersActives.splice(numberIndex, 1, {
        id,
        longitude,
        latitude,
        userInfo,
        clientId,
      });
    } else {
      usersActives.splice(usersActives.length + 1, 0, {
        id,
        longitude,
        latitude,
        userInfo,
        clientId,
      });
    }
    setUsersActive(usersActives);
    sessionStorage.setItem("usersActives", JSON.stringify(usersActives));
  };

  const handleSocketDataDisconected = (data) => {
    const { client } = data;
    console.log(data);
    const array = JSON.parse(sessionStorage.getItem("usersActives"));
    const newArray = array.filter((user) => user.clientId !== client);
    setUsersActive(newArray);

    sessionStorage.setItem("usersActives", JSON.stringify(newArray));
  };

  useEffect(() => {
    const socket = socketConnected();
    if (socket) {
      console.log(socket);
      socket.on("user-location", (data) => {
        handleSocketData(data);
      });
      socket.on("user-disconected", (data) => {
        handleSocketDataDisconected(data);
      });
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-4.375rem)] bg-gray p-6">
      <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
        Inicio
      </h1>
      <div className="flex flex-col gap-4">
        {/* Contenedor CardMetrics y maps */}
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col justify-between gap-4">
            {keys.map((key) => (
              <CardMetrics key={key} title={key} total={metricsResponse[key]} />
            ))}
          </div>
          {/*Mapa*/}
          {datosGuardados.includes("USER_SUPER_ADMIN") ? (
            <div
              onMouseMove={handleMouseMove}
              className="w-[85%] rounded-[0.875rem] bg-white pt-4 shadow-card"
            >
              <p className="mb-4 ml-4 text-lg font-medium">
                Vendedores Activos: {usersActives.length}
              </p>
              <Map
                mapId={"8c732c82e4ec29d9"}
                defaultCenter={coordenadasUruguay}
                defaultZoom={7}
                borderRadius={"0.875rem"}
                gestureHandling={"greedy"}
                className="relative h-[89%]"
                disableDefaultUI={true}
              >
                {usersActives &&
                  usersActives.map((empresa) => (
                    <Marker
                      key={empresa.id}
                      position={{
                        lat: Number(empresa.latitude),
                        lng: Number(empresa.longitude),
                      }}
                      icon={{
                        url: IconVisitRealizada,
                        scaledSize: { width: 40, height: 40 },
                      }}
                      onMouseOver={() => tootltip(empresa)}
                      onMouseOut={() => setSelectedMarker(false)}
                    ></Marker>
                  ))}
                {selectedMarker && (
                  <div
                    style={{
                      position: "absolute",
                      top: cursorPosition.y - 250, // Ajusta el div 10px debajo del cursor
                      left: cursorPosition.x - 530, // Ajusta el div 10px a la derecha del cursor
                      background: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <h4 className="font-semibold">
                      {infoUser.userInfo.fullName}
                    </h4>
                  </div>
                )}
              </Map>
            </div>
          ) : (
            <div className={`h-[35.5rem] w-[85%]`}>
              <img src={mapNotPermisse} className="h-full w-full" />
            </div>
          )}
        </div>
        {/* Contenedor de ventas mensual */}
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

        {/* Contenedor de ventas por vendedores y ventas anuales */}
        <div className="flex min-h-[19rem] w-full flex-wrap justify-between gap-2">
          <div className="h-[19rem] w-full rounded-[0.875rem] bg-white shadow-card sm:w-full md:w-full lg:w-full xl:w-[49%]">
            {" "}
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
          <div className="w-full rounded-[0.875rem] bg-white shadow-card sm:w-full md:w-full lg:w-full xl:w-[50%]">
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
