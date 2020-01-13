import React from 'react';
import Page404 from '../components/admin/Page404';

const Error = ({ statusCode }) => <>{statusCode === 404 && <Page404 />}</>;

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
