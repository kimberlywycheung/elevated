import React from "react";

const Swatch = ({ oneStyle, setStyle, style }) => {

  const clickHandler = (event) => {
    setStyle(oneStyle);
  }

  let url = oneStyle.photos[0].thumbnail_url;
  return (
    <div className='ov-style-container'>
      <img id={oneStyle === style ? "on" : "off"} onClick={clickHandler} className="ov-style-select swatch" src={url} />
    </div>

  )
}

export default Swatch;