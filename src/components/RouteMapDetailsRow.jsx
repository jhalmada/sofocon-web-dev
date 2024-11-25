import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import IconVisit from "../assets/icons/VisitDisponible.png";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};

const position = { lat: -34.901, lng: -56.1698 };

const HouseInfoWindow = ({ name }) => (
  <div>
    <h3>{name}</h3>
  </div>
);

const RouteMapDetailsRow = ({ name, zone, companies, sellers, state }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = (props) => {
    setActiveMarker(props);
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
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
          <Map
            style={{ height: "15rem" }}
            mapId={"8c732c82e4ec29d9"}
            defaultCenter={coordenadasUruguay}
            defaultZoom={5}
            gestureHandling={"greedy"}
          >
            <Marker
              position={position}
              icon={{
                url: IconVisit,
                scaledSize: { width: 30, height: 30 },
              }}
              onClick={handleMarkerClick}
            >
              {showInfoWindow && (
                <InfoWindow
                  anchor={activeMarker}
                  onClose={handleInfoWindowClose}
                >
                  <div>Contenido de la InfoWindow</div>
                </InfoWindow>
              )}
            </Marker>
          </Map>
        </td>
      </tr>
    </>
  );
};

export default RouteMapDetailsRow;
