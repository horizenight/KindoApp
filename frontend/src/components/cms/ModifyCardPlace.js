import { react, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CMS.module.css";
import * as C from '../../Constants'
import { Multiselect } from "multiselect-react-dropdown";
import { FaEdit, FaTrashAlt,FaAngleDown } from 'react-icons/fa';
        

export default function ModifyCardPlace( {place, fetchMarkersData, categories} ) {
              
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const putPlaceData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/editPlace/"+place.id,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      fetchMarkersData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removePlace = async () => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        C.API_URL+"/removePlace/"+place.id,
        requestOptions
      );
      fetchMarkersData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
    data["category"] = selectedCategory[0]["key"]
    toggleMenu();
    console.log(data);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
      putPlaceData(requestOptions);
    }

  
  const { register, handleSubmit, reset } = useForm();

  const [selectedCategory, setSelectedCategory] = useState(categories.filter((e)=>(e.name == place.category)));
  
  const onCategorySelect = (selectedList, selectedItem) => {
    setSelectedCategory(selectedList)
  } 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
            <div className={styles.modifyCardFrame}>
              <div className={styles.modifyCard} id={place.id}>
                {place.name}
                <div className={styles.modifyButtons}>
                  <button className={styles.modifyEditButton} onClick={toggleMenu} ><FaEdit/>Edit</button>
                  <button className={styles.modifyRemoveButton} onClick={removePlace}><FaTrashAlt/>Delete</button>
                </div>
              </div>
              {isMenuOpen && <div className={styles.formsModify}>
              <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Name</label>
                <input defaultValue={place.name} className={styles.inputField} {...register("name", { required: true})} />
                <label className={styles.label}>Description</label>
                <textarea defaultValue={place.description} rows="4"   className={styles.inputField} {...register("description", { required: true})} />
                <label className={styles.label}>Teaser</label>
                <input defaultValue={place.teaser} className={styles.inputField} {...register("teaser", { required: true})} />
                <label className={styles.label}>Image URL</label>
                <input defaultValue={place.imageUrl} className={styles.inputField} {...register("image_url", { required: true})} />
                <label className={styles.label}>Image Caption</label>
                <input defaultValue={place.imageUrl} className={styles.inputField} {...register("image_caption", { required: true})} />
                {/* <label className={styles.label}>Image Caption</label>
                <input className={styles.inputField} {...register("image_caption", { required: true})} /> */}
                <label className={styles.label}>Category</label>
                <Multiselect selectedValues={selectedCategory} style={{"multiselectContainer": {"border": "1px solid rgb(114, 22, 22", "borderRadius": "4px", "fontSize": "1rem"}}} singleSelect={true} options={categories} displayValue="key" onSelect={onCategorySelect} />
                <label className={styles.label}>Latitude</label>
                <input defaultValue={place.lat} className={styles.inputField} {...register("lat", { required: true})} />
                <label className={styles.label}>Longitude</label>
                <input defaultValue={place.lng} className={styles.inputField} {...register("lng", { required: true})} />
                <button type="form" className={styles.submitButton}>Save</button>
                </form>
                </div> }

                <hr></hr>
            </div>
  );
}
