import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import withLayout from "../../components/hoc/withLayout";
import Head from "../../components/head";
import {
  getInfoWeb,
  getProductBySlug,
  getProductHot,
  getAllMenu
} from "../../services/actions";

const Breadcrumb = dynamic(() => import("../../components/breadcrumb"));
const ProductDetailImage = dynamic(() =>
  import("../../components/page/productDetailImage")
);
const ProductDetailContent = dynamic(() =>
  import("../../components/page/productDetailContent")
);
const DescriptionProduct = dynamic(() =>
  import("../../components/page/descriptionProduct")
);
const SliderProduct = dynamic(() =>
  import("../../components/page/sliderProduct")
);

const ProductDetail = props => {
  const [productHot, setProductHot] = useState(null);
  useEffect(() => {
    getProductHot().then(data => {
      setProductHot(data);
    });
  }, []);

  return (
    <>
      {props.product && (
        <>
          <Head
            title={props.product.name}
            description={props.product.shortDescription}
          ></Head>
          <Breadcrumb page={props.product.name} />
          <div className="page-section section section-padding">
            <div className="container">
              <div className="row">
                <ProductDetailImage image={props.product.image} />
                <ProductDetailContent product={props.product} />
              </div>
              <DescriptionProduct product={props.product} />
              <SliderProduct product={productHot} title="Sản phẩm tương tự" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

ProductDetail.getInitialProps = async ({ req, query }) => {
  const info = await getInfoWeb(req);
  const menu = await getAllMenu(req);
  const product = await getProductBySlug(query.slug, req);
  return {
    info,
    product,
    menu
  };
};

export default withLayout(ProductDetail);
