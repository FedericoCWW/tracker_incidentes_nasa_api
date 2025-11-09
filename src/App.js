import { useState, useEffect } from "react";
import Map from "./componentes/Map";
import Cargando, { LineSimpleWithLabelDemo } from "./componentes/Cargando";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires");
        const data = await res.json();        
        setEventData(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="App" style={{ position: 'relative', height: '100vh' }}>
      {/* Map is always rendered */}
      <Map eventData={eventData} />
      
      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          zIndex: 1000
        }}>
          <Cargando />
        </div>
      )}
    </div>
  );
}

export default App;