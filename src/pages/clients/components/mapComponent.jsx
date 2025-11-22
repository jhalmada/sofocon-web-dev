/* eslint-disable react/prop-types */
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};
const MapComponent = ({ setValue, position }) => {
  const [selectPosition, setSelectPosition] = useState(position || null);
  const places = useMapsLibrary("places");
  const geocode = useMapsLibrary("geocoding");
  const map = useMap("edit-map");

  const direccionText = (address) => {
    var direccion = address.vicinity || address.formatted_address;
    var department = "";
    var neighborhood = "";
    console.log(address);
    for (const component of address.address_components) {
      const type = component.types[0];
      switch (type) {
        case "administrative_area_level_1": // Often the main city/town
          department = component.long_name;
          break;
        case "neighborhood": // Often a neighborhood or major district
          neighborhood = component.long_name;
          break;
        case "locality": // Often a neighborhood or major district
          neighborhood = component.long_name;
          break;
        default:
          break;
      }
    }
    return {
      direccion,
      department,
      neighborhood,
    };
  };

  const onPlaceSelect = (place) => {
    const address = direccionText(place);
    setValue("address", address.direccion);
    setValue("department", address.department);
    setValue("neighborhood", address.neighborhood);
    setValue("latitude", place.geometry.location.lat());
    setValue("longitude", place.geometry.location.lng());
    setSelectPosition(place.geometry.location);
    map.setCenter(place.geometry.location);
    map.setZoom(15);
  };

  const onClickMap = (e) => {
    console.log(e);
    const coder = new geocode.Geocoder();
    coder.geocode(
      {
        location: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng },
      },
      (results, status) => {
        console.log(results);
        if (status === "OK" && results[0]) {
          const address = direccionText(results[0]);
          setValue("address", address.direccion);
          setValue("department", address.department);
          setValue("neighborhood", address.neighborhood);
          setValue("latitude", e.detail.latLng.lat);
          setValue("longitude", e.detail.latLng.lng);
          setSelectPosition(e.detail.latLng);
          map.setCenter(e.detail.latLng);
          map.setZoom(15);
        }
      },
    );
  };
  useEffect(() => {
    const input = document.getElementById("address-input");

    if (!places || !input) return;

    const placeAutocomplete = new places.Autocomplete(input, {});
    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [places]);

  useEffect(() => {
    const interval = setInterval(() => {
      const pac = document.querySelector(".pac-container");
      const content = document.getElementById("address-content");

      if (pac && content && pac.parentNode !== content) {
        console.log("Moviendo pac-container dentro del modal");
        content.appendChild(pac);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Map
        id="edit-map"
        style={{ width: "100%", height: "10rem" }}
        defaultCenter={coordenadasUruguay}
        defaultZoom={7}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={onClickMap}
      >
        <Marker position={selectPosition} />
      </Map>
    </>
  );
};
export default MapComponent;
