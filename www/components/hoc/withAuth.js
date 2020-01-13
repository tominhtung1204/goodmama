import React from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import LayoutAdmin from '../admin/layoutAdmin';

export default Component =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      const token = Cookies.getJSON('__token');
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));
      return { ...pageProps, token };
    }
    componentDidMount() {
      if (!Cookies.getJSON('__token')) {
        Router.push('/login');
      }
    }

    renderProtectedPage() {
      return (
        <LayoutAdmin>
          <Component {...this.props} />
        </LayoutAdmin>
      );
    }

    render() {
      return this.renderProtectedPage();
    }
  };
