import { Map, Marker } from "@vis.gl/react-google-maps";
import IconDisponible from "../assets/icons/VisitDisponible.png";
import IconVisitPendien from "../assets/icons/VisitPendiente.png";
import IconVisitRealizada from "../assets/icons/VisitVisitado.png";
import IconProximaV from "../assets/icons/VisitProx.png";
import { useState } from "react";
import { div } from "framer-motion/client";
const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};

const RouteMapDetailsRow = ({
  name,
  zone,
  companies,
  sellers,
  state,
  id,
  array,
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  const filtrarEmpresasConCoordenadas = (empresas) => {
    return empresas.filter(
      (empresa) =>
        empresa.latitude !== undefined &&
        empresa.longitude !== undefined &&
        empresa.latitude !== null &&
        empresa.longitude !== null,
    );
  };

  const empresasConCoordenadas = filtrarEmpresasConCoordenadas(array);

  const iconos = (valorEstado) => {
    switch (valorEstado) {
      case "AVAILABLE":
        return IconDisponible;
      case "VISITED":
        return IconVisitRealizada;
      case "PENDING":
        return IconVisitPendien;
      case "NEXT_VISIT":
        return IconProximaV;
      default:
        return IconDisponible;
    }
  };

  return (
    <>
      <tr className="text-center">
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
          title={name}
        >
          {name}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={zone}
        >
          {zone}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={companies}
        >
          {companies}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={sellers}
        >
          {sellers}
        </td>
        <td className="py-6">{state ? "Activo" : "Inactivo"}</td>
      </tr>
      <tr className="border-b border-gray">
        <td colSpan="5">
          {empresasConCoordenadas.length > 0 ? (
            <div onMouseMove={handleMouseMove}>
              <Map
                style={{ height: "35rem" }}
                mapId={"8c732c82e4ec29d9"}
                defaultCenter={coordenadasUruguay}
                defaultZoom={5}
                gestureHandling={"greedy"}
              >
                {empresasConCoordenadas.map((empresa) => (
                  <Marker
                    key={empresa.id}
                    position={{
                      lat: Number(empresa.latitude),
                      lng: Number(empresa.longitude),
                    }}
                    icon={{
                      url: iconos(empresa?.clientInRoute[0]?.status),
                      scaledSize: { width: 30, height: 30 },
                    }}
                    onMouseOver={() => setSelectedMarker(empresa)}
                    onMouseOut={() => setSelectedMarker(null)}
                  ></Marker>
                ))}

                {selectedMarker && (
                  <div
                    style={{
                      position: "absolute",
                      top: cursorPosition.y - 300, // Ajusta el div 10px debajo del cursor
                      left: cursorPosition.x - 400, // Ajusta el div 10px a la derecha del cursor
                      background: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <h4 className="font-semibold">{selectedMarker.name}</h4>
                    <p>{selectedMarker.department}</p>
                    <p>{selectedMarker.address}</p>
                  </div>
                )}
                <div className="absolute bottom-10 right-20 rounded bg-white p-2 shadow-md">
                  <h4 className="font-semibold">Estado de Visita</h4>
                  <div className="flex">
                    <img
                      src={IconProximaV}
                      alt="proxima visita"
                      className="h-[1.5rem]"
                    />
                    <p>Proximo a Visitar</p>
                  </div>
                  <div className="flex">
                    <img
                      src={IconVisitRealizada}
                      alt="proxima visita"
                      className="h-[1.5rem]"
                    />
                    <p>Visitado</p>
                  </div>
                  <div className="flex">
                    <img
                      src={IconVisitPendien}
                      alt="proxima visita"
                      className="h-[1.5rem]"
                    />
                    <p>Pendiente</p>
                  </div>
                  <div className="flex">
                    <img
                      src={IconDisponible}
                      alt="proxima visita"
                      className="h-[1.5rem]"
                    />
                    <p>Disponible</p>
                  </div>
                </div>
              </Map>
            </div>
          ) : (
            <div className="mt-5 flex h-96 items-center justify-center rounded-lg border">
              <p className="p-2">
                No hay empresas con coordenadas para mostrar en el Mapa
              </p>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default RouteMapDetailsRow;
