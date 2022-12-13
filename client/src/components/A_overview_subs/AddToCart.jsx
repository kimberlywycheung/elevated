import React, { useEffect } from "react";
import SelectSize from "./SelectSize.jsx";
import SelectQuantity from "./SelectQuantity.jsx";
import AddButton from "./AddButton.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

const AddToCart = ({ sku, skus, style}) => {

  React.useEffect(() => {
    
  }, [style])
  // console.log(skus);

  return (<div className="ov-add-to-cart">
    <SelectSize sku={sku} skus={skus} style={style} />
    {/* <SelectQuantity />
    <AddButton />
    <FavoriteButton /> */}
  </div>)

}

export default AddToCart;