import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";

import PlacePopUp from "../PlacePopUp";
import Tooltip from "../Tooltip";
import NavigationBar from "../Utility/NavigationBar"
import GuideNavigator from "../Guide/GuideNavigator";
import PlaceInfoPopUp from "../PlaceInfoPopUp";
import PathInfoPopUp from "../PathInfoPopUp";

import { ReactComponent as MapTexture} from '../../media/mapTexture.svg';
import * as C from '../../Constants'
import './RenderMap.css'
import Teaser from "../Teaser/Teaser";
import TeaserNavBar from "../Utility/NavBar/TeaserNavbar/TeaserNavBar";
import LearnMorePopup from "../Utility/Popups/LearnMorePopup/LearnMorePopup";
import ChallangePanel from "../challange/ChallangePanel";
import TeaserPanel from "../Teaser/TeaserPanel";
import VideoPanel from "../video/VideoPanel";
const RenderMap = () => {
  // const promptUserLocation={ lat: 48.171136077147395, lng: 11.557130572166784} 
  const [userLocation, setUserLocation] = useState({ lat: 48.1351, lng: 11.5820 } || null);
  // const [userLocation, setUserLocation] = useState(promptUserLocation || null);
  const [markerData, setMarkerData] = useState([]);
  const [directions, setDirections] = useState();
  const [selectedMarker, setSelectedMarker] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
  const [isLocationMatch, setIsLocationMatch] = useState(false); // State to track if userLocation matches selectedMarker
  const[targetMarker,setTargetMarker] =useState(false);
  const [onBoarding, setOnboarding] = useState(true);
  const [isInfoPopUpOpen, setInfoPopUpOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [showTeaser,setShowTeaser] = useState(false);
  const [takeMeThere,setTakeMeThere] = useState(false);
  const [isPlaceInfoPopUpOpen, setPlaceInfoPopUpOpen] = useState(false);
  const [currentPlaceInfo, setCurrentPlaceInfo] = useState();
  const [showPopup,setShowPopup] = useState(false);
  const [isPathInfoPopUpOpen, setPathInfoPopUpOpen] = useState();
  const [currentPathInfo, setCurrentPathInfo] = useState();
  const [isChallangeVisible, setIsChallangeVisible] = useState(false);
  const [recommendItem , setRecommendItem ] = useState(0)
  const [isVideoEnded, setIsVideoEnded] = useState(false)

  const MAP = "MAP"
  const GUIDE = "GUIDE"
  const [navigationBarScreen, setNavigationBarScreen] = useState(MAP)

  const [paths, setPaths] = useState([]);
  const [categories, setCategories] = useState(null);

  const [visitedPlaces, setVisitedPlaces] = useState({});
  // variable that renders tutorial
  const[tut ,setTut] = useState(null);

  const setupVisitedPlaces = (paths) => {
     const visited = {}
     paths.map((path) => {
      visited[path.id] = {};
      path.places.map((place) => {visited[path.id][place] = false})
    })
    setVisitedPlaces(visited);
  }

  const findPathIDofPlace = (placeID) => {
    let pathID = null;
    for (const path in visitedPlaces) {
      if (placeID in visitedPlaces[path]) {
         return path;
      }
    }
    return pathID;
  }


const fetchPathsData = async () => {
  try {
    const response = await fetch(C.API_URL + "/api/path/all");
    const data = await response.json();
    const convertedData = data.map((item) => ({
      ...item,
    }));
    console.log(data);
    setPaths(convertedData);
    setupVisitedPlaces(convertedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

      const fetchCategoriesData = async () => {
         try {
           const response = await fetch(C.API_URL+"/api/category/all");
           const data = await response.json();
           const convertedData = data.map((item) => ({
             ...item,
           }));
           console.log(data);
           setCategories(convertedData);
         } catch (error) {
           console.error("Error fetching data:", error);
         }
      };

  //const center = useMemo(() => (userLocation || { lat: 48.1351, lng: 11.5820 }), [userLocation]);
  const [center,setCenter] = useState({ lat: 48.17000485674202, lng: 11.552211057307701 });
  const [zoom, setZoom] = useState(10)
  const mapRef = useRef();
  const styleArray =  [{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
      "color": "#EBE2CD",
      "visibility": "on",
      "saturation": 0
    }]
  }, {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{
      "color": "#DFD1AE",
      "visibility": "on",
      "saturation": 0
    }]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#A7B07C",
      "visibility": "on",
      "saturation": 0
    }]
  }, {
    "featureType": "water",
    "elementType": "",
    "stylers": [{
      "color": "#B9D3C2",
      "visibility": "on",
      "saturation": 0
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "visibility": "off"
    }]
  }]
  
  
  const options = useMemo(
    () => ({
      styles: styleArray,
      disableDefaultUI: true,
      clickableIcons: false,
      // gestureHandling: "cooperative",
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const fetchMarkersData = async () => {
    try {
      const response = await fetch(C.API_URL+"/api/place/all");
      const data = await response.json();
      const convertedData = data.map((item) => ({
        ...item,
      }));
      setMarkerData(convertedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Geolocation permission granted
        const { latitude, longitude } = position.coords;
        console.log("inside getCurrentPositionLatitude:", latitude);
        // Perform further actions with the retrieved location
        // ...
      },
      (error) => {
        // Geolocation permission denied or error occurred
        console.log("Geolocation error:", error);
  
        // Prompt the user to enable geolocation permission manually
        console.log("Please enable geolocation in your browser settings or preferences to proceed.");
      }
    );
  }, []);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setUserLocation(userLocation);
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
        {
          maximumAge: 0, // Force position update every time
          timeout: 3000, // Set a shorter timeout value (e.g., 5 seconds)
        }
      );
  
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      const error = "Geolocation is not supported by this browser.";
      console.error(error);
    }
  }, []);
  
  console.log(selectedMarker)

  useEffect(() => {
    fetchPathsData();
    fetchMarkersData();
    fetchCategoriesData();
    // the above fetches the position also updates the position
  }, []);

  useEffect(() => {
    console.log("geolocation error at here ")
    getLocation();
  }, [getLocation]);
  




  useEffect(() => {
    if (userLocation && targetMarker) {
      const { lat: userLat, lng: userLng } = userLocation;
      const { lat: markerLat, lng: markerLng } = targetMarker;
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(userLat, userLng),
        new window.google.maps.LatLng(markerLat, markerLng)
      );
      if (distance <= 30) {
        setIsLocationMatch(true);
        setDirections(null);
        setInfoPopUpOpen(true);
        console.log("Destination reached");
        setShowTeaser(false)
        setZoom(10)
      } else {
        setIsLocationMatch(false);
      }
    } else {
      setIsLocationMatch(false);
    }
  }, [userLocation, targetMarker]);
  // this useeffect mathces the targetMarker location with the userLocation

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

