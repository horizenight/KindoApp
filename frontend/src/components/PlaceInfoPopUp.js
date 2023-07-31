import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./PlacePopUp.module.css";
import { FaGopuram, FaHeadphonesAlt } from 'react-icons/fa';
import { Image } from "@chakra-ui/react";
import markerIcon from '../Icons/markerIcon.png';
import * as C from '../Constants'

export default function PlaceInfoPopUp( { placeInfo, setPlaceInfoPopUpOpen, setVisitedPlaces, findPathIDofPlace, visitedPlaces} ) {
  
  const [currentAudio, setCurrentAudio] = useState(false);
  const [totalTimeAudio, setTotalTimeAudio] = useState(0);

  const hexToBinary = (hexString) => {
    const bytes = [];

    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }

    return bytes;
  };

  const audioGenerator = (audioHex) => {
    try {
     const hexData = audioHex; // Replace with your hex data
 
     // Convert hex data to binary format
     const binaryData = hexToBinary(hexData);
 
     // Create a Uint8Array from the binary data
     const uint8Array = new Uint8Array(binaryData);
 
     // Create a Blob object with MIME type "audio/wav"
     const wavBlob = new Blob([uint8Array.buffer], { type: 'audio/wav' });
 
     // Generate URL for the Blob
     const url = URL.createObjectURL(wavBlob);
 
     // Create a new Audio object
     const audio = new Audio();
     audio.src = url;
 
     return audio
     } catch (error) {
       console.log(error)
     return null
     }
   }

  const fetchSoundData = async () => {
    try {
      const response = await fetch(C.API_URL+"/getSound/"+placeInfo.id);
      const data = await response.json();
      console.log("fetch Data");
      let audio = audioGenerator(data.audioData);
      setCurrentAudio(audio);
      audio.addEventListener('loadedmetadata', (e) => {
        setTotalTimeAudio(audio.duration)
      });
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = React.useState(0);

    const toggleVisitedPlace =  (placeID) => {
        let pathID = findPathIDofPlace(placeID);
        if(pathID){
          setVisitedPlaces((visitedPlaces)=>{
            const newState = JSON.parse(JSON.stringify(visitedPlaces))
            newState[pathID][placeID] = !newState[pathID][placeID];
            return newState;
          })
        }
      }
      
    

    const [value, setValue] = useState(visitedPlaces);
    // This will launch only if propName value has chaged.
    useEffect(() => { setValue(visitedPlaces); fetchSoundData(); }, [visitedPlaces]);

    if(currentAudio){
        currentAudio.addEventListener("timeupdate", function () {
            let time = this.currentTime;
            setCurrentTime(parseInt(time));
          });
    }
    

    const toggleAudio = () => {
        
        if(isPlaying){
          currentAudio.pause();
          console.log("paused")
        }
        else{
          currentAudio.play();
          console.log("played")
        }
        setIsPlaying(!isPlaying)
      }

  return ( 
<div className={styles.popup_frame2}>
    <div className={styles.popup_box2}>
        
        <div className={styles.icons2}>
                <Image className={styles.icon2} src={markerIcon}></Image>
        </div>
        <div className={styles.placeInfo2}>
                <h3 className={styles.placeName2}>{placeInfo.name}</h3>
            </div>
        <hr></hr>
        <div className={styles.scroll}>
            <div className={styles.placeImage2}>
                {placeInfo.imageUrl &&  <Image className={styles.image2} src={placeInfo?.imageUrl}/>}
            </div>
            <hr></hr>

            <div className={styles.section}>
                <div className={styles.sectionFlex}>
                    <h4 className={styles.titleHeader2}>The Story</h4>
                    { (currentAudio) ? <button className={styles.listenButton} onClick={toggleAudio}>{ isPlaying && "Pause" }{ !isPlaying && "Listen"} {" " + parseInt(currentTime) + "/" + parseInt(totalTimeAudio)}  <FaHeadphonesAlt style={{display: "inline-block"}}/> </button> : <button className={styles.listenButton} onClick={toggleAudio}> Loading... <FaHeadphonesAlt style={{display: "inline-block"}}/> </button>}
                </div>
            </div>
            {placeInfo.description && <h6 className={styles.description}>  {placeInfo?.description}</h6>}
            
            <div className={styles.buttons2}>
                {visitedPlaces[findPathIDofPlace(placeInfo.id)][placeInfo.id] ? <button style={{"background": "red"}} className={styles.putBackButton} onClick={()=>{toggleVisitedPlace(placeInfo.id)}}>Unmark Place as Visited</button> : <button style={{"background": "green"}} className={styles.putBackButton} onClick={()=>{toggleVisitedPlace(placeInfo.id)}}>Mark Place As Visited</button>}
                <button className={styles.putBackButton} onClick={()=>{
                  if(isPlaying){
                    currentAudio.pause();
                    setIsPlaying(!isPlaying);
                  }
                  setPlaceInfoPopUpOpen(false);
                  }} >Close</button>
            </div>
        </div>
    </div>
</div> 
  );

}
