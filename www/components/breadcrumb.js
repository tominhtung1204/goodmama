import React from "react";

const Breadcrumb = props => (
  <div
    className="page-banner-section section"
    style={{ backgroundImage: "url(/static/images/hero/hero-1.jpg)" }}
  >
    <div className="container">
      <div className="row">
        <div className="page-banner-content col">
          <h1>{props.page}</h1>
          <ul className="page-breadcrumb">
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="#">{props.page}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Breadcrumb;
