import React from 'react';

const SaleProduct = props => {
  const newArray =
    props.product &&
    props.product.data &&
    props.product.data.reduce(function(result, value, index, array) {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);
  return (
    <div
      className="new-arrival no-border-style ptb-90"
      style={{ paddingTop: 0 }}
    >
      <div className="container">
        <div className="section-title text-center">
          <h2>sale</h2>
        </div>
        <div className="our-pro-active owl-carousel">
          {newArray.map((data, index) => (
            <div key={index} className="dual-pro">
              {data.map(item => (
                <div key={item._id} className="single-makal-product">
                  <div className="pro-img">
                    <a href={`/product/${item.slug}`}>
                      <img src={item.image[0].path} alt="product-img" />
                    </a>
                    {item.newProduct && (
                      <span className="sticker-new">new</span>
                    )}
                    {item.saleProduct && (
                      <span className="sticker-sale">-{item.discount}%</span>
                    )}

                    <div className="quick-view-pro">
                      <a
                        data-toggle="modal"
                        data-target="#product-window"
                        className="quick-view"
                        href="#"
                      ></a>
                    </div>
                  </div>
                  <div className="pro-content">
                    <h4 className="pro-title">
                      <a href={`/product/${item.slug}`} as={`/product?slug=${item.slug}`}>{item.name}</a>
                    </h4>
                    <p>
                      <span className="price">
                        {item.price.toLocaleString() + ' đ'}
                      </span>
                      {item.saleProduct && item.oldPrice > 0 && (
                        <span className="prev-price">
                          {item.oldPrice.toLocaleString() + ' đ'}
                        </span>
                      )}
                    </p>
                    <div className="pro-actions">
                      <div className="actions-primary">
                        <a
                          href="cart.html"
                          className="add-to-cart"
                          data-toggle="tooltip"
                          data-original-title="Add to Cart"
                        >
                          Đặt hàng
                        </a>
                      </div>
                      <div className="actions-secondary">
                        <div className="rating">
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaleProduct;
