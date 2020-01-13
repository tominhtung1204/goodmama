import React from "react";
import Link from "next/link";

const SideBarAdmin = () => (
  <nav id="sidebar" className="sidebar">
    <div className="sidebar-content">
      <Link href="/admin/info" prefetch={false}>
        <a className="sidebar-brand">
          <i
            className="fas fa-dice-d6 align-middle"
            style={{ color: "#47bac1", marginRight: "10px", fontSize: "20px" }}
          />
          <span className="align-middle">Admin</span>
        </a>
      </Link>
      <ul className="sidebar-nav">
        <li className="sidebar-header">Thông tin trang web</li>
        <li className="sidebar-item">
          <Link href="/admin/info" prefetch={false}>
            <a className="sidebar-link">
              <i className="fas fa-info-circle align-middle"></i>
              <span className="align-middle">Thông tin chung</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link href="/admin/menu" prefetch={false}>
            <a className="sidebar-link">
              <i className="fab fa-buffer align-middle"></i>
              <span className="align-middle">Quản lý menu</span>
            </a>
          </Link>
        </li>

        <li className="sidebar-item">
          <Link href="/admin/banner" prefetch={false}>
            <a className="sidebar-link">
              <i className="fas fa-images align-middle"></i>
              <span className="align-middle">Quản lý banner</span>
            </a>
          </Link>
        </li>

        <li className="sidebar-item">
          <Link href="/admin/page">
            <a className="sidebar-link">
              <i className="fab fa-microsoft"></i>
              <span className="align-middle">Quản lý page</span>
            </a>
          </Link>
        </li>

        <li className="sidebar-header">Quản lý nội dung</li>
        <li className="sidebar-item">
          <a
            href="#product"
            data-toggle="collapse"
            className="sidebar-link collapsed"
          >
            <i className="fas fa-box align-middle"></i>
            <span className="align-middle">Quản lý sản phẩm</span>
          </a>
          <ul
            id="product"
            className="sidebar-dropdown list-unstyled collapse "
            data-parent="#sidebar"
          >
            <li className="sidebar-item">
              <Link href="/admin/product" prefetch={false}>
                <a className="sidebar-link">Danh sách sản phẩm</a>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link href="/admin/product/category" prefetch={false}>
                <a className="sidebar-link">Danh mục sản phẩm</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <a
            href="#blog"
            data-toggle="collapse"
            className="sidebar-link collapsed"
          >
            <i className="fab fa-hotjar align-middle"></i>
            <span className="align-middle">Quản lý bài viết</span>
          </a>
          <ul
            id="blog"
            className="sidebar-dropdown list-unstyled collapse "
            data-parent="#sidebar"
          >
            <li className="sidebar-item">
              <Link href="/admin/blog" prefetch={false}>
                <a className="sidebar-link">Danh sách bài viết</a>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link href="/admin/blog/category" prefetch={false}>
                <a className="sidebar-link">Danh mục bài viết</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <Link href="/admin/video" prefetch={false}>
            <a className="sidebar-link">
              <i className="fab fa-youtube align-middle"></i>
              <span className="align-middle">Quản lý video</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link href="/admin/partner" prefetch={false}>
            <a className="sidebar-link">
              <i className="fas fa-handshake align-middle"></i>
              <span className="align-middle">Quản lý partner</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link href="/admin/testimonial" prefetch={false}>
            <a className="sidebar-link">
              <i className="far fa-grin-beam align-middle"></i>
              <span className="align-middle">Quản lý testimonial</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link href="/admin/account" prefetch={false}>
            <a className="sidebar-link">
              <i className="fas fa-user align-middle"></i>
              <span className="align-middle">Quản lý tài khoản</span>
            </a>
          </Link>
        </li>
      </ul>

      <div className="sidebar-bottom d-none d-lg-block">
        <div className="media">
          <img
            className="rounded-circle mr-3"
            src="https://i.imgur.com/HkNjWa4.png"
            alt="Chris Wood"
            width="40"
            height="40"
          />
          <div className="media-body">
            <h5 className="mb-1">Admin</h5>
            <div>
              <i className="fas fa-circle text-success"></i> Online
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default SideBarAdmin;
