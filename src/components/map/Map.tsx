import React, { useEffect, useRef } from "react";

// Mapbox
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API ?? "";

interface Props {
  long: number;
  lat: number;
}

function Map({ long, lat }: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapRefContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Init map
    if (mapRef.current) return;

    const center = new mapboxgl.LngLat(long, lat);

    mapRef.current = new mapboxgl.Map({
      // @ts-ignore
      container: mapRefContainer.current,
      style: "mapbox://styles/croossin/cldsx66rj002q01qsdnnbcptr",
      center,
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current);
  }, []);

  return (
    <div ref={mapRefContainer} className="h-[200px] md:h-[300px] rounded-lg" />
  );
}

export default Map;
