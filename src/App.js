import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import {
  Map,
  Marker,
  Circle,
  TileLayer,
  ZoomControl
} from "react-leaflet";

import MarkerIcon from './marker-icon';

const RADIUS_METER = 100000;
const OSM_LAYER = "http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"

const PARIS_CENTER = [43.39528702235596, 6.294845731267186]

const App = ({ useZoomControl }) => {
  const mapElement = useRef(null);
  const [isVisible, setCircleVisibility] = useState(true);
  const [coords, setCoords] = useState({lat: 43.040845, lng: 6.145118});
  return (
    <div id="app-container">
      <Map
        zoom={9}
        minZoom={1}
        maxZoom={17}
        ref={mapElement}
        center={PARIS_CENTER}
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
      <Helmet>
        <link rel="stylesheet" href={LEAFLET_CSS} />
      </Helmet>
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
