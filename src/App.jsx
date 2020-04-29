import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { version } from '../package.json';
import GeoMap from './components/GeoMap';
import Loader from './components/Loader';
import Welcome from './components/Welcome';

const PARIS_CENTER = {
  lat: 48.8534,
  lng: 2.3488,
};

const useStyles = createUseStyles({
  container: {
    position: 'relative',
  },
  version: {
    bottom: 10,
    fontSize: '0.6rem',
    left: 10,
    // opacity: 0.45,
    position: 'absolute',
    zIndex: 100000000,
  },
});

const getLatLng = position => {
  if (
    !position ||
    !position.coords ||
    !position.coords.latitude ||
    !position.coords.longitude
  ) {
    return PARIS_CENTER;
  }
  const { latitude, longitude } = position.coords;
  const next = { lat: latitude, lng: longitude };
  return next;
};

const App = () => {
  const classes = useStyles();
  const [mapCenter, setMapCenter] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div classes={classes.container} id="app-container">
      <div className={classes.version}>
        <small>v{version}</small>
      </div>
      {isClicked && !mapCenter && <Loader />}
      {isClicked && mapCenter && <GeoMap center={mapCenter} />}
      {!isClicked && !mapCenter && (
        <Welcome
          onClickHandler={useGeoloc => {
            setIsClicked(true);
            try {
              if (!useGeoloc || !navigator.geolocation) {
                setMapCenter(PARIS_CENTER);
              } else {
                const opts = { enableHighAccuracy: false, timeout: 5000 };
                navigator.geolocation.getCurrentPosition(
                  position => setMapCenter(getLatLng(position)),
                  () => setMapCenter(PARIS_CENTER),
                  opts
                );
              }
            } catch (err) {
              setMapCenter(PARIS_CENTER);
            }
          }}
        />
      )}
    </div>
  );
};

export default App;
