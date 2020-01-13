import React, { Component, useState, useEffect } from "react";

import withLayout from "../components/hoc/withLayout";
import Breadcrumb from "../components/breadcrumb";
import { getInfoWeb, getAllVideo, getAllMenu } from "../services/actions";
import Pagination from "../components/page/pagination";
import Head from "../components/head";

const Video = props => {
  const [page, setPage] = useState(1);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    getAllVideo({ page: page, limit: 12 }).then(data => {
      setVideo(data);
    });
  }, [page]);

  const changePage = page => {
    setPage(page);
  };

  return (
    <>
      <Head
        title={props.info.title}
        description={props.info.description}
        keyword={props.info.keyword}
      ></Head>
      <Breadcrumb page="Video" />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row">
            {video &&
              video.data &&
              video.data.length > 0 &&
              video.data.map(item => (
                <div className="col-lg-4 col-12 mb-40" key={item._id}>
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
                        {item.author && item.author.name
                          ? item.author.name
                          : ""}
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
            <div className="col-12">
              {video && (
                <Pagination
                  totalPage={video.totalPage}
                  page={video.page}
                  total={video.total}
                  pageSize={video.pageSize}
                  changePage={changePage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Video.getInitialProps = async ({ req }) => {
  const info = await getInfoWeb(req);
  const menu = await getAllMenu(req);
  return {
    info,
    menu
  };
};

export default withLayout(Video);
