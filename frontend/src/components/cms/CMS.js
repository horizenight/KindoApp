import { react, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CMS.module.css";
import * as C from '../../Constants'
import { Multiselect } from "multiselect-react-dropdown";
import AddPanel from "./AddPanel";
import EditPanel from "./EditPanel";
        

export default function CMS( {setAddPlace, fetchData } ) {
  
  const fetchMarkersData = async () => {
    try {
      const response = await fetch(C.API_URL+"/api/place/all");
      const data = await response.json();
      const convertedData = data.map((item) => ({
        ...item,
        "key": item.name,
        "cat": item.id
      }));
      console.log(convertedData)
      setMarkerData(convertedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPathsData = async () => {
    try {
      const response = await fetch(C.API_URL + "/api/path/all");
      const data = await response.json();
      const convertedData = data.map((item) => ({
        ...item,
      }));
      console.log(convertedData);
      setPaths(convertedData);
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
        "key": item.name,
        "cat": item.id
      }));
      console.log(data);
      setCategories(convertedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPathsData();
    fetchMarkersData();
    fetchCategoriesData();
    // the above fetches the position also updates the position
  }, []);

  const [markerData, setMarkerData] = useState([]);
  const [paths, setPaths] = useState([]);
  const [categories, setCategories] = useState(null);

  const ADD_STATE = "ADD_STATE"
  const EDIT_STATE = "EDIT_STATE"
  const [cmsState, setCmsState] = useState(ADD_STATE)

  return (

    <div className={styles.cmsScreen}>
        <div className={styles.cmsPanel}>
          <p className={styles.header}>Database</p>
          <hr></hr>
          <div className={styles.twoPanel}>
            <p className={styles.singlePanel} style={cmsState === ADD_STATE ? {fontWeight: "bold",  background: "#d1f2f7"} : {}} onClick={()=>(setCmsState(ADD_STATE))}>ADD ITEM</p>
            <p className={styles.singlePanel} style={cmsState === EDIT_STATE ? {fontWeight: "bold", background: "#d1f2f7"} : {}} onClick={()=>(setCmsState(EDIT_STATE))}>MODIFY ITEM</p>
          </div>
          {cmsState === ADD_STATE && <AddPanel markerData={markerData} categories={categories} paths={paths} fetchPathsData={fetchPathsData} fetchMarkersData={fetchMarkersData} fetchCategoriesData={fetchCategoriesData}/>}
          {cmsState === EDIT_STATE && <EditPanel markerData={markerData} categories={categories} paths={paths} fetchPathsData={fetchPathsData} fetchMarkersData={fetchMarkersData} fetchCategoriesData={fetchCategoriesData}/>}
        </div>
    </div>
  );
}
