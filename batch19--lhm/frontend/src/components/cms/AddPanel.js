import { react, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CMS.module.css";
import * as C from '../../Constants'
import { Multiselect } from "multiselect-react-dropdown";
        

export default function AddPanel( {markerData, paths, categories, fetchPathsData, fetchMarkersData, fetchCategoriesData } ) {

  const postPlaceData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/addplace",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      fetchMarkersData();
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
      fetchCategoriesData();
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
      fetchPathsData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    if(tableName == CATEGORY){
      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      postCategoryData(requestOptions);
    }
    if(tableName == DISTRICT){
      data["places"] = selectedPlaces
      console.log(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      postPathData(requestOptions);
    }
    if(tableName == DESTINATION){
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
  const [tableName, setTableName] = useState(CATEGORY) 
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onCategorySelect = (selectedList, selectedItem) => {
    setSelectedCategory(selectedList)
  } 
  const onPlaceSelect = (selectedList, selectedItem) => {
    setSelectedPlaces(selectedList.map((e)=>(e.cat)))
  } 

  return (
    <div className={styles.addPanel}> 
        <div className={styles.navBarEdit }>
            <p className={styles.navBarEditText} style={tableName === CATEGORY ? {fontWeight: "bold", textDecoration: "underline"} : {}} onClick={()=>(setTableName(CATEGORY))}>{CATEGORY}</p>
            <p className={styles.navBarEditText} style={tableName === DISTRICT ? {fontWeight: "bold", textDecoration: "underline"} : {}} onClick={()=>(setTableName(DISTRICT))}>{DISTRICT}</p>
            <p className={styles.navBarEditText} style={tableName === DESTINATION ? {fontWeight: "bold", textDecoration: "underline"} : {}} onClick={()=>(setTableName(DESTINATION))}>{DESTINATION}</p>
        </div>
        {/* <div className={styles.title}>
            <p className={styles.textDesc}>Add new {tableName}</p>
            <p className={styles.textDescSub}>Input {tableName} details to add it to the database.</p>
        </div> */}
        <hr></hr>
        <div className={styles.forms}>
        {
            (tableName == CATEGORY) && 
            <div>
              <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Name</label>
                <input className={styles.inputField} {...register("name", { required: true})} />
                <label className={styles.label}>Icon URL</label>
                <input className={styles.inputField} {...register("icon", { required: true})} />
                <button type="form" className={styles.submitButton}>Add Category</button>
                </form>
            </div>
        }
        {
            (tableName == DISTRICT) && 
            <div>
              <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Name</label>
                <input className={styles.inputField} {...register("name", { required: true})} />
                <label className={styles.label}>Description</label>
                <textarea rows="4"  className={styles.inputField} {...register("description", { required: true})} />
                <label className={styles.label}>Headline</label>
                <input className={styles.inputField} {...register("headline", { required: true})} />
                <label className={styles.label}>Destinations</label>
                <Multiselect style={{"multiselectContainer": {"border": "1px solid rgb(114, 22, 22", "borderRadius": "4px", "fontSize": "1rem"}}} options={markerData} displayValue="key" onSelect={onPlaceSelect}  />
                <button type="form" className={styles.submitButton}>Add District</button>
                </form>
            </div>
        }
        {
            (tableName == DESTINATION) && 
            <div>
              <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Name</label>
                <input className={styles.inputField} {...register("name", { required: true})} />
                <label className={styles.label}>Description</label>
                <textarea rows="4"   className={styles.inputField} {...register("description", { required: true})} />
                <label className={styles.label}>Teaser</label>
                <input className={styles.inputField} {...register("teaser", { required: true})} />
                <label className={styles.label}>Image URL</label>
                <input className={styles.inputField} {...register("image_url", { required: true})} />
                <label className={styles.label}>Image Caption</label>
                <input className={styles.inputField} {...register("image_caption", { required: true})} />
                {/* <label className={styles.label}>Image Caption</label>
                <input className={styles.inputField} {...register("image_caption", { required: true})} /> */}
                <label className={styles.label}>Category</label>
                <Multiselect style={{"multiselectContainer": {"border": "1px solid rgb(114, 22, 22", "borderRadius": "4px", "fontSize": "1rem"}}} singleSelect={true} options={categories} displayValue="key" onSelect={onCategorySelect} />
                <label className={styles.label}>Latitude</label>
                <input className={styles.inputField} {...register("lat", { required: true})} />
                <label className={styles.label}>Longitude</label>
                <input className={styles.inputField} {...register("lng", { required: true})} />
                <button type="form" className={styles.submitButton}>Add Destination</button>
                </form>
            </div>
        }
        </div>
        <div className={styles.buttons}></div>
        </div>
  );
}
