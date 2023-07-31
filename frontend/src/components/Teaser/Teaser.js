import React, { useState } from "react";
import ChakraCarousel from "./ChakraCarousel";
import { Button } from "@chakra-ui/react";
import TeaserCard from "./TeaserCard";

import styles from './Teaser.module.css'

const Teaser = ({
  setShowTeaser,showTeaser ,
  showPopup,
  setShowPopup,
  setTakeMeThere,
  userLocation,
  markersData,
  selectedMarker,
  setSelectedMarker,

  isPopupOpen,
  handlePopupClose,
  directions,
  setTargetMarker,
  activeItem, setActiveItem,  setDirections,
  setIsChallangeVisible,
  startVideo
}) => {
  // console.log(directions);

  var markersDataCopy=[];
  let challangeMarker = {
    "category": "CHALLANGE",
    "description": "Already an Olympiapark master? Then it’s time for a challenge!",
    "id": "f114b7d8-c94e-4d0c-b090-9cefc7859b",
    "imageUrl": "https://www.olympiapark.de/Location/3274/image-thumb__3274__thumbnail-document-location-banner/stage_olympiaturm-1-olympiapark-muenchen.jpg",
    "lat": "48.174561217568254",
    "lng": "11.5539864498441",
    "name": "Solve the Challenge! ",
    "shortDescription": "Up for a little challenge? Go there to solve!",
    "teaser": "Already an Olympiapark master? Then it’s time for a challenge!",
    "visitCount": 0
}
Object.assign(markersDataCopy, markersData);
markersDataCopy.push(challangeMarker)

  return (
   
    <div className={styles.teaser_module}>
  
      <ChakraCarousel activeItem={activeItem} setActiveItem={setActiveItem} selectedMarker={selectedMarker}  gap={1}>
        {markersDataCopy.map((marker) => (
          <TeaserCard  setShowTeaser={setShowTeaser} showTeaser={showTeaser}  showPopup={showPopup} setShowPopup={setShowPopup} setTakeMeThere={ setTakeMeThere}   userLocation={userLocation}  key={marker.id} marker={marker}  setSelectedMarker={setSelectedMarker}  setTargetMarker={setTargetMarker} directions={directions}  setDirections={setDirections} setIsChallangeVisible={setIsChallangeVisible} startVideo={startVideo} />
        ))}
      </ChakraCarousel>

    </div>
    
  );
};

export default Teaser;


