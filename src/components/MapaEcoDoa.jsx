"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function MapaEcoDoa() {
  const [L, setL] = useState(null);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);

      const createIcon = (url) =>
        new leaflet.Icon({
          iconUrl: url,
          iconSize: [34, 34],
          iconAnchor: [17, 34],
          popupAnchor: [0, -28],
        });

      setIcons({
        shelter: createIcon("https://cdn-icons-png.flaticon.com/512/1046/1046857.png"), // casa
        meal: createIcon("https://cdn-icons-png.flaticon.com/512/685/685352.png"), // talheres
        job: createIcon("https://cdn-icons-png.flaticon.com/512/2910/2910768.png"), // pasta de trabalho
        course: createIcon("https://cdn-icons-png.flaticon.com/512/3135/3135755.png"), // livro
        support: createIcon("https://cdn-icons-png.flaticon.com/512/1077/1077012.png"), // coração/apoio
        clothes: createIcon("https://cdn-icons-png.flaticon.com/512/892/892458.png"), // t-shirt
      });
    });
  }, []);

  if (!L) return <p className="text-center text-[var(--ecodoa-primary)] py-10">A carregar mapa...</p>;

  const places = [
    {
      id: 1,
      name: "Casa Abrigo Porto Solidário",
      type: "shelter",
      city: "Porto",
      info: "Acolhimento 24h para famílias em vulnerabilidade.",
      lat: 41.1579,
      lng: -8.6291,
      maps: "https://www.google.com/maps?q=Casa+Abrigo+Porto+Solidário,+Porto",
    },
    {
      id: 2,
      name: "Refood Foz do Douro",
      type: "meal",
      city: "Porto",
      info: "Recolhe excedentes alimentares e distribui refeições.",
      lat: 41.1509,
      lng: -8.6726,
      maps: "https://www.google.com/maps?q=Refood+Foz+do+Douro,+Porto",
    },
    {
      id: 3,
      name: "Banco de Roupas Gaia",
      type: "clothes",
      city: "Vila Nova de Gaia",
      info: "Distribuição de roupas e calçado para famílias carenciadas.",
      lat: 41.1333,
      lng: -8.6167,
      maps: "https://www.google.com/maps?q=Banco+de+Roupas+Gaia,+Vila+Nova+de+Gaia",
    },
    {
      id: 4,
      name: "Centro de Emprego Braga",
      type: "job",
      city: "Braga",
      info: "Apoio à recolocação profissional e cursos gratuitos.",
      lat: 41.5454,
      lng: -8.4265,
      maps: "https://www.google.com/maps?q=Centro+de+Emprego+Braga",
    },
    {
      id: 5,
      name: "Escola Popular do Minho",
      type: "course",
      city: "Braga",
      info: "Formações gratuitas em competências digitais.",
      lat: 41.5533,
      lng: -8.4218,
      maps: "https://www.google.com/maps?q=Escola+Popular+do+Minho,+Braga",
    },
    {
      id: 6,
      name: "Apoio Solidário Guimarães",
      type: "support",
      city: "Guimarães",
      info: "Apoio psicológico e social gratuito.",
      lat: 41.4444,
      lng: -8.2903,
      maps: "https://www.google.com/maps?q=Apoio+Solidário+Guimarães",
    },
  ];

  return (
    <MapContainer
      center={[41.55, -8.45]} // Norte de Portugal
      zoom={8}
      scrollWheelZoom={false}
      style={{
        height: "420px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={icons[p.type]}>
          <Popup>
            <div className="text-[var(--ecodoa-text)] text-sm">
              <p className="font-semibold text-[var(--ecodoa-primary)]">{p.name}</p>
              <p className="text-[var(--ecodoa-text)]/80">{p.info}</p>
              <p className="text-[var(--ecodoa-soft)]/90">{p.city}</p>
              <a
                href={p.maps}
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
  );
}
