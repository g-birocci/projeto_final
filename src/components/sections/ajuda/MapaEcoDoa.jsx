"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function MapaEcoDoa({ places = [] }) {
  const [L, setL] = useState(null);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);

      const basePin =
        "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-";
      const shadow =
        "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-shadow.png";

      const createIcon = (color) =>
        new leaflet.Icon({
          iconUrl: `${basePin}${color}.png`,
          shadowUrl: shadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

      setIcons({
        shelter: createIcon("red"),
        meal: createIcon("orange"),
        course: createIcon("blue"),
        support: createIcon("green"),
        clothes: createIcon("violet"),
        job: createIcon("grey"),
      });
    });
  }, []);

  if (!L)
    return (
      <p className="text-center text-[var(--ecodoa-primary)] py-10">
        A carregar mapa...
      </p>
    );

  return (
    <div className="relative w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden shadow-md bg-white border border-[var(--ecodoa-soft)]">
      <MapContainer
        center={[41.15, -8.61]} // Porto
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={icons[p.type]}>
            <Popup>
              <div className="text-[var(--ecodoa-text)] text-sm leading-snug">
                <p className="font-semibold text-[var(--ecodoa-primary)]">
                  {p.name}
                </p>
                <p className="text-[var(--ecodoa-text)]/80">{p.info}</p>
                <p className="text-[var(--ecodoa-soft)]/80">{p.city}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${p.name} ${p.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[var(--ecodoa-accent)] font-semibold hover:underline"
                >
                  Ver no Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
