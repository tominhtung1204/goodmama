import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
const Page404 = () => (
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

      <title>404 - Page Not Found</title>
      <link href="/static/css/classic.css" rel="stylesheet" />
    </Head>
    <main className="main d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center">
                <h1 className="display-1 font-weight-bold">404</h1>
                <p className="h1">Page not found.</p>
                <p className="h2 font-weight-normal mt-3 mb-4">
                  The page you are looking for might have been removed.
                </p>
                <Link href="/">
                  <a className="btn btn-primary btn-lg">Return to website</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default Page404;
