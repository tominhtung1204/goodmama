import React from "react";

import { logOut } from "../../services/auth";

const NavAdmin = () => (
  <nav className="navbar navbar-expand navbar-light bg-white">
    <a
      className="sidebar-toggle d-flex mr-2"
      onClick={() => {
        const element = document.getElementById("sidebar");
        element.classList.toggle("toggled");
      }}
    >
      <i className="hamburger align-self-center"></i>
    </a>

    <form className="form-inline d-none d-sm-inline-block">
      <input
        className="form-control form-control-no-border mr-sm-2"
        type="text"
        placeholder="Search projects..."
        aria-label="Search"
      />
    </form>

    <div className="navbar-collapse collapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-icon dropdown-toggle d-inline-block d-sm-none"
            href="#"
            data-toggle="dropdown"
          >
            <i className="fas fa-cog align-middle" />
          </a>

          <a
            className="nav-link dropdown-toggle d-none d-sm-inline-block"
            href="#"
            data-toggle="dropdown"
          >
            <img
              src="https://i.imgur.com/HkNjWa4.png"
              className="avatar img-fluid rounded-circle mr-1"
              alt="Chris Wood"
            />{" "}
            <span className="text-dark">Admin</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="pages-profile.html">
              <i className="align-middle mr-1" data-feather="user"></i> Profile
            </a>
            <a className="dropdown-item" href="#">
              <i className="align-middle mr-1" data-feather="pie-chart"></i>{" "}
              Analytics
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="pages-settings.html">
              Settings & Privacy
            </a>
            <a className="dropdown-item" href="#">
              Help
            </a>
            <a className="dropdown-item" href="#" onClick={logOut}>
              Đăng xuất
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavAdmin;
