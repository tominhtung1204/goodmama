import React, { Component, useState, useEffect } from "react";

import withLayout from "../../components/hoc/withLayout";
import Breadcrumb from "../../components/breadcrumb";
import SideBarProduct from "../../components/page/sideBarProduct";
import ListProduct from "../../components/page/listProduct";
import {
  getAllCategoryProduct,
  getInfoWeb,
  getAllProduct,
  getAllMenu
} from "../../services/actions";
import Head from "../../components/head";

const Product = props => {
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let isCancelled = false;
    getAllCategoryProduct().then(data => {
      setCategory(data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let query = { page: page, limit: 12 };
    query =
      filter !== ""
        ? Object.assign(query, { category: filter })
        : { page: page, limit: 12 };
    getAllProduct(query).then(data => {
      setProduct(data);
    });
  }, [page, filter]);

  const filterBycategory = value => {
    setFilter(value);
  };

  const changePage = page => {
    setPage(page);
  };

  return (
    <>
      <Head
        title={"Goodmama - Sản phẩm"}
        description={props.info.description}
        keyword={props.info.keyword}
      ></Head>
      <Breadcrumb page="Sản phẩm" />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row">
            <SideBarProduct
              filterByCategory={filterBycategory}
              product={product}
              category={category}
            />
            <ListProduct product={product} changePage={changePage} />
          </div>
        </div>
      </div>
    </>
  );
};

Product.getInitialProps = async ({ req }) => {
  const info = await getInfoWeb(req);
  const menu = await getAllMenu(req);
  return {
    info,
    menu
  };
};

export default withLayout(Product);
