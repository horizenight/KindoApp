import React from "react";
import styles from "./NavigationBar.module.css";
import { FaMap, FaBookOpen } from 'react-icons/fa';


const NavigationBar = ( {navigationBarScreen, setNavigationBarScreen, MAP, GUIDE} ) => {

  const navigateToMap = () => {
    setNavigationBarScreen(MAP)
  }

  const navigateToGuide = () => {
    setNavigationBarScreen(GUIDE)
  }

  return (
    <div className={styles.navigationBar}>
        <div className={styles.navigationFlex}>
            <button onClick={navigateToMap} className={styles.navigationButton} style={navigationBarScreen == MAP ? {"background": "#E5E3DF", "borderRadius": "5px", "color": "#292113"} : {}}><FaMap style={{"margin": "auto","font-size": "xx-large"}}/></button>
            <button onClick={navigateToGuide} className={styles.navigationButton} style={navigationBarScreen == GUIDE ? {"background": "#E5E3DF", "borderRadius": "5px", "color": "#292113"} : {}} ><FaBookOpen style={{"margin": "auto","font-size": "xx-large"}}/></button>
        </div>
    </div>
  );
};

export default NavigationBar;
