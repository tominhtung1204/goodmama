import React, { useEffect, Component } from "react";
import Link from "next/link";
import ItemProduct from "./itemProduct";

class NewProduct extends Component {
  componentDidUpdate(nextProps) {}
  render() {
    return (
      <div className="product-section section mt-10">
        <div className="container">
          <div className="row">
            {this.props.product &&
              this.props.product.data.length > 0 &&
              this.props.product.data.map((item, index) => {
                if (index < 2) {
                  return (
                    <div key={item._id} className="col-12 col-md-6">
                      <ItemProduct item={item} />
                    </div>
                  );
                } else {
                  return (
                    <div key={item._id} className="col-12 col-md-4">
                      <ItemProduct item={item} />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default NewProduct;
