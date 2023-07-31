import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styles from "./GuideNavigator.module.css";
import PlaceCard from "./PlaceCard";

import { FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';

const PathsGuide = ( {markers, paths, setPlaceInfoPopUpOpen, setCurrentPlaceInfo, setPathInfoPopUpOpen, setCurrentPathInfo, setNavigationBarScreen, MAP,handleMarkerPosition, setZoom} ) => {

  const displayInfo = (path) => {
        setCurrentPathInfo(path)
        setPathInfoPopUpOpen(true);
  }

  const showOnMap = (pathInfo) => {
    let markersOfPath = markers.filter((place) => (pathInfo.places.includes(place.id)));
    let maxLat = Number(markersOfPath[0].lat);
    let minLat = Number(markersOfPath[0].lat);
    let maxLng = Number(markersOfPath[0].lng);
    let minLng = Number(markersOfPath[0].lng);
    let totalLng = 360;
    let totalLat = 180;

    markersOfPath.map((place) => {
      if( maxLat < Number(place.lat) ){
        maxLat = Number(place.lat)
      }
      if( minLat > Number(place.lat) ){
        minLat =  Number(place.lat)
      }
      if( maxLng < Number(place.lng) ){
        maxLng =  Number(place.lng)
      }
      if( minLng > Number(place.lng) ){
        minLng =  Number(place.lng)
      }
    })

    console.log(maxLat, minLat)
    console.log(maxLng, minLng)

    let centerOfLat = (maxLat + minLat) / 2
    let centerOfLng = (maxLng + minLng) / 2

    let zoomLng = Math.log2(1 / ( (maxLng-minLng) / totalLng)) - 0.5
    let zoomLat = Math.log2(1 / ( (maxLat-minLat) / totalLat)) - 0.5
    let zoom = Math.min(zoomLng, zoomLat)
    console.log("Zoom", zoom)
    console.log(centerOfLat, centerOfLng)

    setNavigationBarScreen(MAP);
    handleMarkerPosition(centerOfLat,centerOfLng)
    setZoom(zoom)

  }

    console.log(paths)
  return (
    <div className={styles.pathsBox}>
        {
            paths && paths.filter((path)=>(path.places.some( r => markers.findIndex( i => i.id == r ) > -1 ))).map( (path, index) => (
                <div key={index} className={styles.pathBox}>
                <div className={styles.pathTitle} >
                  <h2 className={styles.pathName}>{path.name} </h2>
                  <div className={styles.cardButtons}>
                      <button onClick={()=>(showOnMap(path))} className={styles.cardButton}><FaMapMarkedAlt/></button>
                      <button onClick={() => (displayInfo(path))} className={styles.cardButton}><FaInfoCircle/></button>
                  </div>
                </div>
                <h3 className={styles.pathDesc}>{path.headline} </h3>
                <ul>
                {
                    path.places.filter((place)=>(markers.findIndex( i => i.id == place) > -1)).map( (place,index) => (
                        <PlaceCard key={index} id={index} place={ markers[markers.findIndex( i => i.id == place) ]} setPlaceInfoPopUpOpen={setPlaceInfoPopUpOpen} setCurrentPlaceInfo={setCurrentPlaceInfo} setNavigationBarScreen={setNavigationBarScreen} MAP={MAP} handleMarkerPosition={handleMarkerPosition} paths={paths}/>
                    ))
                }
                </ul>
                  </div>
            ))
        
        }
    </div>
  );
};

export default PathsGuide;
