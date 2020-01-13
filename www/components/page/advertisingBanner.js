import React from "react";

const AdvertisingBanner = props => (
  <div className="banner-section">
    <div className="container">
      <div className="row">
        {props.banner &&
          props.banner.map((item, index) => {
            if (index < 1) {
              return (
                <div key={item._id}>
                  <div className="banner banner-1 content-left content-middle">
                    <a href={item.link} className="image">
                      <img src={item.image} alt="Banner Image" />
                    </a>
                    <div className="content">
                      <h1>
                        {item.title} <br />
                        {item.subTitle} <br />
                        {item.description}
                      </h1>
                      <a href={item.link} data-hover="MUA NGAY">
                        MUA NGAY
                      </a>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  </div>
);

export default AdvertisingBanner;