const handleMarkerClick = useCallback((marker) => {
  const index = markerData.findIndex((item) => item.id === marker.id);
  if (index !== -1) {
    setActiveItem(index);
    setSelectedMarker(marker);
    setIsPopupOpen(true);

    setShowTeaser(true);
  }
}, [markerData]);

const handleChallangeClick = () => {
  setActiveItem(markerData.length)
  setIsPopupOpen(true);
  setShowTeaser(true);
  setSelectedMarker("CHALLANGE");
}

  const handlePopupClose = useCallback(() => {
    setIsPopupOpen(false);

  }, []);

  const closePopUp = () => {
    setInfoPopUpOpen(false);
    // we have to remove target marker 
    setTargetMarker(null);
    setShowTeaser(true)


    // we have to reset 
    setZoom(13)
}

const handleMarkerPosition = (lat, lng) => {
  const activeMarker = markerData[activeItem];
  
  if (activeMarker) {
    const activeMarkerPosition = {
      lat: parseFloat(activeMarker.lat),
      lng: parseFloat(activeMarker.lng),
    };
    setCenter(activeMarkerPosition);
    setZoom(13);
  }
};

const handleSelectedMarker = () => {
  if (paths && paths.length > 1) { // Add a null check for `paths`
    setSelectedMarker(markerData[activeItem]);
  }
};
useEffect(() => {
  handleMarkerPosition();
  handleSelectedMarker();
  if(selectedMarker){
    fetchDirections(selectedMarker)
    setTakeMeThere(false);
    setZoom(13)
  }
}, [activeItem, paths]); // Add `paths` as a dependency


const getReccomendation = () => {
  
    const apiUrl = `https://5pbg43t105.execute-api.eu-central-1.amazonaws.com/live/location?lat=${userLocation.lat}&lng=${userLocation.lng}`;
    console.log(apiUrl)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecommendItem(data.index);
        
        console.log(data)
        setActiveItem(data.index);

      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
}

useEffect(() => {
  if (isLocationMatch) {
    getReccomendation()
  }
}, [isLocationMatch]);


const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};


