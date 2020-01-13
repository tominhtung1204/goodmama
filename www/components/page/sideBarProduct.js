import React, { useState } from "react";
import Link from "next/link";

const SideBarProduct = props => {
  const [show, setShow] = useState(false);
  const changedShow = () => {
    setShow(!show);
  };
  return (
    <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
      <div className="sidebar">
        <h4 className="sidebar-title">Danh mục</h4>
        <ul className="sidebar-list">
          {props.category &&
            props.category.map(item => {
              if (item.children.length > 0) {
                return (
                  <React.Fragment key={item._id}>
                    <li>
                      <a onClick={changedShow}>
                        {item.title}{" "}
                        {!show && (
                          <i
                            className="fa fa-chevron-right float-right"
                            style={{ fontSize: "12px" }}
                          />
                        )}
                        {show && (
                          <i
                            className="fa fa-chevron-down float-right"
                            style={{ fontSize: "12px" }}
                          />
                        )}
                      </a>
                      {show && (
                        <ul style={{ paddingLeft: "10px" }}>
                          {item.children.map(i => (
                            <li
                              key={i._id}
                              onClick={() => props.filterByCategory(i._id)}
                            >
                              <a>{i.title}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </React.Fragment>
                );
              } else {
                return (
                  <li
                    key={item._id}
                    onClick={() => props.filterByCategory(item._id)}
                  >
                    <a>{item.title}</a>
                  </li>
                );
              }
            })}
        </ul>
      </div>

      <div className="sidebar">
        <h4 className="sidebar-title">Sản phẩm mới</h4>
        <div className="sidebar-product-wrap">
          {props.product &&
            props.product.data.map(item => (
              <div className="sidebar-product" key={item._id}>
                <Link href={`/product/${item.slug}`}>
                  <a className="image">
                    <img src={item.image[0].data.link} alt="" />
                  </a>
                </Link>

                <div className="content">
                  <Link href={`/product/${item.slug}`}>
                    <a className="title">{item.name}</a>
                  </Link>
                  <span className="price">{item.price.toLocaleString()} đ</span>
                  {/* <div className="ratting">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarProduct;
