import React from "react";
import Head from "next/head";
import NavAdmin from "./navAdmin";
import SideBarAdmin from "./sideBarAdmin";

const LayoutAdmin = props => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Admin-Panel</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="shortcut icon" href="favicon.png" type="image/png" />
      <link href="/static/css/classic.css" rel="stylesheet" />
      <link href="/static/css/admin.css" rel="stylesheet" />
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossOrigin="anonymous"
      ></script>
    </Head>
    <div className="wrapper">
      <SideBarAdmin />
      <div className="main" style={{ position: "relative" }}>
        <NavAdmin />
        <main className="content">
          <div className="container-fluid p-0">{props.children}</div>
        </main>
        <footer
          className="footer"
          style={{ position: "absolute", bottom: "0px", width: "100%" }}
        >
          <div className="container-fluid">
            <div className="row text-muted">
              <div className="col-6 text-left"></div>
              <div className="col-6 text-right">
                <p className="mb-0">
                  &copy; 2019 -{" "}
                  <a
                    href="https://acedev.vn"
                    target="_blank"
                    className="text-muted"
                  >
                    Ace Technology Company
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </>
);

export default LayoutAdmin;
