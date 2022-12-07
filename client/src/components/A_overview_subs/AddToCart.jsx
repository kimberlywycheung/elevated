import React from "react";
import SelectSize from "./SelectSize.jsx";
import SelectQuantity from "./SelectQuantity.jsx";
import AddButton from "./AddButton.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

const AddToCart = ({ sku, skus }) => {
  // console.log(skus);

  return (<div className="ov-add-to-cart">PLACEHOLDER: Add to Cart
    <SelectSize sku={sku} skus={skus} />
    {/* <SelectQuantity />
    <AddButton />
    <FavoriteButton /> */}
  </div>)

}

export default AddToCart;