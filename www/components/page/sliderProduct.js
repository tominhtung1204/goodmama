import React, { Component } from "react";
import ItemProduct from "./itemProduct";

class SliderProduct extends Component {
  componentDidUpdate(nextProps) {
    if (nextProps.product !== this.props.product) {
      $(".related-product-slider").slick({
        arrows: true,
        dots: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 4,
        prevArrow:
          '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 767,
            settings: {
              autoplay: true,
              slidesToShow: 1,
              arrows: false
            }
          }
        ]
      });
    }
  }

  render() {
    return (
      <>
        <div className="section-title text-left col col mb-30">
          <h1>{this.props.title}</h1>
        </div>
        <div className="related-product-slider related-product-slider-1 col-12 p-0">
          {this.props.product &&
            this.props.product.data.map(item => (
              <div key={item._id} className="col">
                <ItemProduct item={item} />
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default SliderProduct;
