import React from "react";

const MarkerList = ({ markers, selectedMarkerIndex, handleMarkerChange }) => {
  return (
    <div>
      {markers.map((marker, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`marker-${index}`}
            name="marker"
            value={index}
            checked={selectedMarkerIndex === index}
            onChange={handleMarkerChange}
          />
          <label htmlFor={`marker-${index}`}>{marker.name}</label>
        </div>
      ))}
    </div>
  );
};

export default MarkerList;
