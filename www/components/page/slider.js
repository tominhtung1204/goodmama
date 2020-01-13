import React, { Component } from "react";
import Link from "next/link";

class Slider extends Component {
  // componentDidMount() {
  //   const heroSlider = $(".hero-slider");
  //   heroSlider.slick({
  //     lazyLoad: "ondemand",
  //     arrows: true,
  //     autoplay: true,
  //     autoplaySpeed: 5000,
  //     dots: true,
  //     pauseOnFocus: false,
  //     pauseOnHover: false,
  //     fade: true,
  //     infinite: true,
  //     slidesToShow: 1,
  //     prevArrow:
  //       '<button type="button" class="slick-prev"><i class="icofont icofont-long-arrow-left"></i></button>',
  //     nextArrow:
  //       '<button type="button" class="slick-next"><i class="icofont icofont-long-arrow-right"></i></button>'
  //   });
  // }
  render() {
    return (
      <div className="slider section">
        {this.props.banner &&
          this.props.banner.map(item => (
            <React.Fragment key={item._id}>
              <div className="slider-item">
                <img src={item.image} />
                <div className="slider-content-left">
                  <Link href="/">
                    <a className="slider-content-link step-one">
                      <span>1</span>
                      <span>Lòng tin</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="slider-content-link step-two">
                      <span>2</span>
                      <span>Yêu thích</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="slider-content-link step-three">
                      <span>3</span>
                      <span>Cam kết</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      title="Phụng sự là niềm vui"
                      className="slider-content-link step-four"
                    >
                      <span>4</span>
                      <span>Phụng sự là niềm vui</span>
                    </a>
                  </Link>
                </div>
                <div className="slider-content-right">
                  <Link href="/">
                    <a
                      title="Lắng nghe để thấu hiểu"
                      className="slider-content-link step-one"
                    >
                      <span>5</span>
                      <span>Lắng nghe để thấu hiểu</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="slider-content-link step-two">
                      <span>6</span>
                      <span>An toàn</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="slider-content-link step-three">
                      <span>7</span>
                      <span>Giá</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="slider-content-link step-four">
                      <span>8</span>
                      <span>Chất lượng</span>
                    </a>
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    );
  }
}

export default Slider;
