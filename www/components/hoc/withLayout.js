import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";

export default Component =>
  class withLayout extends React.Component {
    $;
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));
      return { ...pageProps };
    }

    componentDidMount() {
      const sticky = $(".header-sticky");
      var windows = $(window);
      windows.on("scroll", function() {
        var scroll = windows.scrollTop();
        if (scroll < 300) {
          sticky.removeClass("is-sticky");
        } else {
          sticky.addClass("is-sticky");
        }
      });

      var mainMenuNav = $(".main-menu nav");
      mainMenuNav.meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu",
        meanMenuClose: '<span class="menu-close"></span>',
        meanMenuOpen: '<span class="menu-bar"></span>',
        meanRevealPosition: "right",
        meanMenuCloseSize: "0"
      });

      $.scrollUp({
        easingType: "linear",
        scrollSpeed: 900,
        animation: "fade",
        scrollText: '<i class="icofont icofont-swoosh-up"></i>'
      });
      this.setGoogleAd();
      this.setFbAssetFbAsync();
    }

    setGoogleAd = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "UA-154583076-1");
    };

    setFbAssetFbAsync = () => {
      window.fbAsyncInit = function() {
        FB.init({
          xfbml: true,
          version: "v5.0"
        });
      };
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    renderProtectedPage() {
      return (
        <div className="main-wrapper">
          <div id="fb-root"></div>
          <div
            className="fb-customerchat"
            attribution="setup_tool"
            page_id="113075428842030"
            logged_in_greeting="Xin chào!"
            logged_out_greeting="Xin chào!"
          ></div>

          <Header info={this.props.info} menu={this.props.menu} />
          <Component {...this.props} />
          <Footer info={this.props.info} />
        </div>
      );
    }

    render() {
      return this.renderProtectedPage();
    }
  };
