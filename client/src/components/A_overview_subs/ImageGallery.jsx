import React from 'react';


const ImageGallery = ({style, styles}) => {
  const [imageURL, setImageURL] = React.useState('https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg');
  const [thumbnailURLs, setThumnailURLs] = React.useState()

  React.useEffect(() => {
    if(style) {
      console.log('style', style);
      console.log('styles', styles);
      setImageURL(style.photos[0].url);
    }
  }, [style]);

  if(style){
  return (
  <div className='image-gallery'>
    <img src={imageURL} className="ov-img"></img>
      <div className='ov-img-select'>
        {style.photos.map((photo) => { return <span className='ov-mini-container'><img className='ov-mini-img' src={photo.thumbnail_url} /></span>})}
      </div>

  </div>
  )
}
}

export default ImageGallery;
