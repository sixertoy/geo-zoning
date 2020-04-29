import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Map, Marker, Circle, TileLayer, ZoomControl } from 'react-leaflet';

import MarkerIcon from './MarkerIcon';

const RADIUS_METER = 100000;
const OSM_LAYER = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const GeoMap = ({ useZoomControl, center }) => {
  const [coords, setCoords] = useState(center);
  const [isVisible, setCircleVisibility] = useState(true);
  return (
    <Map
      zoom={9}
      minZoom={1}
      maxZoom={17}
      center={center}
      zoomControl={useZoomControl}
      // maxBounds={[
      //   [44.077884090674495, 7.261531242479236],
      //   [42.8374637590877, 5.342847062564374]
      // ]}
    >
      <TileLayer attribution={'Open Street Map'} url={OSM_LAYER} />
      {isVisible && <Circle radius={RADIUS_METER} center={coords} />}
      <Marker
        draggable
        icon={MarkerIcon}
        position={coords}
        onMoveEnd={({ target }) => {
          const nextCoords = target.getLatLng();
          setCoords(nextCoords);
          setCircleVisibility(true);
        }}
        onMoveStart={() => setCircleVisibility(false)}
      />
      {useZoomControl && <ZoomControl position="topright" />}
    </Map>
  );
};

GeoMap.propTypes = {
  useZoomControl: PropTypes.bool,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

export default GeoMap;
