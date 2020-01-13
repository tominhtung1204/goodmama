import React from "react";

const Footer = props => (
  <>
    <div className="footer-top-section section bg-theme-two-light section-padding pb-40">
      <div className="container">
        <div className="row mbn-40">
          <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
            <h4 className="title">Liên hệ</h4>
            <p>Địa chỉ: {props.info.address}</p>
            <p>
              Hotline:{" "}
              <a href={`tel:${props.info.phone}`}>{props.info.phone}</a>
            </p>
            <p>
              Zalo:{" "}
              <a target="_blank" href={`https://zalo.me/${props.info.zalo}`}>
                {props.info.zalo}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${props.info.email}`}>{props.info.email}</a>
            </p>
            <p>
              <a
                href="http://online.gov.vn/CustomWebsiteDisplay.aspx?DocId=59561"
                target="_blank"
              >
                <img
                  style={{ width: "150px" }}
                  src="/static/images/dathongbaobct.png"
                />
              </a>
            </p>
          </div>

          <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
            <h4 className="title">Danh mục sản phẩm</h4>
            <ul>
              <li>
                <a href="#">Dành cho mẹ</a>
              </li>
              <li>
                <a href="#">Dành cho bé</a>
              </li>
            </ul>
          </div>

          <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
            <h4 className="title">Thông tin</h4>
            <ul>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Chính sách riêng tư</a>
              </li>
              <li>
                <a href="#">Bảo mật thanh toán</a>
              </li>

              <li>
                <a href="#">Chính sách đổi trả</a>
              </li>
            </ul>
          </div>

          <div className="footer-widget col-lg-3 col-md-6 col-12 mb-40">
            <h4 className="title">Nhận tin tức</h4>
            <p>Đăng ký để nhận thông tin bài viết và tất cả các sản phẩm</p>

            <form id="mc-form" className="mc-form footer-subscribe-form">
              <input
                id="mc-email"
                autoComplete="off"
                placeholder="Enter your email here"
                name="EMAIL"
                type="email"
              />
              <button id="mc-submit">
                <i className="fa fa-paper-plane-o"></i>
              </button>
            </form>
            <div className="mailchimp-alerts">
              <div className="mailchimp-submitting"></div>
              <div className="mailchimp-success"></div>
              <div className="mailchimp-error"></div>
            </div>

            <h5>FOLLOW US</h5>
            <p className="footer-social">
              <a href={props.info.facebook} target="_blank">
                Facebook
              </a>{" "}
              -{" "}
              <a href={props.info.twtter} target="_blank">
                Twitter
              </a>{" "}
              - <a href="#">Google+</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom-section section bg-theme-two pt-15 pb-15">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="footer-copyright">
              Copyright &copy; 2019 Goodmama. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Footer;
