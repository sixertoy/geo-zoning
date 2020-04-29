import React, { useState } from 'react';

import GeoMap from './components/GeoMap';
import Loader from './components/Loader';
import Welcome from './components/Welcome';

const PARIS_CENTER = {
  lat: 48.8534,
  lng: 2.3488,
};

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
  const [mapCenter, setMapCenter] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div id="app-container">
      {isClicked && !mapCenter && <Loader />}
      {isClicked && mapCenter && <GeoMap center={mapCenter} />}
      {!isClicked && !mapCenter && (
        <Welcome
          onClickHandler={useGeoloc => {
            setIsClicked(true);
            if (!useGeoloc || !navigator.geolocation) {
              setMapCenter(PARIS_CENTER);
            } else {
              navigator.permissions.query({ name: 'geolocation' });
              navigator.geolocation.getCurrentPosition(
                position => {
                  setMapCenter(getLatLng(position));
                },
                () => {
                  setMapCenter(PARIS_CENTER);
                }
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default App;