const startVideo = ()=>{
  setTimeout(function() {
    
  setIsVideoEnded(true)
  }, 3000);
}
const videoEnded = (param)  => {
  setIsVideoEnded(false)
  if(param){
    setSelectedMarker(markerData.filter((place)=>(place.id == "0ff2976a-8a70-4186-b35f-5846f07d73ac"))[0])
    setShowPopup(true)
  }
  
}

  return (
    <div className="container">
    {isChallangeVisible && <ChallangePanel setIsChallangeVisible={setIsChallangeVisible}/>}
    {isVideoEnded && <VideoPanel videoEnded={videoEnded} isVideoEnded={isVideoEnded} />}
  
      {/* <NavigationBar navigationBarScreen={navigationBarScreen} setNavigationBarScreen={setNavigationBarScreen} MAP={MAP} GUIDE={GUIDE} /> */}

      <div className="map" style={ navigationBarScreen == MAP ? {"display": "block"} : {"display": "none" }}>
      <div className="map-container">
    <div className="map-texture-overlay">
      <MapTexture className="map-texture" />
    </div>
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onLoad}
    >
          {directions && takeMeThere && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
      {userLocation &&<Circle center={userLocation} radius={30} options={closeOptions} />}

          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: require("../../media/HappyKindo.png"),
                fillColor: "#000",
                scaledSize: new window.google.maps.Size(40, 50),
                zIndex:10
              }}
            />
          )}
          {userLocation && (
            <Marker
              position={{lat: parseFloat("48.17453737931759"),lng: parseFloat("11.552523939790126")}}
              icon={{
                url: selectedMarker === "CHALLANGE"
                  ? require("../../media/ChallangeIcon.svg").default
                  : require("../../media/challangePinBlack.svg").default,
                fillColor: "#000",
                scaledSize: selectedMarker === "CHALLANGE"
                  ? new window.google.maps.Size(45, 45)
                  : new window.google.maps.Size(35, 35),
              }}
              onClick={() => {
                handleChallangeClick(selectedMarker);
              }}
            />
          )}
          {/* <MarkerClusterer> */}
          {selectedMarker && paths &&  (
  <Marker
    position={{ lat: parseFloat(selectedMarker.lat), lng: parseFloat(selectedMarker.lng) }}
    icon={{
      url: paths &&  paths[1].places.includes(selectedMarker.id)
        ? require("../../Icons/KindleFocus.svg").default
        : require("../../Icons/KindleFocus.svg").default,
      fillColor: "#000",
      scaledSize: new window.google.maps.Size(45, 45),
    }}
    
    onClick={() => {
      handleMarkerClick(selectedMarker);
      fetchDirections(selectedMarker);
    }}
  />
)}

            {
              paths && markerData.map((marker) => (
                <Marker
                  key={marker.id}
                  icon={{
                    url: paths[1].places.includes(marker.id) ? (require('../../Icons/KindleGray.svg').default) : (require('../../Icons/KindleGray.svg').default),
                    fillColor: '#000',
                    scaledSize: new window.google.maps.Size(35, 35),
                  }}
                  position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                  onClick={() => {handleMarkerClick(marker)
                    fetchDirections(marker);
                  }}
                />
              ))
            }
          {/* </MarkerClusterer> */}
        </GoogleMap>
      </div>
      </div>
      
      

      <div style={navigationBarScreen == GUIDE ? {"height":"100%"}:{"display":"none"}}><GuideNavigator markers={markerData} paths={paths} setPlaceInfoPopUpOpen={setPlaceInfoPopUpOpen} setCurrentPlaceInfo={setCurrentPlaceInfo} setPathInfoPopUpOpen={setPathInfoPopUpOpen} setCurrentPathInfo={setCurrentPathInfo} setNavigationBarScreen={setNavigationBarScreen} MAP={MAP} handleMarkerPosition={handleMarkerPosition} categories={categories} setZoom={setZoom} /></div>
      {/* {selectedMarker && ( <Teaser selectedMarker={selectedMarker}
          isPopupOpen={isPopupOpen}
          handlePopupClose={handlePopupClose}
          directions={directions}
          setTargetMarker={setTargetMarker}
        />
      )} */}

      {showPopup && <LearnMorePopup marker ={selectedMarker} showPopup={showPopup} setShowPopup={setShowPopup} setShowTeaser={setShowTeaser} showTeaser= {showTeaser} setVisitedPlaces={setVisitedPlaces} findPathIDofPlace={findPathIDofPlace}/>}
      
      {showTeaser &&  

      <>
        <TeaserPanel
          setShowTeaser={setShowTeaser}
          showTeaser={showTeaser}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          setTargetMarker={setTargetMarker}
          setTakeMeThere={setTakeMeThere}
          userLocation={userLocation}
          markerData={markerData}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          isPopupOpen={isPopupOpen}
          handlePopupClose={handlePopupClose}
          directions={directions}
          setZoom={setZoom}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setDirections={setDirections}
          setIsChallangeVisible={setIsChallangeVisible}
          categories={categories}
          startVideo={startVideo}
        />
      </>
      
  
            }
      
      {/* // component that shows up when we are at target location  */}
      {/* {isLocationMatch && <PlacePopUp/>} */}
      {onBoarding && <Tooltip setOnboarding={setOnboarding} setShowTeaser={setShowTeaser}/>}
      {isLocationMatch && markerData.length!=0 && isInfoPopUpOpen && <PlacePopUp  placeInfo={targetMarker} setInfoPopUpOpen={setInfoPopUpOpen} closePopUp={closePopUp} setZoom={setZoom} setShowTeaser={setShowTeaser} />}
      
      {isPlaceInfoPopUpOpen && <PlaceInfoPopUp placeInfo={currentPlaceInfo} setPlaceInfoPopUpOpen={setPlaceInfoPopUpOpen} setVisitedPlaces={setVisitedPlaces} findPathIDofPlace={findPathIDofPlace} visitedPlaces={visitedPlaces} />}
      {isPathInfoPopUpOpen && <PathInfoPopUp markers={markerData} pathInfo={currentPathInfo} setPathInfoPopUpOpen={setPathInfoPopUpOpen} visitedPlaces={visitedPlaces} />}
      

    </div>
  );
};

export default RenderMap;
