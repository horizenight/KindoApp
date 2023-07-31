import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./PlacePopUp.module.css";
import { FaGopuram, FaHeadphonesAlt } from 'react-icons/fa';
import { Image } from "@chakra-ui/react";
import { show } from "dom7";

export default function PlacePopUp( { placeInfo,setInfoPopUpOpen, toggleAudio, isPlaying , closePopUp,setZoom,setShowTeaser, showTeaser} ) {
    const [infoFrame, setInfoFrame] = useState(false)
    
    const nextFrame = () => {
        setInfoFrame(true);
    }



    const putItBackOnTheMap = (id) => {
        closePopUp();
        setZoom(13);

        console.log(id);
    }



  return (
    <>

    { placeInfo && 
    <div>
    { !infoFrame ? <div className={styles.popup_frame}>
    <div className={styles.popup_box}>
       <div className={styles.icons}>
        <FaGopuram className={styles.icon}/>
       </div>
       <div className={styles.title}>
        <h4 className={styles.titleHeader}>Great Job!</h4>
        <p>You just arrived at your first memory!</p>
       </div>
       <div className={styles.placeImage}>
       {placeInfo.imageUrl &&  <Image className={styles.image} src={placeInfo?.imageUrl}/>}
       </div>
       <div className={styles.placeInfo}>
        <h3 className={styles.placeName}>{placeInfo.name}</h3>
        <h4 className={styles.placeText}>(You just need to read the tale to put it back on the map)</h4>
       </div>
       <div className={styles.buttons}>
        <button className={styles.readButton} onClick={nextFrame} >Read the Tale</button>
        <button className={styles.skipButton} onClick={closePopUp}>Skip</button>
       </div>
    </div>
</div> 
: 
<div className={styles.popup_frame2}>
    <div className={styles.popup_box2}>
        
        <div className={styles.icons2}>
            <FaGopuram className={styles.icon2}/>
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
                    {placeInfo?.id == "bfdf6903-1631-4143-a1b7-24c532fad74e" && <button className={styles.listenButton} onClick={toggleAudio}>{ isPlaying && "Pause" }{ !isPlaying && "Listen" }  <FaHeadphonesAlt style={{display: "inline-block"}}/> </button>}
                </div>
            </div>
            {placeInfo.description && <h6 className={styles.description}>  {placeInfo?.description}</h6>}
            
            <div className={styles.buttons2}>
                <button className={styles.putBackButton} onClick={()=>{putItBackOnTheMap(placeInfo.id)}} >Put it back on the map!</button>
            </div>
        </div>
    </div>
</div> 
}
</div>
}
</>
  );

}
