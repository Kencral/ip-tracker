import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';
import iconURL from "./assets/icon-location.svg";

const LocationMap = ({lat, lng}) => {
  const position =  [lat, lng];
  const myIcon = L.icon({
    iconUrl: iconURL,
    iconSize: [54, 60],
    iconAnchor: [27,59],
  })
  return(
    <MapContainer center={position} zoom={50} scrollWheelZoom={false} zoomControl={false}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={myIcon} > 
      </Marker>
    </MapContainer>
  )
}

export default LocationMap;
