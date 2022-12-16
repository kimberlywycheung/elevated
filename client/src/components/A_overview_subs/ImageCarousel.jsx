import React from "react";

const ImageCarousel = ({ photo, thumbClickHandler, imageURL }) => {


  return  (
    <span onClick={(e) => thumbClickHandler(e, photo.url)} className='ov-mini-container'>
      {<img id={photo.url === imageURL ? "thumb-on" : "off"} className='ov-mini-img' src={photo.thumbnail_url} /> }
    </span>
  )

   }
export default ImageCarousel;