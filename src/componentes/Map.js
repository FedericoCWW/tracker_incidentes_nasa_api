import { useState, useMemo } from "react";
import GoogleMapReact from "google-map-react";
import Marcador from "./Marcador";
import UbicacionInfo from "./UbicacionInfo";

// South America bounding box coordinates
const SOUTH_AMERICA_BOUNDS = {
  north: 13.5,
  south: -55.0,
  west: -82.0,
  east: -34.0
};

// Convert bounds to Google Maps format
const southAmericaGoogleBounds = {
  ne: { lat: SOUTH_AMERICA_BOUNDS.north, lng: SOUTH_AMERICA_BOUNDS.east },
  sw: { lat: SOUTH_AMERICA_BOUNDS.south, lng: SOUTH_AMERICA_BOUNDS.west }
};

const Map = ({ eventData, center, zoom }) => {
  const mapCenter = center || {
    lat: -20.0, // More centered in South America
    lng: -60.0,
  };

  const mapZoom = zoom || 4;
  const [ubicacionInfo, setUbicacionInfo] = useState(null);
  
  // Optimized markers with useMemo
  const marcadores = useMemo(() => {
    return eventData
      .filter(ev => {
        // Early return if not wildfire
        if (!ev.categories?.[0] || ev.categories[0].id !== "wildfires") {
          return false;
        }
        
        const lat = ev.geometry[0].coordinates[1];
        const lng = ev.geometry[0].coordinates[0];
        
        // Check South America bounds
        return (
          lat >= SOUTH_AMERICA_BOUNDS.south && 
          lat <= SOUTH_AMERICA_BOUNDS.north && 
          lng >= SOUTH_AMERICA_BOUNDS.west && 
          lng <= SOUTH_AMERICA_BOUNDS.east
        );
      })
      .map((ev) => {
        const latestGeometry = ev.geometry[ev.geometry.length - 1];
        return (
          <Marcador
            key={ev.id}
            lat={latestGeometry.coordinates[1]}
            lng={latestGeometry.coordinates[0]}
            onClick={() => setUbicacionInfo({ 
              id: ev.id, 
              title: ev.title,
              date: latestGeometry.date,
              url: ev.sources[0].url
            })}
          />
        );
      });
  }, [eventData]);

  return (
    <div className="map">
      {console.log("api key: " + process.env.REACT_APP_API_KEY)}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        options={{
          // Restrict map to South America bounds
          restriction: {
            latLngBounds: southAmericaGoogleBounds,
            strictBounds: true
          },
          // Optional: Disable zooming out too far
          minZoom: 3,
          maxZoom: 15,
          // Optional: Disable map type controls that might show other areas
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        }}
      >
        {marcadores}
      </GoogleMapReact>
      {ubicacionInfo && <UbicacionInfo info={ubicacionInfo} onClose={() => setUbicacionInfo(null)} />}
    </div>
  );
};

export default Map;