import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./VideoPanel.module.css";
import { FaGopuram, FaHeadphonesAlt } from 'react-icons/fa';
import { Image } from "@chakra-ui/react";
import { ReactComponent as ChallangeBackground } from '../../media/challangeBackground.svg';
import { ReactComponent as HappyKindle } from '../../media/Kindo.svg';
import { ReactComponent as SadKindle } from '../../media/kindle.svg';
import { ReactComponent as Achievement } from '../../media/achievement.png';

export default function VideoPanel( {videoEnded} ) {
   
    let mainImage = require('../../media/achievement.png');

  return ( 
    <div className={styles.frame}>
        <div className={styles.challangePanel}>
            <div className={styles.responsePanel}>
                <p className={styles.title}>Great Job!</p>
                <p className={styles.subtitle}>You just arrived at your
                    <br></br>first destination!</p>
                <div className={styles.mainImagePanel}>
                <Image className={styles.mainImage} src={mainImage}></Image>
                </div>
                <HappyKindle className={styles.responseKindle}/>
                <div>
                <button onClick={()=>(videoEnded(true))} className={styles.submitButton}>Read the story</button>
                <button onClick={()=>(videoEnded(false))} className={styles.keepButton}>Keep going</button>
                </div>
                
            </div>
        </div>
        <ChallangeBackground className={styles.background}/>
    </div> 
  );

}
