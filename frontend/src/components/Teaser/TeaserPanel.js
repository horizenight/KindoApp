import TeaserNavBar from "../Utility/NavBar/TeaserNavbar/TeaserNavBar";
import Teaser from "./Teaser";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

export default function TeaserPanel({
    setShowTeaser,showTeaser ,
    showPopup,
    setShowPopup,
    setTakeMeThere,
    userLocation,
    markerData,
    selectedMarker,
    setSelectedMarker,
    isPopupOpen,
    handlePopupClose,
    directions,
    setTargetMarker,
    activeItem, setActiveItem,  setDirections,
    setIsChallangeVisible,
    categories,
    startVideo
  }) {

  const [searchText, setSearchText] = useState("")
  const [filteredCategories, setFilteredCategories] = useState([])

  if(searchText != ""){
    markerData = markerData.filter((e)=>(e.name.toLowerCase().includes(searchText.toLowerCase())))
  }

  if(filteredCategories.length > 0){
    markerData = markerData.filter((e)=>(filteredCategories.includes(e.category)))
  }

  const toggleCategory = (category) => {
    if(filteredCategories.includes(category)){
        setFilteredCategories(filteredCategories.filter(e => e != category))
    }
    else{
        setFilteredCategories(filteredCategories.concat([category]))
    }
}

    
  
   
    return (
        <div>
            <TeaserNavBar categories={categories} markers={markerData} setSearchText={setSearchText} searchText={searchText} filteredCategories={filteredCategories} toggleCategory={toggleCategory} setShowTeaser={setShowTeaser}/>
            <Teaser
                setShowTeaser={setShowTeaser}
                showTeaser={showTeaser}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                setTargetMarker={setTargetMarker}
                setTakeMeThere={setTakeMeThere}
                userLocation={userLocation}
                markersData={markerData}
                selectedMarker={selectedMarker}
                setSelectedMarker={setSelectedMarker}
                isPopupOpen={isPopupOpen}
                handlePopupClose={handlePopupClose}
                directions={directions}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setDirections={setDirections}
                setIsChallangeVisible={setIsChallangeVisible}
                startVideo={startVideo}/>
        </div>
    );
  }
  