import React, { useState, useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";

const Progress = prosp => {
  const [options, setOptions] = useState({
    color: "#29D",
    startPosition: 0.1,
    stopDelayMs: 200,
    height: 3
  });

  let timer = null;

  useEffect(() => {
    NProgress.configure(options);
    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd);
  });

  const routeChangeStart = () => {
    NProgress.set(options.startPosition);
    NProgress.start();
  };

  const routeChangeEnd = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      NProgress.done(true);
    }, options.stopDelayMs);
  };

  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${options.color};
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: ${options.height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${options.color}, 0 0 5px ${options.color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}</style>
  );
};

export default Progress;
