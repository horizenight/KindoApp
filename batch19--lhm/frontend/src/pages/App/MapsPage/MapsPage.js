import { useJsApiLoader } from '@react-google-maps/api';
import React from 'react'
import RenderMap from '../../../components/Map/RenderMap';



const libraries = ["places"];
const MapsPage = ({selectedMarker,setSelectedMarker}) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
      });

      if (!isLoaded) return <div>Loading...</div>;
  return <>
<RenderMap selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker}/>
  </>;  


}

export default MapsPage