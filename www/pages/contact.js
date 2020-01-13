import React, { Component } from "react";
import withLayout from "../components/hoc/withLayout";
import dynamic from "next/dynamic";
import { getInfoWeb, getAllMenu } from "../services/actions";
import Head from "../components/head";

const Breadcrumb = dynamic(() => import("../components/breadcrumb"));

class Contact extends Component {
  static async getInitialProps({ req }) {
    const info = await getInfoWeb(req);
    const menu = await getAllMenu(req);
    return {
      info,
      menu
    };
  }
  render() {
    return (
      <>
        <Head
          title={"Goodmama - Liên hệ"}
          description={this.props.info.description}
          keyword={this.props.info.keyword}
        ></Head>
        <Breadcrumb page="Liên hệ" />
        <div className="page-section section section-padding">
          <div className="container">
            <div className="row row-30 mbn-40">
              <div className="contact-info-wrap col-md-6 col-12 mb-40">
                <h3>Thông tin liên hệ</h3>
                <h3>Công ty Sản xuất và Thương mại HMD</h3>
                <p>
                  Số ĐKKD 2802300315 do Sở KHĐT T. Thanh Hóa cấp ngày 17/03/2018
                </p>
                <p>Người đại diện: Phạm Văn Hải</p>
                <ul className="contact-info">
                  <li>
                    <i className="fa fa-map-marker"></i>
                    <p>{this.props.info.address}</p>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>
                    <p>
                      <a href={`tel:${this.props.info.phone}`}>
                        {this.props.info.phone}
                      </a>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>
                    <p>
                      <a
                        target="_blank"
                        href={`https://zalo.me/${this.props.info.zalo}`}
                      >
                        {this.props.info.zalo}
                      </a>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-globe"></i>
                    <p>
                      <a href="#">{this.props.info.email}</a>
                    </p>
                  </li>
                </ul>
              </div>

              <div class="contact-form-wrap col-md-6 col-12 mb-40">
                <h3>Đăng ký làm đại lý</h3>
                <form
                  id="contact-form"
                  action="https://demo.hasthemes.com/jadusona-preview/jadusona/assets/php/mail.php"
                >
                  <div class="contact-form">
                    <div class="row">
                      <div class="col-lg-6 col-12 mb-30">
                        <input type="text" name="name" placeholder="Tên" />
                      </div>
                      <div class="col-lg-6 col-12 mb-30">
                        <input
                          type="text"
                          name="sdt"
                          placeholder="Số điện thoại"
                        />
                      </div>
                      <div class="col-12 mb-30">
                        <input
                          type="text"
                          name="link"
                          placeholder="Link facebook"
                        />
                      </div>
                      <div class="col-12 mb-30">
                        <textarea
                          name="message"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div class="col-12">
                        <input type="submit" value="Đăng ký" />
                      </div>
                    </div>
                  </div>
                </form>
                <p class="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withLayout(Contact);
