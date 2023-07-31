import React, { useState } from 'react';
import styles from './TeaserCard.module.css';
import CardButton from '../Utility/Buttons/CardButton/CardButton';
import LearnMorePopup from '../Utility/Popups/LearnMorePopup/LearnMorePopup';
import { ReactComponent as Bookmark } from '../../Icons/Bookmark.svg';
import { ReactComponent as KindoAvatar } from '../../Icons/KindoAvatar.svg';
import { ReactComponent as WalkingMan } from '../../Icons/Walking.svg';
import { ReactComponent as Clock } from '../../Icons/Clock.svg';
const TeaserCard = ({ setShowTeaser, showTeaser, setSelectedMarker, showPopup, setShowPopup, setTakeMeThere, userLocation, marker, setTargetMarker, setDirections, directions, setIsChallangeVisible, startVideo }) => {

  const handleTakeMeClick = (marker) => {
    fetchDirections(marker);
    setTakeMeThere(true);
    setTargetMarker(marker)
    setShowTeaser(false);

  };

  const handleLearnMoreClick = () => {
    setSelectedMarker(marker)
    setShowPopup(!showPopup);
    setShowTeaser(!showTeaser)

  }

  const fetchDirections = (marker) => {

    if (!userLocation) return;
    // console.log("Direction origin: ", userLocation);
    // console.log("Direction destination: ", marker);
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: userLocation,
        destination: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };


  return (
    <div className={styles.teaser_card}>

      <div className={styles.teaser_card_heading}>
        <div className={styles.teaser_card_logo_block}>

          <div className={styles.teaser_card_logo_block_frame}>
            <div className={styles.teaser_card_logo}>
              <KindoAvatar />
            </div>

          </div>

          <div className={styles.teaser_card_bookmark}><Bookmark /></div>
        </div>
        <div className={styles.teaser_card_heading_block}>
          <span className={styles.teaser_card_heading_text}>{marker.name}</span>
        </div>
        <div className={styles.teaser_card_heading_line}></div>
      </div>
      <div className={styles.teaser_card_body}>
        <div className={styles.teaser_card_image_block}>
          <img className={styles.teaser_card_image} src={marker.imageUrl} alt="teaser_pic" />
          <div className={styles.teaser_card_distance_data}>
            {directions && <div className={styles.teaser_card_distance_data_walking_frame}>
              <span className={styles.teaser_card_distance_data_walking_frame_icon} > <WalkingMan /></span>
              <span className={styles.teaser_card_distance_data_walking_frame_text} >{directions.routes[0].legs[0].duration.text}</span>
            </div>}
            {directions &&
              <div className={styles.teaser_card_distance_data_time_frame}>
                <span className={styles.teaser_card_distance_data_time_frame_icon} ><Clock /></span>
                <span className={styles.teaser_card_distance_data_time_frame_text} >{directions.routes[0].legs[0].distance.text}</span>
              </div>
            }

          </div>
        </div>
        <div className={styles.teaser_card_body_data}>
          <span className={styles.teaser_card_body_data_fact}>{marker.teaser}</span>
          {marker.category == "CHALLANGE" ?
            <div className={styles.teaser_card_body_data_buttons}>
              <CardButton className="lined" onClick={() => {
                setIsChallangeVisible(true);
              }}>Solve the Challange</CardButton>
              <CardButton className="filled" onClick={() => {
                handleTakeMeClick(marker);
              }}>
                Take Me there
              </CardButton>
            </div>
            :
            <div className={styles.teaser_card_body_data_buttons}>
              <CardButton className="lined" onClick={() => {
                handleLearnMoreClick(marker);
              }}>Learn More!</CardButton>
              <CardButton className="filled" onClick={() => {
                handleTakeMeClick(marker);
                console.log(marker.id)
                if(marker.id=="0ff2976a-8a70-4186-b35f-5846f07d73ac"){
                  startVideo()
                }
              }}>
                Take Me there
              </CardButton>
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default TeaserCard;
