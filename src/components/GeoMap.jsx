import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Circle, Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';

import MarkerIcon from './MarkerIcon';

const RADIUS_METER = 100000;
const OSM_LAYER = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const useStyles = createUseStyles({
  container: {
    composes: ['is-full-layout'],
    zIndex: 999999,
  },
});

const GeoMap = ({ center, useZoomControl }) => {
  const clases = useStyles();
  const [coords, setCoords] = useState(center);
  const [isVisible, setCircleVisibility] = useState(true);
  return (
    <div className={clases.container}>
      <Map
        center={center}
        maxZoom={17}
        minZoom={1}
        zoom={9}
        zoomControl={false}
        onClick={({ latlng }) => setCoords(latlng)}>
        <TileLayer attribution="Open Street Map" url={OSM_LAYER} />
        {isVisible && <Circle center={coords} radius={RADIUS_METER} />}
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
    </div>
  );
};

GeoMap.defaultProps = {
  useZoomControl: true,
};

GeoMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  useZoomControl: PropTypes.bool,
};

export default GeoMap;
