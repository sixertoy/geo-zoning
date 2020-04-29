import Leaflet from "leaflet";

const MarkerIcon = Leaflet.divIcon({
  className: "leaflet-marker-divicon",
  html: `
<div class="leaflet-marker-divicon-container">
  <div class="leaflet-marker-divicon-inner">
    <div class="leaflet-marker-divicon-pin"></div>
    <div class="leaflet-marker-divicon-pulse"></div>
  </div>
</div>
`
});

export default MarkerIcon;
