import React, { useState } from "react";
import Link from "next/link";
const ItemProduct = props => {
  const [price, setPrice] = useState("");

  const changePrice = event => {
    setPrice(event.target.value);
  };

  return (
    <div className="product-item">
      <div className="product-inner">
        <div className="image">
          <Link href={`/product/${props.item.slug}`}>
            <img src={props.item.image[0].data.link} alt="" />
          </Link>
        </div>

        <div className="content">
          <div className="content-left">
            <h4 className="title">
              <Link href={`/product/${props.item.slug}`}>
                <a>{props.item.name}</a>
              </Link>
            </h4>

            <div className="mb-10">
              <span className="price">
                {price.toLocaleString() || props.item.price.toLocaleString()} đ
              </span>
            </div>

            {/* <div className="ratting">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
              <i className="fa fa-star-o"></i>
            </div> */}
            {/*
            <div className="size">
              <span style={{ flex: "50%" }}>Kích cỡ:</span>
              <select
                onChange={changePrice}
                className="ml-1 form-control"
                value={price}
              >
                {props.item.size &&
                  props.item.size.length > 0 &&
                  props.item.size.map(size => (
                    <option key={size._id} value={size.price}>
                      {size.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="size">
              <span style={{ flex: "50%" }}>Số lượng:</span>
              <select
                onChange={changePrice}
                className="ml-1 form-control"
                value={price}
              >
                <option value={props.item.price.toLocaleString()}>1</option>
                {props.item.count &&
                  props.item.count.lenth > 0 &&
                  props.item.count.map(count => (
                    <option key={count._id} value={count.price}>
                      {count.name}
                    </option>
                  ))}
              </select>
            </div>
            <h5 className="color">
              Màu sắc:{" "}
              <span
                style={{
                  backgroundColor: `${props.item.color}`
                }}
              ></span>
            </h5> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemProduct;
