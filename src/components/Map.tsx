import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Needed for Leaflet marker icon adjustment

// Fix missing marker icon issue with Leaflet
// see https://stackoverflow.com/questions/49441600/react-leaflet-marker-icon-not-showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Props {
  data: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }[];
  mapCenter: { lat: number; lng: number };
}

const Map = ({ data, mapCenter }: Props) => {
  const defaultZoom = 12;

  // Custom hook to update map center when the prop changes
  const SetMapCenter = () => {
    const map = useMap();
    map.setView([mapCenter.lat, mapCenter.lng], defaultZoom);
    return null;
  };

  return (
    <div className="h-full md:h-[calc(100vh-15rem)]">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng] as [number, number]}
        zoom={defaultZoom}
        className="h-full rounded"
      >
        <SetMapCenter />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((record, index) => (
          <Marker
            key={index}
            position={[record.latitude, record.longitude] as [number, number]}
          >
            <Popup>
              <strong>{record.name}</strong>
              <br />
              {record.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
