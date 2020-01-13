import React, { Component } from "react";
import withLayout from "../components/hoc/withLayout";
import dynamic from "next/dynamic";
import { getInfoWeb, getAllMenu } from "../services/actions";
import Head from "../components/head";

const Breadcrumb = dynamic(() => import("../components/breadcrumb"));

class About extends Component {
  static async getInitialProps({ req }) {
    const info = await getInfoWeb(req);
    const menu = await getAllMenu(req);
    return {
      info,
      menu
    };
  }
  render() {
    return (
      <>
        <Head
          title={"Goodmama - Giới thiệu"}
          description={this.props.info.description}
          keyword={this.props.info.keyword}
        ></Head>
        <Breadcrumb page="Giới thiệu" />
        <div class="container">
          <h3>About us Page</h3>
        </div>
      </>
    );
  }
}

export default withLayout(About);
