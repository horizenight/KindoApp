import { react, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CMS.module.css";
import * as C from '../../Constants'
import { Multiselect } from "multiselect-react-dropdown";
import { FaEdit, FaTrashAlt,FaAngleDown } from 'react-icons/fa';
        

export default function ModifyCardPath( {path, fetchPathsData, markerData} ) {
  
  console.log(markerData)
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const putPathData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/editPath/"+path.id,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      fetchPathsData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removePath = async () => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        C.API_URL+"/removePath/"+path.id,
        requestOptions
      );
      fetchPathsData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
      data["places"] = selectedPlaces
      console.log(data);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      putPathData(requestOptions);
    }


  const { register, handleSubmit, reset } = useForm();

  const [selectedPlaces, setSelectedPlaces] = useState(markerData.filter((place)=>(path.places.some(pathPlace => pathPlace == place.id))));
  

  const onPlaceSelect = (selectedList, selectedItem) => {
    setSelectedPlaces(selectedList.map((e)=>(e.cat)))
  } 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
            <div className={styles.modifyCardFrame}>
              <div className={styles.modifyCard} id={path.id}>
                {path.name}
                <div className={styles.modifyButtons}>
                  <button className={styles.modifyEditButton} onClick={toggleMenu} ><FaEdit/>Edit</button>
                  <button className={styles.modifyRemoveButton} onClick={removePath}><FaTrashAlt/>Delete</button>
                </div>
              </div>
              {isMenuOpen && <div className={styles.formsModify}>
              <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Name</label>
                <input key={path.name} defaultValue={path.name} className={styles.inputField} {...register("name", { required: true})} />
                <label className={styles.label}>Description</label>
                <textarea key={path.name} defaultValue={path.description}  rows="4"  className={styles.inputField} {...register("description", { required: true})} />
                <label className={styles.label}>Headline</label>
                <input key={path.name} defaultValue={path.headline}  className={styles.inputField} {...register("headline", { required: true})} />
                <label className={styles.label}>Destinations</label>
                <Multiselect key={path.name} selectedValues={selectedPlaces} style={{"multiselectContainer": {"border": "1px solid rgb(114, 22, 22", "borderRadius": "4px", "fontSize": "1rem"}}} options={markerData} displayValue="key" onSelect={onPlaceSelect}  />
                <button type="form" className={styles.submitButton}>Save</button>
              </form>
                </div> }

                <hr></hr>
            </div>
  );
}
