import React from "react";
import Pagination from "../page/pagination";
import Link from "next/link";

const ListBlog = props => (
  <div className="blog-section section section-padding pt-60">
    <div className="container">
      <div className="row">
        {props.blog &&
          props.blog.data &&
          props.blog.data.map(item => (
            <div key={item._id} className="col-lg-6 col-12 mb-40">
              <div className="blog-item">
                <div className="image-wrap">
                  <Link href={`/blog/${item.slug}`}>
                    <a className="image">
                      <img src={item.image} alt="" />
                    </a>
                  </Link>
                </div>
                <div className="content">
                  <h4 className="title">
                    <Link href={`/blog/${item.slug}`}>
                      <a>{item.title}</a>
                    </Link>
                  </h4>
                  <div className="desc">
                    <p>{item.description}</p>
                  </div>
                  <ul className="meta">
                    <li>
                      <a href="#">{item.author.name}</a>
                    </li>
                    <li>
                      <a href="#">{item.category.title}</a>
                    </li>
                    <li>
                      <a href="#">
                        {new Date(item.createdAt).getDate() +
                          "-" +
                          (new Date(item.createdAt).getMonth() + 1) +
                          "-" +
                          new Date(item.createdAt).getFullYear()}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        <div className="col-12">
          {props.blog && (
            <Pagination
              totalPage={props.blog.totalPage}
              page={props.blog.page}
              total={props.blog.total}
              pageSize={props.blog.pageSize}
              changePage={props.changePage}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ListBlog;
