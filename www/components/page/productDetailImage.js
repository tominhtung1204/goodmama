import React, { Component } from "react";

class ProductDetailImage extends Component {
  componentDidMount() {
    const $easyzoom = $(".easyzoom").easyZoom();
    const api1 = $easyzoom
      .filter(".easyzoom--with-thumbnails")
      .data("easyZoom");
    $(".pro-thumb-img").on("click", "a", function(e) {
      const $this = $(this);

      e.preventDefault();

      api1.swap($this.data("standard"), $this.attr("href"));
    });

    $(".pro-thumb-img").slick({
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
            slidesToShow: 4
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });
  }
  render() {
    return (
      <div className="col-lg-5 col-12 mb-40">
        <div className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails">
          <a href={this.props.image[0].data.link}>
            <img src={this.props.image[0].data.link} alt="" />
          </a>
        </div>
        <ul id="pro-thumb-img" className="pro-thumb-img">
          {this.props.image &&
            this.props.image.map((item, i) => (
              <li key={i}>
                <a href={item.data.link} data-standard={item.data.link}>
                  <img src={item.data.link} alt="" />
                </a>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
export default ProductDetailImage;
