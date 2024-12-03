import React from "react";
import { Marker } from "@vis.gl/react-google-maps";

const PlaceMarker = ({ place }) => {
  return (
    <>
      <Marker
        position={{
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }}
      >
        <div>{place.name}</div>
      </Marker>
    </>
  );
};

export default PlaceMarker;
