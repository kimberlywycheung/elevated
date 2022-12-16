import React from "react";



class SelectSize extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: props.style.style_id,
      sku: props.sku,
      skus: props.skus,
      quantity: 'QUANTITY'
      // skusArr:
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('props', this.props);
    const target = event.target;
    const value = target.value;
    const name = target.name; //'sku' or 'quantity'


    this.setState({ [name]: value })
    if(name === 'sku') {
      this.setState({ quantity: '1' });

      this.render();
    } 

  }
  // console.log(event.target.value);


  handleSubmit(event) {
    const selection = {
      style: this.state.style,
      size: this.state.skus[this.state.sku].size,
      quantity: this.state.quantity
    };
    if (!window.localStorage.getItem('cart')) {
      window.localStorage.setItem('cart', JSON.stringify(selection));
    }
    alert('Added ' + this.props.style.name + ', Size: ' + this.state.skus[this.state.sku].size + ', Quantity: ' + this.state.quantity + ' to cart');
 
    event.preventDefault();
  }
  


  



  render() {
    let quantityArr = [];
    for (let i = this.state.skus[this.state.sku].quantity; i > 0; i--) {
      quantityArr.push(<option value={i} key={i}>{i}</option>)
    }
    //  console.log()
    return (
      <form className='ov-form' onSubmit={this.handleSubmit}>
        <div className='ov-form-1'>

          <div className="size-drop">
            {/* Size: */}
            <select name="sku" className='select-size-qty' value={this.state.size} onChange={this.handleChange}>



              <option value={0} key={99}>SIZE</option>

              {Object.keys(this.state.skus).map((sku, i) => { return <option value={sku} key={i}>{this.state.skus[sku].size}</option> })}
            </select>
          </div>

          <div className="quantity-drop">
            <select name="quantity" className='select-size-qty' value={this.state.quantity} onChange={this.handleChange}>
            <option value={0} key={99}>QUANTITY</option>
              {quantityArr}
            </select>
          </div>

        </div>
        <div className='ov-form-2'>
          {/* <input type="submit" value="Add to Cart" /> */}
          <button type='submit' className="add-cart-button">ADD TO CART</button>
          <button className="favorite-button"></button>
        </div>

      </form>
    );
  }
}
//♡
export default SelectSize;