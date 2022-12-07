import React from "react";

const Swatch = ({ oneStyle }) => {

  let url = oneStyle.photos[0].thumbnail_url;
  return (
    <img class="swatch" src={url} />
  )
}

export default Swatch;