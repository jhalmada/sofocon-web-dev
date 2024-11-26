import { Map, Marker } from "@vis.gl/react-google-maps";
import IconVisit from "../assets/icons/VisitDisponible.png";
import { useState } from "react";
const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};

const position = { lat: -34.901, lng: -56.1698 };

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

  console.log(array);
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

  return (
    <>
      <tr className="text-center">
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left"
          title={name}
        >
          {name}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={zone}
        >
          {zone}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={companies}
        >
          {companies}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={sellers}
        >
          {sellers}
        </td>
        <td className="p-2">{state ? "Activo" : "Inactivo"}</td>
      </tr>
      <tr className="border-b border-gray">
        <td colSpan="5">
          <div onMouseMove={handleMouseMove}>
            <Map
              style={{ height: "15rem" }}
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
                    url: IconVisit,
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
                  <h4 className="font-medium">{selectedMarker.name}</h4>
                  <p>Más detalles aquí...</p>
                </div>
              )}
            </Map>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RouteMapDetailsRow;
