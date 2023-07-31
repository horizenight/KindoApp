import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import * as C from '../Constants'

export default function Form( {setAddPlace, fetchData } ) {
  const postData = async (requestOptions) => {
    try {
      const response = await fetch(
        C.API_URL+"/addplace",
        requestOptions
      );
      const data = await response.json();
      console.log(data);

    fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setAddPlace(false);
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    postData(requestOptions);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>Name of the Place</label>
      <input className={styles.inputField} {...register("name", { required: true})} />
      <label className={styles.label}>Description of the Place</label>
      <input className={styles.inputField} {...register("description", { required: true})} />
      <label className={styles.label}>Image of the Place</label>
      <input className={styles.inputField} {...register("imageUrl", { required: true})} />
      <label className={styles.label}>Latitude</label>
      <input className={styles.inputField} {...register("lat", { required: "Lat is required"})} />
      <label className={styles.label}>Longitude</label>
      <input className={styles.inputField} {...register("lng", { required: "Lng is required"})} />
      {(errors.name || errors.description || errors.imageUrl || errors.lng || errors.lat) && <p role="alert">{"The empty fields must be filled."}</p>}
      <div style={{display: "flex", flexDirection: "row"}} >
      <button type="form" className={styles.submitButton}>SUBMIT</button>
      <button type="form" onClick={() => {setAddPlace(false);}}>
        Cancel
      </button>
      </div>
    </form>
  );
}
