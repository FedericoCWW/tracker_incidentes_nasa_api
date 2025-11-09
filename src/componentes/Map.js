import { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marcador from "./Marcador";
import UbicacionInfo from "./UbicacionInfo";

const Map = ({ eventData, center, zoom }) => {
  const mapCenter = center || {
    lat: -34.607613,
    lng: -58.4515826,
  };

  const mapZoom = zoom || 6;

  const [ubicacionInfo, setubicacionInfo] = useState(null);
  const marcadores = eventData.map((ev) => {
    if (ev.categories[0].id === "wildfires") {
      return (
        <Marcador
          lat={ev.geometry[0].coordinates[1]}
          lng={ev.geometry[0].coordinates[0]}
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
    return null;
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBphAZqTorrsxN0H3F8hVDY87t2iB6ozdU" }}
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
      >
        {
          /* {<Marcador lat={mapCenter.lat} lng={mapCenter.lng} />} */
          marcadores
        }
      </GoogleMapReact>
      {ubicacionInfo && <UbicacionInfo info={ubicacionInfo}/>}
    </div>
  );
};

export default Map;
