import GoogleMapReact from 'google-map-react';
import Marcador from './Marcador';

const Map = ({ center, zoom }) => {
  
  const mapCenter = center || {
    lat: -34.607613,
    lng: -58.4515826
  };
  
  const mapZoom = zoom || 15;

  return (
    <div className='map'>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: 'AIzaSyBphAZqTorrsxN0H3F8hVDY87t2iB6ozdU' }}
          defaultCenter={mapCenter}
          defaultZoom={mapZoom}
        >
          <Marcador 
            lat={mapCenter.lat}
            lng={mapCenter.lng}
          />
        </GoogleMapReact>
    </div>
  )
}

export default Map