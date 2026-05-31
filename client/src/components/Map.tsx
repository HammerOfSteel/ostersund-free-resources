/**
 * GOOGLE MAPS FRONTEND INTEGRATION - ESSENTIAL GUIDE
 *
 * USAGE FROM PARENT COMPONENT:
 * ======
 *
 * const mapRef = useRef<google.maps.Map | null>(null);
 *
 * <MapView
 *   initialCenter={{ lat: 40.7128, lng: -74.0060 }}
 *   initialZoom={15}
 *   onMapReady={(map) => {
 *     mapRef.current = map; // Store to control map from parent anytime, google map itself is in charge of the re-rendering, not react state.
 * </MapView>
 *
 * ======
 * Available Libraries and Core Features:
 * -------------------------------
 * 📍 MARKER (from `marker` library)
 * - Attaches to map using { map, position }
 * new google.maps.marker.AdvancedMarkerElement({
 *   map,
 *   position: { lat: 37.7749, lng: -122.4194 },
 *   title: "San Francisco",
 * });
 *
 * -------------------------------
 * 🏢 PLACES (from `places` library)
 * - Does not attach directly to map; use data with your map manually.
 * const place = new google.maps.places.Place({ id: PLACE_ID });
 * await place.fetchFields({ fields: ["displayName", "location"] });
 * map.setCenter(place.location);
 * new google.maps.marker.AdvancedMarkerElement({ map, position: place.location });
 *
 * -------------------------------
 * 🧭 GEOCODER (from `geocoding` library)
 * - Standalone service; manually apply results to map.
 * const geocoder = new google.maps.Geocoder();
 * geocoder.geocode({ address: "New York" }, (results, status) => {
 *   if (status === "OK" && results[0]) {
 *     map.setCenter(results[0].geometry.location);
 *     new google.maps.marker.AdvancedMarkerElement({
 *       map,
 *       position: results[0].geometry.location,
 *     });
 *   }
 * });
 *
 * -------------------------------
 * 📐 GEOMETRY (from `geometry` library)
 * - Pure utility functions; not attached to map.
 * const dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
 *
 * -------------------------------
 * 🛣️ ROUTES (from `routes` library)
 * - Combines DirectionsService (standalone) + DirectionsRenderer (map-attached)
 * const directionsService = new google.maps.DirectionsService();
 * const directionsRenderer = new google.maps.DirectionsRenderer({ map });
 * directionsService.route(
 *   { origin, destination, travelMode: "DRIVING" },
 *   (res, status) => status === "OK" && directionsRenderer.setDirections(res)
 * );
 *
 * -------------------------------
 * 🌦️ MAP LAYERS (attach directly to map)
 * - new google.maps.TrafficLayer().setMap(map);
 * - new google.maps.TransitLayer().setMap(map);
 * - new google.maps.BicyclingLayer().setMap(map);
 *
 * -------------------------------
 * ✅ SUMMARY
 * - “map-attached” → AdvancedMarkerElement, DirectionsRenderer, Layers.
 * - “standalone” → Geocoder, DirectionsService, DistanceMatrixService, ElevationService.
 * - “data-only” → Place, Geometry utilities.
 */

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Resource } from "@/data/resources";

interface LatLng {
  lat: number;
  lng: number;
}

interface ReferencePoint {
  name: string;
  coordinates: LatLng;
}

interface MapViewProps {
  className?: string;
  initialCenter?: LatLng;
  initialZoom?: number;
  resources?: Resource[];
  selectedResourceId?: string | null;
  referencePoint?: ReferencePoint;
  getCategoryColor?: (categoryId: string) => string;
  onMarkerClick?: (id: string) => void;
}

function createPinIcon(color: string, selected: boolean) {
  const size = selected ? 36 : 28;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <circle cx="12" cy="10" r="6" fill="${color}" stroke="white" stroke-width="2"/>
      <path d="M12 22 L12 16" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      ${selected ? `<circle cx="12" cy="10" r="3" fill="white"/>` : ""}
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function createRefIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <circle cx="12" cy="10" r="6" fill="#1d4ed8" stroke="white" stroke-width="2"/>
      <path d="M12 22 L12 16" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="12" cy="10" r="2.5" fill="white"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

function PanToSelected({
  selectedResourceId,
  resources,
}: {
  selectedResourceId?: string | null;
  resources?: Resource[];
}) {
  const map = useMap();
  useEffect(() => {
    if (!selectedResourceId || !resources) return;
    const r = resources.find((res) => res.id === selectedResourceId);
    if (r) map.panTo([r.coordinates.lat, r.coordinates.lng]);
  }, [selectedResourceId, resources, map]);
  return null;
}

export function MapView({
  className,
  initialCenter = { lat: 63.1758, lng: 14.6365 },
  initialZoom = 13,
  resources = [],
  selectedResourceId,
  referencePoint,
  getCategoryColor,
  onMarkerClick,
}: MapViewProps) {
  return (
    <MapContainer
      center={[initialCenter.lat, initialCenter.lng]}
      zoom={initialZoom}
      className={cn("w-full", className)}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {referencePoint && (
        <Marker
          position={[referencePoint.coordinates.lat, referencePoint.coordinates.lng]}
          icon={createRefIcon()}
        >
          <Popup>{referencePoint.name}</Popup>
        </Marker>
      )}

      {resources.map((resource) => {
        const color = getCategoryColor?.(resource.category) ?? "#C97C5C";
        const selected = resource.id === selectedResourceId;
        return (
          <Marker
            key={resource.id}
            position={[resource.coordinates.lat, resource.coordinates.lng]}
            icon={createPinIcon(color, selected)}
            eventHandlers={{ click: () => onMarkerClick?.(resource.id) }}
          >
            <Popup>
              <strong>{resource.name}</strong>
              <br />
              <span style={{ color: "#6b7280", fontSize: "0.85em" }}>{resource.description}</span>
            </Popup>
          </Marker>
        );
      })}

      <PanToSelected selectedResourceId={selectedResourceId} resources={resources} />
    </MapContainer>
  );
}
