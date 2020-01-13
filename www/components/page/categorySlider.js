import React from 'react';
import Link from 'next/link';

const CategorySlider = props => (
  <div className="categories-of-pro ptb-90">
    <div className="container-fluid">
      <div className="section-title text-center">
        <h2>Danh mục sản phẩm</h2>
      </div>
      <div className="categorie-pro-active owl-carousel">
        {props.category &&
          props.category.map(item => (
            <div key={item._id} className="single-categorie">
              <div className="cat-img">
                <a href="/product">
                  <img src={item.image} alt="cat-pro" />
                </a>
                <div className="cat-content">  
                    <a href="/product">{item.title}</a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default CategorySlider;
