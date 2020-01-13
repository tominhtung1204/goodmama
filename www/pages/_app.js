import React from "react";
import App from "next/app";
import ProgressBar from "../components/next-progress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <ProgressBar />
        <Component {...pageProps} />
        <ToastContainer
          closeButton={false}
          draggable={false}
          pauseOnHover={false}
          autoClose={1000}
          toastClassName={"toast-ace"}
        />
      </>
    );
  }
}

export default MyApp;
