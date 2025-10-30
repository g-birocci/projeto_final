"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function MapaEcoDoa({ places }) {
  const [L, setL] = useState(null);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    import("leaflet").then(leaflet => {
      setL(leaflet);
      const createIcon = (url) =>
        new leaflet.Icon({
          iconUrl: url,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
        });

      setIcons({
        shelter: createIcon("https://cdn-icons-png.flaticon.com/512/619/619034.png"),
        meal: createIcon("https://cdn-icons-png.flaticon.com/512/3075/3075977.png"),
        job: createIcon("https://cdn-icons-png.flaticon.com/512/1484/1484851.png"),
        course: createIcon("https://cdn-icons-png.flaticon.com/512/1048/1048943.png"),
        support: createIcon("https://cdn-icons-png.flaticon.com/512/3106/3106893.png"),
        clothes: createIcon("https://cdn-icons-png.flaticon.com/512/892/892458.png"),
      });
    });
  }, []);

  if (!L) return <p className="text-center text-green-700 py-10">A carregar mapa...</p>;

  return (
    <MapContainer center={[39.5, -8.0]} zoom={6} scrollWheelZoom={false} style={{ height: "380px", width: "100%" }}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {places.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={icons[p.type]}>
          <Popup>
            <p className="font-semibold">{p.name}</p>
            <p className="text-xs text-[#1E2D2F]/70">{p.info}</p>
            <p className="text-xs text-[#1E2D2F]/60 mt-1">{p.city}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
