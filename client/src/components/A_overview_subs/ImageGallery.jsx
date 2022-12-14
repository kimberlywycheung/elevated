import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';


const ImageGallery = ({ style, styles }) => {
  const [imageURL, setImageURL] = React.useState('https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg');
  const [thumbnailURLs, setThumnailURLs] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);
  const [render, setRender] = React.useState(true);


  React.useEffect(() => {
    if (style) {
      setImageURL(style.photos[0].url);
      setRender(!render);
    }
  }, [style]);

  const expandClickHandler = (event) => {
    setIsOpen(!isOpen);
  }

  const thumbClickHandler = (event, url) => {
    setImageURL(url);

  }


  return (style &&
    <div className='image-gallery'>
      <img src={imageURL} className="ov-img" onClick={expandClickHandler} style={{ cursor: 'zoom-in' }} />
      {isOpen &&
        <dialog
          className="dialog"
          style={{ position: "absolute", transform: "translate(0%, -70%)", zIndex: "2", cursor: "zoom-out" }}
          open
          onClick={expandClickHandler}
        >
          <img
            className="image"
            src={imageURL}
            onClick={expandClickHandler}
          />
        </dialog>}
      <div className='ov-carousel'>
        <button className="left-arrow" />
        <div className='ov-img-select'>
          {style.photos.map((photo) => { return <ImageCarousel render={render} thumbClickHandler={thumbClickHandler} photo={photo} /> })}
        </div>
        <button className="right-arrow" />
      </div>


    </div>
  )
}


export default ImageGallery;
