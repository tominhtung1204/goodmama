import React, { Component, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import withLayout from "../../components/hoc/withLayout";
import {
  getAllBlog,
  getInfoWeb,
  getCategoryBlog,
  getAllMenu
} from "../../services/actions";
import Head from "../../components/head";

const Breadcrumb = dynamic(() => import("../../components/breadcrumb"));
const BlogList = dynamic(() => import("../../components/page/listBlog"));
const ListCategory = dynamic(() =>
  import("../../components/page/blogCategory")
);

const RecentPost = dynamic(() => import("../../components/page/recentPost"));

const ListBlog = props => {
  const [blog, setBlog] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    getAllBlog({ page: page, limit: 10 }).then(data => {
      setBlog(data);
    });
  }, [page]);

  const changePage = page => {
    setPage(page);
  };
  return (
    <>
      <Head
        title={"Goodmama - Tin tức"}
        description={props.info.description}
        keyword={props.info.keyword}
      ></Head>
      <Breadcrumb page="Tin tức" />
      <BlogList blog={blog} changePage={changePage} />
    </>
  );
};

ListBlog.getInitialProps = async ({ req }) => {
  const info = await getInfoWeb(req);
  const menu = await getAllMenu(req);
  return {
    info,
    menu
  };
};

export default withLayout(ListBlog);
