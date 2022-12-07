import React from "react";
import Swatch from "./Swatch.jsx";

const StyleSelector = ({ styles, style, setStyle }) => {
//commented out for visibility
  if (style) {
    return (
      <div class="style-selector">
        <div class="current-style">Style {'> ' + style.name}</div>
        <div class="style-selector">
          (images hidden)
          {/* {styles.map((oneStyle) => { return <Swatch oneStyle={oneStyle} /> })} */}
        </div>
      </div>)
  }

}


export default StyleSelector;