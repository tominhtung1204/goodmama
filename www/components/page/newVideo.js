import React from "react";

const NewVideo = props => (
  <div className="blog-section section section-padding pt-40">
    <div className="container">
      <div className="row">
        <div className="section-title text-center col mb-30">
          <h1>Video mới nhất</h1>
        </div>
      </div>

      <div className="row">
        {props.video &&
          props.video.data &&
          props.video.data.map(item => (
            <div className="col-lg-4 col-12" key={item._id}>
              <iframe
                width="100%"
                height="250"
                src={item.url}
                allowFullScreen
              ></iframe>
              <div className="author-video">
                <a href="#">
                  <h4>{item.title}</h4>
                  <span>
                    {item.author && item.author.name ? item.author.name : ""}
                  </span>
                  <span className="ml-10">/</span>
                  <span className="ml-10">
                    {new Date(item.createdAt).getDate() +
                      "-" +
                      (new Date(item.createdAt).getMonth() + 1) +
                      "-" +
                      new Date(item.createdAt).getFullYear()}
                  </span>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default NewVideo;
