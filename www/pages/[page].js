import React, { Component, useState, useEffect } from "react";
import withLayout from "../components/hoc/withLayout";
import dynamic from "next/dynamic";
import { getInfoWeb, getPageById, getAllMenu } from "../services/actions";
import { useRouter } from "next/router";
import Head from "../components/head";

const Breadcrumb = dynamic(() => import("../components/breadcrumb"));

const Page = props => {
  const router = useRouter();
  const [page, setPage] = useState(null);
  useEffect(() => {
    getPageById(router.query.page).then(data => {
      setPage(data);
    });
  }, [router.query.page]);
  const createMarkup = content => {
    return { __html: content };
  };
  return (
    <>
      <Head
        title={props.info.title}
        description={props.info.description}
        keyword={props.info.keyword}
      ></Head>
      <Breadcrumb page={page && page.name ? page.name : ""} />
      <div className="container">
        <div className="row">
          {page && (
            <div
              className="col-12"
              dangerouslySetInnerHTML={createMarkup(page.content)}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

Page.getInitialProps = async ({ req }) => {
  const info = await getInfoWeb(req);
  const menu = await getAllMenu(req);
  return {
    info,
    menu
  };
};

export default withLayout(Page);
