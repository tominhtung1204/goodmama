import React, { Component, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import withLayout from "../components/hoc/withLayout";
import Head from "../components/head";
import {
  getAllBannerHome,
  getAllBannerAdvertising,
  getProductNew,
  getAllBlog,
  getAllPartner,
  getInfoWeb,
  getAllMenu,
  getAllVideo
} from "../services/actions";

const Slider = dynamic(() => import("../components/page/slider"));
const NewVideo = dynamic(() => import("../components/page/newVideo"));
const AdvertisingBanner = dynamic(() =>
  import("../components/page/advertisingBanner")
);
const NewProduct = dynamic(() => import("../components/page/newProduct"));
const NewBlog = dynamic(() => import("../components/page/newBlog"));
const Partner = dynamic(() => import("../components/page/partner"));
const Support = dynamic(() => import("../components/page/support"));

const Home = props => {
  const [banner, setBanner] = useState(null);
  const [bannerAdvertising, setBannerAvertising] = useState(null);
  const [productNew, setProductNew] = useState(null);
  const [partner, setPartner] = useState(null);
  const [video, setVideo] = useState(null);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getAllBannerHome().then(data => {
      setBanner(data);
    });
    getAllBannerAdvertising().then(data => {
      setBannerAvertising(data);
    });
    getProductNew().then(data => {
      setProductNew(data);
    });
    getAllBlog({ page: 1, limit: 4 }).then(data => {
      setBlog(data);
    });
    getAllPartner().then(data => {
      setPartner(data);
    });
    getAllVideo({ page: 1, limit: 3 }).then(data => {
      setVideo(data);
    });
  }, []);
  return (
    <>
      <Head
        title={props.info.title}
        description={props.info.description}
        keyword={props.info.keyword}
      ></Head>
      <Slider banner={banner} />
      <NewProduct product={productNew} />
      <AdvertisingBanner banner={bannerAdvertising} />
      <NewVideo video={video} />
      <Partner partner={partner} />
      <NewBlog blog={blog} />
      <Support />
    </>
  );
};

Home.getInitialProps = async ({ req }) => {
  const info = await getInfoWeb(req);
  const menu = await getAllMenu(req);
  return {
    info,
    menu
  };
};

export default withLayout(Home);
