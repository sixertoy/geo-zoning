import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Map,
  Marker,
  Circle,
  TileLayer,
  ZoomControl
} from "react-leaflet";

import Loader from './Loader';
import MarkerIcon from './marker-icon';

const RADIUS_METER = 100000;
const OSM_LAYER = "http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";

const App = ({ useZoomControl }) => {
  const [coords, setCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [isVisible, setCircleVisibility] = useState(true);
  useEffect(() => {
    if (!coords && !mapCenter && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords
        const nextCoords = { lat, lng };
        setMapCenter(nextCoords);
        setCoords(nextCoords);
      });
    }
  })
  if (!coords || !mapCenter) return <Loader />;
  return (
    <div id="app-container">
      <Map
        zoom={9}
        minZoom={1}
        maxZoom={17}
        center={mapCenter}
        zoomControl={useZoomControl}
        // maxBounds={[
        //   [44.077884090674495, 7.261531242479236],
        //   [42.8374637590877, 5.342847062564374]
        // ]}
      >
        <TileLayer attribution={"Open Street Map"} url={OSM_LAYER} />
        {isVisible && <Circle radius={RADIUS_METER} center={coords} />}
        <Marker draggable
        icon={MarkerIcon}
        position={coords}
        onMoveEnd={({ target }) => {
          const nextCoords = target.getLatLng();
          setCoords(nextCoords);
          setCircleVisibility(true);
        }}
        onMoveStart={() => setCircleVisibility(false)} />
        {useZoomControl && <ZoomControl position="topright" />}
      </Map>
    </div>
  );
};

App.defaultProps = {
  useZoomControl: false
};

App.propTypes = {
  useZoomControl: PropTypes.bool
};

export default App;
