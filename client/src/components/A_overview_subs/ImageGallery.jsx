import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';


const ImageGallery = ({ style, styles }) => {
  const [imageURL, setImageURL] = React.useState('https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg');
  const [thumbnailURLs, setThumnailURLs] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageArr, setImageArr] = React.useState([]);
  const [imageRange, setImageRange] = React.useState([0,5])
  const [upView, setUpView] = React.useState({display: 'none'})
  const [downView, setDownView] = React.useState({display: 'none'})
  const [render, setRender] = React.useState(true);


  React.useEffect(() => {
    console.log('style changing')
    if (style) {
      setImageURL(style.photos[0].url);
      setRender(!render);
      setImageRange([0,5]);
    }
  }, [style]);

  React.useEffect(() => {

    if(style && imageRange) {
      setImageArr(style.photos.slice(imageRange[0],imageRange[1]));
      if(imageRange[1] < style.photos.length - 1) {
        setDownView({display: 'inline'});
      } else {
        setDownView({color: 'rgba(0,0,0,0)', backgroundColor: 'rgba(0,0,0,0)', cursor: 'default'});
      }
      if(imageRange[0]) {
        setUpView({display: 'inline'});
      } else {
        setUpView({color: 'rgba(0,0,0,0)', backgroundColor: 'rgba(0,0,0,0)', cursor: 'default'});
      }


    }
  }, [imageRange])

  const expandClickHandler = (event) => {
    setIsOpen(!isOpen);
  }

  const thumbClickHandler = (event, url) => {
    setImageURL(url);

  }
  const clickArrow = (direction) => {
    if(direction === 'up') {
      if(imageRange[0] !== 0) {
        setImageRange([imageRange[0] - 1, imageRange[1] - 1]);
      }
    } else {
      if(imageRange[1] !== style.photos.length - 1) {
        setImageRange([imageRange[0] + 1, imageRange[1] + 1]);
      }
    }
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
      {/* <div className='ov-carousel'> */}
        {/* <button className="left-arrow" /> */}
        <i className="fa-solid fa-arrow-up" style={upView} onClick={e => {e.preventDefault(); clickArrow('up')}}></i>
        <div className='ov-img-select'>
          {imageArr.map((photo, i) => { return <ImageCarousel imageURL={imageURL} render={render} thumbClickHandler={thumbClickHandler} key={i} photo={photo}  /> })}
        </div>
        <i className="fa-solid fa-arrow-down" style={downView} onClick={e => {e.preventDefault(); clickArrow('down')}}></i>
        {/* <button className="right-arrow" /> */}
      {/* </div> */}


    </div>
  )
}


export default ImageGallery;
