import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Tooltip.module.css";
import { FaTimes } from 'react-icons/fa';
import { ReactComponent as LaughKindle } from '../media/Kindo.svg';
import { ReactComponent as HappyKindle } from '../media/HappyKindo.svg';

export default function Tooltip( {setOnboarding,setShowTeaser} ) {

  const texts = [
    'Hello explorer!\nI’m very glad to see you here! \nMy name is Kindo. I’m a guardian of the past..',
    "My mission here is to preserve the history of Munich and pass it on to curious explorers like you!\nJust follow me and I’ll be your personal guide!",
    "This is so exciting! Let’s explore together the iconic landmarks and walk the cobblestone streets of Munich!",
  ]
  const nextButtonTexts=[
    "Hello Kindo!", "Sounds great!", "Let's Go!"
  ]
  const prevButtonTexts=[
    "", "Back","Back"
  ]

  const kindleStates = [LaughKindle, LaughKindle, HappyKindle]

  const [currentText, setText] = useState(texts[0]);
  const [currentNextButtonText, setNextButtonText] = useState(nextButtonTexts[0]);
  const [currentPrevButtonText, setPrevButtonText] = useState(prevButtonTexts[0]);
  const [currentKindle, setKindle] = useState(kindleStates[0]);
  const [currentTextIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setText(texts[currentTextIndex]);
    setNextButtonText(nextButtonTexts[currentTextIndex]);
    setPrevButtonText(prevButtonTexts[currentTextIndex]);
    setKindle(kindleStates[currentTextIndex]);
  }, [currentTextIndex]);

  const nextText = () => {
    setTextIndex((currentText)=>(currentText+1));
  }

  const prevText = () => {
    setTextIndex((currentText)=>(currentText-1));
  }

  const letsGo = () => {
    setOnboarding(false);
    setShowTeaser(true)
    
  }

  const noThanks = () => {
    setOnboarding(false);
    setShowTeaser(true)
  }



  return (
    <div className={styles.tooltip_frame}>
        <div className={styles.tooltip_box}>
            <button className={styles.closeButton} onClick={noThanks}><FaTimes/></button>
            <p className={styles.text} style={{"white-space": "break-spaces", "textAlign": "left"}}>{currentText}</p>
            <div className={styles.button_box}>
              <button className={ currentTextIndex > 0 && styles.prevButton } onClick={prevText}>{currentTextIndex > 0 &&  currentPrevButtonText }</button>
            
            {currentTextIndex < texts.length - 1 ? <button className={styles.nextButton} onClick={nextText}>{currentNextButtonText}</button> : <button onClick={letsGo} className={styles.nextButton}>{currentNextButtonText}</button> }
            </div>
            
        </div>
        {
          currentKindle == LaughKindle && <LaughKindle className={styles.kindle}/>
        }
        {
          currentKindle == HappyKindle && <HappyKindle className={styles.kindle}/>
        }
    </div>
  );
}
