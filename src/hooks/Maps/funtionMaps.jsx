import { useEffect, useRef, useState } from "react";
import Input from "../../components/inputs/Input";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const direccionText = (address) => {
  const parts = address.split(","); // Divide la dirección por comas
  console.log(address);
  if (parts.length < 2) {
    return { error: "La dirección no está en el formato esperado" };
  }

  const direccion = address; // Primer parte como dirección

  // Extraemos el barrio de la segunda parte
  const barrioParts = parts[1].trim().split(" ");
  const barrio = barrioParts.slice(1).join(" ").trim(); // Ignora el código postal y toma el resto

  return {
    direccion,
    barrio,
  };
};

const MapHandler = ({ place, marker, setValue, setDireccion }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }

    marker.position = place.geometry?.location;

    setDireccion(place.formatted_address);
    setValue(
      "address",
      place.formatted_address &&
        direccionText(place.formatted_address).direccion,
    );
    setValue(
      "department",
      place.formatted_address && direccionText(place.formatted_address).barrio,
    );
  }, [map, place, marker]);
  return null;
};

const PlaceAutocomplete = ({
  onPlaceSelect,
  value = false,
  setSelectManual,
}) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");
  const [name, setName] = useState(value && value.length > 0 ? value : "");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
      setName(placeAutocomplete.getPlace().formatted_address);
      setSelectManual(null);
    });
  }, [onPlaceSelect, placeAutocomplete]);
  return (
    <div className="autocomplete-container mb-4">
      <Input
        value={name}
        ref={inputRef}
        placeholder="Ingrese una ubicacion para comenzar"
        msjError={name.length < 3 ? "Este campo es requerido" : ""}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Previene el comportamiento predeterminado del Enter
          }
        }}
      />
    </div>
  );
};

export { MapHandler, PlaceAutocomplete };
