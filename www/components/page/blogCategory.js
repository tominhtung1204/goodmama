import React from "react";

const BlogCategory = props => (
  <div className="sidebar">
    <h4 className="sidebar-title">Danh mục</h4>
    <ul className="sidebar-list">
      {props.category &&
        props.category.map(item => (
          <li key={item._id}>
            <a href="#">{item.title}</a>
          </li>
        ))}
    </ul>
  </div>
);

export default BlogCategory;
