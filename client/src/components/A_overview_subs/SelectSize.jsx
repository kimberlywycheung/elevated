import React from "react";



class SelectSize extends React.Component {

  constructor(props) {
    super(props);
    // this.skusArr = Object.keys(props.skus);
    this.state = {

      sku: props.sku,
      skus: props.skus,
      quantity: 1
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
      <form onSubmit={this.handleSubmit}>
        <label>

          <div className="size-drop">
          Size:  
          <select value={this.state.size} onChange={this.handleChange}>
            {Object.keys(this.state.skus).map((sku) => { return <option>{this.state.skus[sku].size}</option> ; })}
          </select>
          </div>

          <div className="quantity-drop">
          Quantity:  
          <select value={this.state.quantity} onChange={this.handleChange}>
            <option>{this.state.quantity}</option>
          </select>
          </div>

        </label>
        <input type="submit" value="Add to Cart" /> <button className="favorite-button">♡</button>
      </form>
    );
  }
}

export default SelectSize;