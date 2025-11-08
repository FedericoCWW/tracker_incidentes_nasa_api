import { useState, useEffect } from "react";
import Map from "./componentes/Map";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v3/events?limit=20"
      );
      const data = await res.json();
      setEventData(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("Event data updated:", eventData);
  }, [eventData]);
  return (
    <div className="App">
      { !loading ? <Map eventData={eventData}/> : <h1>Cargando...</h1>}
      
    </div>
  );
}

export default App;
