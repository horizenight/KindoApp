import { react, useState, useEffect, forceUpdate } from "react";
import { useForm } from "react-hook-form";
import styles from "./CMS.module.css";
import * as C from '../../Constants'
import { Multiselect } from "multiselect-react-dropdown";
import { FaEdit, FaTrashAlt,FaAngleDown } from 'react-icons/fa';
        

export default function ModifyCardCategory( {category, fetchCategoriesData} ) {

  console.log("categories" + category.id)
              
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const putCategoryData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/editCategoryData/"+category.id,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      fetchCategoriesData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeCategory = async (requestOptions) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        C.API_URL+"/removeCategory/"+category.id,
        requestOptions
      );
      fetchCategoriesData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
      console.log(data);
      toggleMenu();
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      putCategoryData(requestOptions);
    }


  const { register, handleSubmit, reset } = useForm();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
            <div className={styles.modifyCardFrame}>
              <div className={styles.modifyCard} id={category.id}>
                {category.name}
                <div className={styles.modifyButtons}>
                  <button className={styles.modifyEditButton} onClick={toggleMenu} ><FaEdit/>Edit</button>
                  <button className={styles.modifyRemoveButton} onClick={removeCategory}><FaTrashAlt/>Delete</button>
                </div>
              </div>
              {isMenuOpen && <div className={styles.formsModify} id={category.id+"x"}>
                    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    <label className={styles.label}>Name</label>
                    <input defaultValue={category.name} className={styles.inputField} {...register("name", { required: true})} />
                    <label className={styles.label}>Icon URL</label>
                    <input defaultValue={category.icon} className={styles.inputField} {...register("icon", { required: true})} />
                    <button type="form" className={styles.submitButton}>Save</button>
                    </form>
                </div> }

                <hr></hr>
            </div>
  );
}
