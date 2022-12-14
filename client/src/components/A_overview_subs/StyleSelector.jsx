import React from "react";
import Swatch from "./Swatch.jsx";

const StyleSelector = ({ styles, style, setStyle }) => {


  return (style &&
    <div className="ov-styles-selector">
      <div className="ov-style-text">Style {'> ' + style.name}</div>
      <div>
        {styles.map((oneStyle, i) => { return <Swatch key={i} oneStyle={oneStyle} setStyle={setStyle} style={style} /> })}
      </div>
    </div>)
}




export default StyleSelector;