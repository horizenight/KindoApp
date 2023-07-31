import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styles from "./GuideNavigator.module.css";
import PathsGuide from "./PathsGuide";
import { FaSearch } from 'react-icons/fa';
import { filter } from "@chakra-ui/react";


const GuideNavigator = ( {markers, paths, setPlaceInfoPopUpOpen, setCurrentPlaceInfo, setPathInfoPopUpOpen, setCurrentPathInfo, setNavigationBarScreen, MAP, handleMarkerPosition, categories, setZoom} ) => {
const [searchText, setSearchText] = useState("")
const [filteredCategories, setFilteredCategories] = useState([])

if(searchText != ""){
    markers = markers.filter((e)=>(e.name.toLowerCase().includes(searchText.toLowerCase())))
}

if(filteredCategories.length > 0){
    markers = markers.filter((e)=>(filteredCategories.includes(e.category)))
}


const PLACES = "PLACES"
const SEARCH = "SEARCH"

const [guidePanelScreen, setGuidePanelScreen] = useState(PLACES)


const toggleCategory = (category) => {
    if(filteredCategories.includes(category)){
        setFilteredCategories(filteredCategories.filter(e => e != category))
    }
    else{
        setFilteredCategories(filteredCategories.concat([category]))
    }
}

console.log(filteredCategories)

  return (
    <div className={styles.guideNavigator}>
        <div className={styles.guideNavigatorBarPanel}>
            <div className={styles.searchBarPanel}>
                <div className={styles.searchBar}>
                    <input name="search" onChange={(value)=>{setSearchText(value.target.value)}} value={searchText}/>
                    <button><FaSearch/></button>
                </div>
                <div className={styles.filterBar}>
                    <div className={styles.filter}>
                        {categories && categories.map((category)=>(<div style={ filteredCategories.includes(category.name) ? { "background": "white"} : {} } onClick={()=>{toggleCategory(category.name)}} key={category.id} className={styles.categoryFilter}>{category.name}</div>))}
                    </div>
                </div>
            </div>
    
        </div>
        <div className={styles.guideNavigatorScreen}>
            {guidePanelScreen == PLACES && <PathsGuide markers={markers} paths={paths} setPlaceInfoPopUpOpen={setPlaceInfoPopUpOpen} setCurrentPlaceInfo={setCurrentPlaceInfo} setPathInfoPopUpOpen={setPathInfoPopUpOpen} setCurrentPathInfo={setCurrentPathInfo} setNavigationBarScreen={setNavigationBarScreen} MAP={MAP}  handleMarkerPosition={handleMarkerPosition} setZoom={setZoom} />}
            {guidePanelScreen == SEARCH && <div></div>}
        </div>
    </div>
  );
};

export default GuideNavigator;
