import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

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
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);

      // Fix missing marker icon issue with Leaflet
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  // Custom hook to update map center when the prop changes
  const SetMapCenter = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([mapCenter.lat, mapCenter.lng], defaultZoom);
    }, [map]);
    return null;
  };

  if (!L) return <p>Loading map...</p>;

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
