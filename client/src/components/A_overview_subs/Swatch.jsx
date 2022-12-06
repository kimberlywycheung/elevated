import React from "react";

const Swatch = ({ oneStyle }) => {


  return (<div>
    <img src={oneStyle.photos[0].thumbnail_url} />
  </div>)
}

export default Swatch;