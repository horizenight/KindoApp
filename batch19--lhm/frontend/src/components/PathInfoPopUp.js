import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./PathPopUp.module.css";
import { FaGopuram, FaHeadphonesAlt } from 'react-icons/fa';
import { Image } from "@chakra-ui/react";

export default function PathInfoPopUp( { pathInfo, setPathInfoPopUpOpen, markers, visitedPlaces} ) {

  markers = markers.filter((place) => (pathInfo.places.includes(place.id)))

  let numberOfPlaces = Object.keys(visitedPlaces[pathInfo.id]).length;
  let numberOfVisitedPlaces = 0;

  console.log(numberOfPlaces)

  for (const key in visitedPlaces[pathInfo.id]) {
    if (visitedPlaces[pathInfo.id][key]) {
        numberOfVisitedPlaces++;
    }
  }

  let explored = (numberOfVisitedPlaces / numberOfPlaces) * 100 //TODO
  console.log(explored)
   

  return ( 
<div className={styles.popup_frame}>
    <div className={styles.popup_box}>
        
        <div className={styles.icons}>
            <FaGopuram className={styles.icon}/>
        </div>
        <div className={styles.placeInfo}>
                <h3 className={styles.placeName}>{pathInfo.name}</h3>
                <h4 className={styles.placeHeadline}>{pathInfo.headline}</h4>
            </div>
        <hr></hr>
        <div className={styles.progressPanel}>
            <div className={styles.progressBox}>
                <div className={styles.progressLabels}>
                    <p className={styles.progressLabel}>{markers.length} Destinations</p>
                    <p className={styles.progressLabel}>{explored} % Explored</p>
                </div>
                <div className={styles.progressBar}>
                    <div className={styles.progressBarLineOut}></div>
                    <div style={{"width": explored+"%"}} className={styles.progressBarLineIn}></div>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className={styles.imagePanel}>
            <div className={styles.imageGallery}>
                {markers && markers.map((marker) => (
                    <div className={styles.imageCard}>
                    <Image className={styles.image} src={marker.imageUrl}/>
                    <p className={styles.imageName}>{marker.name}</p>
                </div>
                ))}
            </div>
        </div>
        <hr></hr>
        <div className={styles.scroll}>
            {pathInfo.description && <h6 className={styles.description}>  {pathInfo?.description}</h6>}
        </div>
        <div className={styles.buttons}>
            <button className={styles.putBackButton} onClick={()=>{setPathInfoPopUpOpen(false)}} >Close</button>
        </div>
    </div>
</div> 
  );

}
