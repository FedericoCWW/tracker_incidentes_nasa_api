import { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marcador from "./Marcador";
import UbicacionInfo from "./UbicacionInfo";

// South America bounding box coordinates
const SOUTH_AMERICA_BOUNDS = {
  north: 13.5,   // Northernmost point (Panama/Caribbean)
  south: -55.0,  // Southernmost point (Cape Horn)
  west: -82.0,   // Westernmost point (Pacific coast)
  east: -34.0    // Easternmost point (Brazil coast)
};

const Map = ({ eventData, center, zoom }) => {
  const mapCenter = center || {
    lat: -34.607613,
    lng: -58.4515826,
  };

  const mapZoom = zoom || 6;

  const [ubicacionInfo, setubicacionInfo] = useState(null);
  
  const marcadores = eventData.map((ev) => {
    // Check if it's a wildfire
    if (ev.categories[0].id === "wildfires") {
      const lat = ev.geometry[0].coordinates[1];
      const lng = ev.geometry[0].coordinates[0];
      
      // Check if coordinates are within South America bounds
      const isInSouthAmerica = 
        lat >= SOUTH_AMERICA_BOUNDS.south && 
        lat <= SOUTH_AMERICA_BOUNDS.north && 
        lng >= SOUTH_AMERICA_BOUNDS.west && 
        lng <= SOUTH_AMERICA_BOUNDS.east;
      
      if (isInSouthAmerica) {
        return (
          <Marcador
            key={ev.id}
            lat={lat}
            lng={lng}
            onClick={() => setubicacionInfo({ 
              id: ev.id, 
              title: ev.title,
              date: ev.geometry[0].date,
              magnitudvalue: ev.geometry[0].magnitudeValue,
              magnitudunidad: ev.geometry[0].magnitudeUnit
            })}
          />
        );
      }
    }
    return null;
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBphAZqTorrsxN0H3F8hVDY87t2iB6ozdU" }}
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
      >
        {marcadores}
      </GoogleMapReact>
      {ubicacionInfo && <UbicacionInfo info={ubicacionInfo}/>}
    </div>
  );
};

export default Map;