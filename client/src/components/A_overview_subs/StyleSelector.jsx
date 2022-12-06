import React from "react";


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