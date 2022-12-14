import React from "react";

const ImageCarousel = ({ photo, thumbClickHandler }) => {


  return  (
    <span onClick={(e) => thumbClickHandler(e, photo.url)} className='ov-mini-container'>
      {<img className='ov-mini-img' src={photo.thumbnail_url} /> }
    </span>
  )

   }
export default ImageCarousel;