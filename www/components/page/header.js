import React from "react";
import Link from "next/link";

const Header = props => (
  <div className="header-section section">
    <div className="header-top header-top-one bg-theme-two">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center d-none d-md-flex">
          <div className="col mt-10 mb-10 d-none d-md-flex">
            <div className="header-top-left">
              <p>Welcome to Goodmama</p>
              <p>
                Hotline: <a href="tel:0123456789">{props.info.phone}</a>
              </p>
            </div>
          </div>

          <div className="col mt-10 mb-10"></div>
        </div>
      </div>
    </div>

    <div
      className="header-bottom header-bottom-one header-sticky"
      style={{ borderBottom: "1px solid #ededed" }}
    >
      <div className="container-fluid">
        <div className="row menu-center align-items-center justify-content-between">
          <div className="col-12">
            <div className="header-logo">
              <Link href="/">
                <a>
                  <img src={props.info.logo} alt="Jadusona" />
                </a>
              </Link>
            </div>
          </div>
          <div className="col order-2 order-lg-3"></div>

          <div className="col order-3 order-lg-2">
            <div className="main-menu">
              <nav>
                <ul>
                  {props.menu &&
                    props.menu.map(item => (
                      <li key={item._id}>
                        <Link href={item.url}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="mobile-menu order-12 d-block d-lg-none col"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
