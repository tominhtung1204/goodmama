import React from 'react';

const Testimonial = props => (
  <div className="testmonial bg-image-5 ptb-90">
    <div className="container">
      <div className="section-title text-center cl-testmonial">
        <h2>Khách hàng nói về chúng tôi</h2>
        <p>Trải nghiệm tuyệt vời</p>
      </div>
      <div className="testmonial-active owl-carousel">
        {props.testimonial &&
          props.testimonial.map(item => (
            <div key={item._id} className="single-testmonial text-center">
              <div className="testmonial-content">
                <p>{item.content}</p>
                <img src={item.image} alt="testmonial-img" />
                <span className="t-author">{item.name}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default Testimonial;
