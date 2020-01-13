import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={props.description} />
    <meta name="keyword" content={props.keyword} />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="shortcut icon" href="favicon.png" type="image/png" />
    <meta property="og:url" content={props.url || ""} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta name="twitter:site" content={props.url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage} />
    <meta property="og:image" content={props.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      name="google-site-verification"
      content="EHVU-KmfCZN4qeoZEiL3_cJ0H-1LqUmc2-nAV7NJhIk"
    />
    <link
      ref="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/static/css/icon-font.min.css" />
    <link rel="stylesheet" href="/static/css/plugins.css" />
    <link rel="stylesheet" href="/static/css/helper.css" />
    <link rel="stylesheet" href="/static/css/style.css" />

    <script src="/static/js/vendor/modernizr-3.7.1.min.js"></script>
    <script src="/static/js/vendor/jquery-3.4.1.min.js"></script>
    <script src="/static/js/popper.min.js"></script>
    <script src="/static/js/bootstrap.min.js"></script>
    <script src="/static/js/plugins.js"></script>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-154583076-1"
    ></script>
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
