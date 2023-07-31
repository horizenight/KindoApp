import { react, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CMS.module.css";
import * as C from '../../Constants'
import { Multiselect } from "multiselect-react-dropdown";
import { FaEdit, FaTrashAlt,FaAngleDown } from 'react-icons/fa';
import ModifyCardCategory from "./ModifyCardCategory";
import ModifyCardPlace from "./ModifyCardPlace";
import ModifyCardPath from "./ModifyCardPath";
        

export default function EditPanel( {markerData, paths, categories, fetchPathsData, fetchMarkersData, fetchCategoriesData } ) {

  const postPlaceData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/addplace",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postCategoryData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/addCategory",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postPathData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/addPath",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    if(tableNameEdit == CATEGORY){
      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      postCategoryData(requestOptions);
    }
    if(tableNameEdit == DISTRICT){
      data["places"] = selectedPlaces
      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      postPathData(requestOptions);
    }
    if(tableNameEdit == DESTINATION){
      data["short_description"] = ""
      console.log(selectedCategory)
      data["category"] = selectedCategory[0]["key"]

      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      postPlaceData(requestOptions);
    }
    reset();
  };

  const CATEGORY = "Category"
  const DISTRICT = "District"
  const DESTINATION = "Destination"
  const [tableNameEdit, setTableName] = useState(CATEGORY) 
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onCategorySelect = (selectedList, selectedItem) => {
    setSelectedCategory(selectedList)
  } 
  const onPlaceSelect = (selectedList, selectedItem) => {
    setSelectedPlaces(selectedList.map((e)=>(e.cat)))
  } 
  console.log(categories)

  return (
    <div className={styles.addPanelIn}> 
        <div className={styles.navBarEdit }>
            <p className={styles.navBarEditText} style={tableNameEdit === CATEGORY ? {fontWeight: "bold", textDecoration: "underline"} : {}} onClick={()=>(setTableName(CATEGORY))}>{CATEGORY}</p>
            <p className={styles.navBarEditText} style={tableNameEdit === DISTRICT ? {fontWeight: "bold", textDecoration: "underline"} : {}} onClick={()=>(setTableName(DISTRICT))}>{DISTRICT}</p>
            <p className={styles.navBarEditText} style={tableNameEdit === DESTINATION ? {fontWeight: "bold", textDecoration: "underline"} : {}} onClick={()=>(setTableName(DESTINATION))}>{DESTINATION}</p>
        </div>
        <hr></hr>
        <div className={styles.modifyPanel}>
        {
            (tableNameEdit == CATEGORY) && 
            <div>
              {categories && categories.sort((a, b) => a.id > b.id ? 1 : -1).map((category) => {
                
              return(
                <ModifyCardCategory category={category} fetchCategoriesData={fetchCategoriesData} />
              )} )}
            </div>
        }
        {
            (tableNameEdit == DISTRICT) && 
            <div>
              {paths && paths.sort((a, b) => a.id > b.id ? 1 : -1).map((path) => {
                
              return(
                <ModifyCardPath path={path} fetchPathsData={fetchPathsData} markerData={markerData} />
              )} )}
            </div>
        }
        {
            (tableNameEdit == DESTINATION) && 
            <div>
              {markerData && markerData.sort((a, b) => a.id > b.id ? 1 : -1).map((place) => {
                
              return(
                <ModifyCardPlace place={place} fetchMarkersData={fetchMarkersData} categories={categories} />
              )} )}
            </div>
        }
        </div>
        <div className={styles.buttons}></div>
        </div>
  );
}
