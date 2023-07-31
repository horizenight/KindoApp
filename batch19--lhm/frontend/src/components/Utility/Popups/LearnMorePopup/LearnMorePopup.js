import React, { useState, useEffect } from "react";
import styles from './LearnMorePopup.module.css'
import { ReactComponent as CrossSvg } from '../../../../Icons/Cross.svg';
import { ReactComponent as Bookmark } from '../../../../Icons/Bookmark.svg';
import { ReactComponent as KindoAvatar } from '../../../../Icons/KindoAvatar.svg';
import * as C from '../../../../Constants'
import { FaGopuram, FaHeadphonesAlt } from 'react-icons/fa';

const LearnMorePopup = ({ marker, showPopup, setShowPopup, setShowTeaser, showTeaser, setVisitedPlaces, findPathIDofPlace }) => {

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
      const response = await fetch(C.API_URL + "/getSound/" + marker.id);
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

  if (currentAudio) {
    currentAudio.addEventListener("timeupdate", function () {
      let time = this.currentTime;
      setCurrentTime(parseInt(time));
    });
  }


  const toggleAudio = () => {

    if (isPlaying) {
      currentAudio.pause();
      console.log("paused")
    }
    else {
      currentAudio.play();
      console.log("played")
    }
    setIsPlaying(!isPlaying)
  }

  const toggleVisitedPlace =  (placeID) => {
    let pathID = findPathIDofPlace(placeID);
    if(pathID){
      setVisitedPlaces((visitedPlaces)=>{
        const newState = JSON.parse(JSON.stringify(visitedPlaces))
        newState[pathID][placeID] = true;
        return newState;
      })
    }
  }


  useEffect(() => { fetchSoundData(); }, []);

  return (<>
    {marker && <div className={styles.popup}>
      <div className={styles.popupFrame}>

        <div className={styles.popupHeadingBlock}>

          <div className={styles.popupBanner}>

            <div className={styles.avatarBlock}>
              <div className={styles.avatarFrame}>
                <span className={styles.kindoAvatar}>
                  <KindoAvatar />
                </span>
              </div>

            </div>
            <div className={styles.BookmarkBlock}>
              <button className={styles.Bookmark}>
                <Bookmark />
              </button>
            </div>

            <button className={styles.cross} onClick={() => {
              setShowPopup(!showPopup)
              setShowTeaser(!showTeaser)
              if(isPlaying){
                currentAudio.pause();
                setIsPlaying(!isPlaying);
              }
            }}>
              <CrossSvg />
            </button>
          </div>




          <div className={styles.popupHeadingTextBlock}>

            <span className={styles.popupHeadingText}>
              {marker.name}
            </span>

          </div>
          <div className={styles.popupHeadingLineBlock}>

            <span className={styles.popupHeadingLine}></span>
          </div>

        </div>

        <div className={styles.popupBodyBlock}>
          <div className={styles.popupImageBlock}>
            <div className={styles.ImageBlock}>
              <img className={styles.Image} src={marker.imageUrl} alt="marker image" />
            </div>
            <span className={styles.ImageCaption}>
              {marker.imageCaption}
            </span>
          </div>
          <div className={styles.sectionFlex}>
            <h4 className={styles.titleHeader2}>The Story</h4>
            {(currentAudio) ? (
              <button
                className={styles.listenButton}
                onClick={toggleAudio}
                disabled={!currentAudio}
              >
                {isPlaying ? "Pause " : "Listen "} {" " + parseInt(currentTime) + "/" + parseInt(totalTimeAudio) + " "}
                <FaHeadphonesAlt style={{ display: "inline-block" }} />
              </button>
            ) : (
              <button className={styles.listenButton} onClick={toggleAudio} disabled={true}>
                Loading... <FaHeadphonesAlt style={{ display: "inline-block" }} />
              </button>
            )}

          </div>


          <div className={styles.popupTextBlock}>
            <span className={styles.popupDescription} >
              {marker.description}
            </span>
          </div>
          <button className={styles.putBackButton} onClick={()=>{
                  if(isPlaying){
                    currentAudio.pause();
                    setIsPlaying(!isPlaying);
                  }
                  setShowPopup(false);
                  }} >Keep going!
          </button>


        </div>
      </div>



    </div>}
  </>

  )
}

export default LearnMorePopup