import React from 'react';


const ImageGallery = ({style}) => {
  const [imageURL, setImageURL] = React.useState('https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg');

  React.useEffect(() => {
    if(style) {
      console.log('styles', style);
      setImageURL(style.photos[0].url);
    }
  }, [style]);

  return (
  <div className='image-gallery'>
    <img src={imageURL} className="ov-img"></img>
    <div className='ov-img-select'>Carousel</div>
  </div>
  )
}


export default ImageGallery;
