import styles from "./PathsDrawer.module.css";
import { Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function PathsDrawer( {markers, paths} ) {

  return (
    <div>
        {
        
            paths && paths.map( (path, index) => (
                <div key={index} > 
                <h2>{path.name}</h2>
                <h3>{path.description}</h3>
                <ul>
                {
                    path.places.map( (place,index) => (
                        <li key={index}> { markers[markers.findIndex( i => i.id == place) ].name } </li>
                    ))
                }
                </ul>
                  </div>
            ))
        
        }
    </div>
  );
}
