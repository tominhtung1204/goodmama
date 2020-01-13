import React from "react";
import Link from "next/link";

const RecentPost = props => (
  <div className="sidebar">
    <h4 className="sidebar-title">Tin tức gần đây</h4>
    <div className="sidebar-blog-wrap">
      {props.blog &&
        props.blog.data &&
        props.blog.data.map(item => (
          <div className="sidebar-blog" key={item._id}>
            <Link href={`/blog/${item.slug}`}>
              <a className="image">
                <img src={item.image} alt="" />
              </a>
            </Link>
            <div className="content">
              <Link href={`/blog/${item.slug}`}>
                <a className="title">{item.title}</a>
              </Link>
              <span className="date">
                {new Date(item.createdAt).getDate() +
                  "-" +
                  (new Date(item.createdAt).getMonth() + 1) +
                  "-" +
                  new Date(item.createdAt).getFullYear()}
              </span>
            </div>
          </div>
        ))}
    </div>
  </div>
);

export default RecentPost;
