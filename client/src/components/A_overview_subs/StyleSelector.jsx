import React from "react";
import Swatch from "./Swatch.jsx";

const StyleSelector = ({ styles, style, setStyle }) => {

  if (style) {
    return (
      <div className="current-style">
        Style {'> ' + style.name}

        <div className="style-selector">
          {styles.map((oneStyle) => { return <Swatch oneStyle={oneStyle} /> })}
        </div>
      </div>)
  }

}


export default StyleSelector;