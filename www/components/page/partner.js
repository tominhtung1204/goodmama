import React from "react";

const Partner = props => (
  <div className="brand-section section section-padding pt-0 pb-20">
    <div className="container-fluid">
      <div className="brand-slider">
        <div className="row">
          {props.partner &&
            props.partner.map(item => (
              <div key={item._id} className="brand-item col">
                <img src={item.image} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default Partner;
