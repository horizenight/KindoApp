import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styles from "./PlaceCard.module.css";

import { FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';
import { Image } from "@chakra-ui/react";
import iconOrange from "../../Icons/customMarker-orange.svg";
import iconGreen from "../../Icons/customMarker-green.svg";

const PlaceCard = ( {place, categories, setPlaceInfoPopUpOpen, setCurrentPlaceInfo, setNavigationBarScreen, MAP, handleMarkerPosition, paths} ) => {

    const displayInfo = () => {
        console.log(setPlaceInfoPopUpOpen)
        setCurrentPlaceInfo(place)
        setPlaceInfoPopUpOpen(true);
    }

    const showOnMap = () => {
        setNavigationBarScreen(MAP);
        handleMarkerPosition(place.lat, place.lng);
    }
 
  return (
    <div className={styles.card}>
        <div className={styles.cardIconHolder}>
            {paths[1].places.includes(place?.id) ? <Image className={styles.cardIcon} src={iconGreen}/> : <Image className={styles.cardIcon} src={iconOrange}/>}  
        </div>
        <div className={styles.cardName}>
            <p className={styles.cardText}>{place?.name}</p>
        </div>
        <div className={styles.cardButtons}>
            <button onClick={showOnMap} className={styles.cardButton}><FaMapMarkedAlt/></button>
            <button onClick={displayInfo} className={styles.cardButton}><FaInfoCircle/></button>
        </div>
    </div>
  );
};

export default PlaceCard;
