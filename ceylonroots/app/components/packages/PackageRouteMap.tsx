"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

// Sri Lanka destination coordinates
const SRI_LANKA_COORDS: Record<string, [number, number]> = {
  Colombo: [6.9271, 79.8612],
  Kandy: [7.2906, 80.6337],
  Ella: [6.8667, 81.0466],
  Sigiriya: [7.957, 80.7603],
  Galle: [6.0535, 80.221],
  Yala: [6.3736, 81.5156],
  Mirissa: [5.9483, 80.4716],
  "Nuwara Eliya": [6.9497, 80.7891],
  Dambulla: [7.8731, 80.6517],
  Polonnaruwa: [7.9403, 81.0188],
  Trincomalee: [8.5922, 81.2152],
  "Arugam Bay": [6.8404, 81.8354],
  Anuradhapura: [8.3114, 80.4037],
  Negombo: [7.2083, 79.8358],
  Bentota: [6.4211, 80.0002],
  Hikkaduwa: [6.1395, 80.1062],
  Pinnawala: [7.2984, 80.3862],
  Matara: [5.9549, 80.555],
  Unawatuna: [6.01, 80.247],
  Tangalle: [6.025, 80.7975],
  Haputale: [6.7667, 80.9667],
  Bandarawela: [6.8328, 80.9898],
  Badulla: [6.9895, 81.055],
  Wilpattu: [8.4573, 80.0206],
  Udawalawe: [6.4833, 80.9],
  Minneriya: [8.0333, 80.9333],
  Kalpitiya: [8.2333, 79.75],
  Pasikuda: [7.9333, 81.5333],
  Hatton: [6.8931, 80.5974],
  Tissamaharama: [6.2912, 81.2893],
  Jaffna: [9.6615, 80.0255],
  Batticaloa: [7.7102, 81.6924],
  Hambantota: [6.1241, 81.1185],
  Weligama: [5.9742, 80.4289],
  Koggala: [5.996, 80.333],
  Ahangama: [5.9924, 80.3665],
  "Adam's Peak": [6.8096, 80.4994],
  "Horton Plains": [6.8019, 80.8119],
  Sinharaja: [6.4167, 80.4167],
  Knuckles: [7.4333, 80.7833],
  Kurunegala: [7.4863, 80.363],
  Chilaw: [7.5775, 79.796],
  Puttalam: [8.0364, 79.8287],
  Peradeniya: [7.2684, 80.5946],
  Matale: [7.4675, 80.6234],
};

function fuzzyMatch(name: string): [number, number] | null {
  const lower = name.toLowerCase().trim();
  for (const [key, coords] of Object.entries(SRI_LANKA_COORDS)) {
    if (
      key.toLowerCase() === lower ||
      lower.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lower)
    ) {
      return coords;
    }
  }
  return null;
}

interface PackageRouteMapProps {
  destinations: string[];
  itineraryDays?: { mainTown?: string | null }[];
}

export default function PackageRouteMap({
  destinations,
  itineraryDays,
}: PackageRouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  // Build ordered list of locations from itinerary (day-by-day) or destinations
  const locationNames =
    itineraryDays && itineraryDays.length > 0
      ? (itineraryDays.map((d) => d.mainTown).filter(Boolean) as string[])
      : destinations;

  // Deduplicate consecutive duplicates while preserving order
  const uniqueLocations = locationNames.filter(
    (loc, i) => i === 0 || loc !== locationNames[i - 1]
  );

  const coords = uniqueLocations
    .map((name) => ({ name, coord: fuzzyMatch(name) }))
    .filter(
      (x): x is { name: string; coord: [number, number] } => x.coord !== null
    );

  useEffect(() => {
    if (!mapRef.current || coords.length === 0) return;

    let map: unknown = null;

    (async () => {
      const L = (await import("leaflet")).default;
      // Load Leaflet CSS dynamically
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      // Fix default marker icons for webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }

      // Center on Sri Lanka
      const center: [number, number] = [7.8731, 80.7718];
      map = L.map(mapRef.current!, {
        center,
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // OpenStreetMap tiles (free, no API key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map as ReturnType<typeof L.map>);

      // Custom numbered icon
      const createNumberedIcon = (
        num: number,
        isFirst: boolean,
        isLast: boolean
      ) =>
        L.divIcon({
          html: `<div style="
                    width:32px;height:32px;border-radius:50%;
                    background:${isFirst ? "#2E8B57" : isLast ? "#D4AF37" : "#1A5276"};
                    color:white;font-weight:700;font-size:13px;
                    display:flex;align-items:center;justify-content:center;
                    border:3px solid white;
                    box-shadow:0 2px 8px rgba(0,0,0,0.35);
                ">${num}</div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

      // Add markers with popups
      coords.forEach(({ name, coord }, i) => {
        const icon = createNumberedIcon(
          i + 1,
          i === 0,
          i === coords.length - 1
        );
        L.marker(coord, { icon })
          .addTo(map as ReturnType<typeof L.map>)
          .bindPopup(`<strong>Day ${i + 1}</strong><br/>${name}`, {
            closeButton: false,
            className: "ceylon-map-popup",
          });
      });

      // Draw route polyline
      if (coords.length > 1) {
        const routeCoords = coords.map((c) => c.coord);
        L.polyline(routeCoords, {
          color: "#2E8B57",
          weight: 3,
          opacity: 0.8,
          dashArray: "8, 6",
        }).addTo(map as ReturnType<typeof L.map>);
      }

      // Fit bounds
      const bounds = L.latLngBounds(coords.map((c) => c.coord));
      (map as ReturnType<typeof L.map>).fitBounds(bounds, {
        padding: [40, 40],
      });
    })();

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(coords)]);

  if (coords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-200 text-gray-400">
        <MapPin className="h-10 w-10 mb-3 opacity-30" />
        <p className="text-sm">Map locations not available for this package</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Route legend */}
      <div className="flex flex-wrap gap-2">
        {coords.map(({ name }, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 text-sm bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm"
          >
            <span
              className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  i === 0
                    ? "#2E8B57"
                    : i === coords.length - 1
                      ? "#D4AF37"
                      : "#1A5276",
              }}
            >
              {i + 1}
            </span>
            <span className="text-gray-700">{name}</span>
          </div>
        ))}
      </div>

      {/* Map container */}
      <div
        className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm"
        style={{ height: "380px" }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      </div>

      <p className="text-xs text-gray-400 text-center">
        Route shown is indicative. Actual travel path may vary. © OpenStreetMap
        contributors.
      </p>
    </div>
  );
}
