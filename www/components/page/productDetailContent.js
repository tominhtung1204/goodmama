import React, { useState } from "react";

const ProductDetailContent = props => {
  const [price, setPrice] = useState("");

  const changePrice = event => {
    setPrice(event.target.value);
  };
  return (
    <div className="col-lg-7 col-12 mb-40">
      <div className="single-product-content">
        <div className="head">
          <div className="head-left">
            <h3 className="title">{props.product.name || ""}</h3>

            <div className="ratting">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
              <i className="fa fa-star-o"></i>
            </div>
          </div>

          <div className="head-right">
            <span className="price">
              {price.toLocaleString() || props.product.price.toLocaleString()} đ
            </span>
          </div>
        </div>

        <div className="description">
          <p>{props.product.shortDescription}</p>
        </div>

        <span className="availability">
          Trạng thái: <span>Còn hàng</span>
        </span>

        <div className="quantity-colors">
          <div className="colors">
            <h5>Màu sắc:</h5>
            <div className="color-options">
              <button style={{ backgroundColor: props.product.color }}></button>
            </div>
          </div>
          <div className="quantity">
            <h5>Kích cỡ:</h5>
            <select
              style={{ height: "40px", width: "200px" }}
              onChange={changePrice}
              className="ml-1"
              value={price}
            >
              {props.product.size &&
                props.product.size.length > 0 &&
                props.product.size.map(count => (
                  <option key={count._id} value={count.price}>
                    {count.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="quantity-colors">
          <div className="quantity">
            <h5>Số lượng:</h5>
            <select
              style={{ height: "40px", width: "200px" }}
              onChange={changePrice}
              className="ml-1"
              value={price}
            >
              <option value={props.product.price.toLocaleString()}>1</option>
              {props.product.count &&
                props.product.count.lenth > 0 &&
                props.product.count.map(count => (
                  <option key={count._id} value={count.price}>
                    {count.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="actions">
          <button>
            <i className="ti-shopping-cart"></i>
            <span>Thêm vào giỏ hàng</span>
          </button>
        </div>
        <div className="share">
          <h5>Share: </h5>
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa fa-google-plus"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
