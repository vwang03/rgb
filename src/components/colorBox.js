// ColorBox.jsx
import React from "react";

const ColorBox = ({ red, green, blue }) => {
  const boxStyle = {
    width: "300px",
    height: "150px",
    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    margin: "auto", // Center the box horizontally
    display: "flex",
    alignItems: "center", // Center the box vertically
    justifyContent: "center", // Center the box horizontally
    borderRadius: "10px", // Add rounded corners with a radius of 10px
    border: "1px solid #333", // Dark gray color for the border
    marginBottom: "15px", // Add 10px margin at the bottom
  };

  return <div style={boxStyle}></div>;
};

export default ColorBox;