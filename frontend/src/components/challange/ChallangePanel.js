import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./ChallangePanel.module.css";
import { FaGopuram, FaHeadphonesAlt } from 'react-icons/fa';
import { Image } from "@chakra-ui/react";
import { ReactComponent as ChallangeBackground } from '../../media/challangeBackground.svg';
import { ReactComponent as HappyKindle } from '../../media/Kindo.svg';
import { ReactComponent as SadKindle } from '../../media/kindle.svg';

const TUTORIAL = "TUTORIAL"
const MAIN = "MAIN";
const FAIL = "FAIL";
const SUCCESS = "SUCCESS";

export default function ChallangePanel( {setIsChallangeVisible} ) {

    const [currentScreen, setCurrentScreen] = useState(TUTORIAL);
    const [selectedOption, setSelectedOption] = useState(-1);
   
    let mainImage = require('../../media/challange/main.png');
    let options = []
    for (let index = 1; index <= 9; index++) {
    options[index-1] = require('../../media/challange/Option'+index+'.png');
    }

    const checkAnswer = () => {
        if(selectedOption == 2){
            setCurrentScreen(SUCCESS)
        }
        else{
            setCurrentScreen(FAIL)
        }
    }

    const closeChallange = () => {
        setIsChallangeVisible(false);
    }

    const selectOption = (index) => {
        setSelectedOption(index)
    }

    let selectStyle = { "boxShadow": "0 0 5px 10px #e424ca" }

  return ( 
    <div className={styles.frame}>
        {currentScreen == TUTORIAL && <div className={styles.challangePanel}>
            <div className={styles.responsePanel}>
                <p className={styles.title}>Your first challange!</p>
                <p className={styles.subtitle}>Hello explorer!
                    <br></br>Welcome to your first challenge!</p>
                <HappyKindle className={styles.responseKindle}/>
                <button onClick={()=>(setCurrentScreen(MAIN))} className={styles.submitButton}>Let's do this!</button>
            </div>
        </div>}

        {currentScreen == MAIN && <div className={styles.challangePanel}>
            <p className={styles.title}>Your first challenge!</p>
            <p className={styles.subtitle}>Solve the challenge to collect your first gem on the map</p>
            <hr></hr>
            <p className={styles.descriptionText}>This picture is a zoomed in part of one of the landmarks around Olympiapark. Choose which landmark it is from the pictures below.</p>
            {/* <p className={styles.subText}>(You only have one attempt!)</p> */}
            <div className={styles.mainImagePanel}>
                <Image className={styles.mainImage} src={mainImage}></Image>
            </div>
            <div className={styles.optionImagesPanel}>
                <div className={styles.smallImages}>
                    {options.slice(0,3).map( (value, index) => ( 
                    <div onClick={()=>(selectOption(index))} key={index} className={styles.optionImagePanel}>
                        <Image style={ selectedOption == index ? selectStyle: {}}  key={index} className={styles.optionImage} src={value}></Image>
                    </div>))} 
                </div>
                <div className={styles.smallImages}>
                    {options.slice(3,6).map( (value, index) => ( 
                    <div onClick={()=>(selectOption(index+3))} key={index} className={styles.optionImagePanel}>
                        <Image style={ selectedOption == index+3 ? selectStyle: {}} key={index} className={styles.optionImage} src={value}></Image>
                    </div>))} 
                </div>
                <div className={styles.smallImages}>
                    {options.slice(6,9).map( (value, index) => ( 
                    <div onClick={()=>(selectOption(index+6))} key={index} className={styles.optionImagePanel}>
                        <Image style={ selectedOption == index+6 ? selectStyle: {}} key={index} className={styles.optionImage} src={value}></Image>
                    </div>))} 
                </div>
            </div>
            <button onClick={checkAnswer} className={styles.submitButton}>Submit</button>
        </div>}

        {currentScreen == SUCCESS && <div className={styles.challangePanel}>
            <div className={styles.responsePanel}>
                <p className={styles.title}>Awesome!!!</p>
                <p className={styles.subtitle}>First challange solved.</p>
                <p className={styles.subtitle}>Looks like you know Olympiapark to well already!</p>
                <HappyKindle className={styles.responseKindle}/>
                <button onClick={()=>(closeChallange())} className={styles.submitButton}>Keep Going!</button>
            </div>
        </div>}

        {currentScreen == FAIL && <div className={styles.challangePanel}>
            <div className={styles.responsePanel}>
                <p className={styles.title}>Oh no!!!</p>
                <p className={styles.subtitle}>You chose the wrong answer.</p>
                <p className={styles.subtitle}>It’s okay! Keep following me and you’ll know every detail of Olympiapark!</p>
                <SadKindle className={styles.responseKindle}/>
                <button onClick={()=>(setCurrentScreen(MAIN))} className={styles.retryButton}>One more try!</button>
                <button onClick={()=>(closeChallange())} className={styles.submitButton}>Go to the map</button>
            </div>
        </div>}
        <ChallangeBackground className={styles.background}/>
    </div> 
  );

}
