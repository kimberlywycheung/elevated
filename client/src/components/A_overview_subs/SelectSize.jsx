import React from "react";



class SelectSize extends React.Component {

  constructor(props) {
    super(props);
    // this.skusArr = Object.keys(props.skus);
    this.state = {

      sku: props.sku,
      skus: props.skus,
      size: props.skus[props.sku].size
      // skusArr:
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ size: event.target.value });
    for (var key in this.state.skus) {
      if(this.state.skus[key].size === event.target.value) {
        this.setState({ sku: key })
      }
    }
    console.log(event.target.value);
  }

  handleSubmit(event) {
    alert('Current Size: ' + this.state.size);
    event.preventDefault();
  }



  render() {
  //  console.log()
  return (
    <form className='ov-form' onSubmit={this.handleSubmit}>
      <div className='ov-form-1'>

        <div className="size-drop">
        {/* Size: */}
        <select className='select-size-qty' value={this.state.size} onChange={this.handleChange}>
        <option defaultValue={true} value={0} key={99}>SELECT SIZE</option>
          {Object.keys(this.state.skus).map((sku, i) => { return <option value={i+1} key={i}>{this.state.skus[sku].size}</option> })}
        </select>
        </div>

        <div className="quantity-drop">
        {/* Quantity: */}
        <select className='select-size-qty' value={this.state.quantity} onChange={this.handleChange}>
          <option>QTY</option>
          <option>{this.state.quantity}</option>
        </select>
        </div>

      </div>
      <div className='ov-form-2'>
        {/* <input type="submit" value="Add to Cart" /> */}
        <button type='submit' className="add-cart-button">Add to Cart</button>
        <button className="favorite-button">♡</button>
      </div>

    </form>
  );
}
}
//♡
export default SelectSize;