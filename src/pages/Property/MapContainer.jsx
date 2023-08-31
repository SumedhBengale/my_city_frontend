import React, { Component } from "react";
// import "./map.css";
import config from "../../config/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MapContainer({ coordinate }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({
      lat: coordinate.lat,
      lng: coordinate.lng,
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: coordinate.lat,
        lng: coordinate.lng,
      }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Marker for coordinate */}
      <Marker position={{ lat: coordinate.lat, lng: coordinate.lng }} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
