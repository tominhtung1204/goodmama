import React from "react";

const Support = props => (
  <div
    className="feature-section bg-theme-two section section-padding fix"
    style={{ backgroundImage: "url(/static/images/pattern/pattern-dot.png)" }}
  >
    <div className="container">
      <div className="feature-wrap row justify-content-between mbn-30">
        <div className="col-md-4 col-12 mb-30">
          <div className="feature-item text-center">
            <div className="icon">
              <img src="/static/images/feature/feature-1.png" alt="" />
            </div>
            <div className="content">
              <h3>Miễn phí vận chuyển</h3>
              <p>Đơn hàng từ 2 triệu đồng trở lên</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12 mb-30">
          <div className="feature-item text-center">
            <div className="icon">
              <img src="/static/images/feature/feature-2.png" alt="" />
            </div>
            <div className="content">
              <h3>Hoàn tiền</h3>
              <p>Hoàn tiền sau 7 ngày</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12 mb-30">
          <div className="feature-item text-center">
            <div className="icon">
              <img src="/static/images/feature/feature-3.png" alt="" />
            </div>
            <div className="content">
              <h3>Bảo mật thanh toán</h3>
              <p>Bảo mật thanh toán 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Support;
