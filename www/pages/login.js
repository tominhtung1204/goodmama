import React from "react";
import Head from "next/head";
import { loginAdmin } from "../services/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Router from "next/router";
import { Formik, Form } from "formik";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống.")
    .email("Email không đúng định dạng"),
  password: yup
    .string()
    .required("Password không được để trống.")
    .min(8, "Password không được ngắn hơn 8 ký tự")
});

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  loginAdmin = value => {
    const body = {
      email: value.email,
      password: value.password.trim()
    };
    loginAdmin(body)
      .then(data => {
        Cookies.set("__token", data.token);
        toast.success("Đăng nhập thành công.");
        Router.push("/admin");
      })
      .catch(err => {
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      });
  };

  handleChange = event => {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  };

  render() {
    return (
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
          <title>Đăng nhập</title>
          <link href="/static/css/classic.css" rel="stylesheet" />
          <link href="/static/css/admin.css" rel="stylesheet" />
        </Head>
        <main className="main d-flex w-100">
          <div className="container d-flex flex-column">
            <div className="row h-100">
              <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div className="d-table-cell align-middle">
                  <div className="text-center mt-4">
                    <h1 className="h2">Admin Panel</h1>
                    <p className="lead">Đăng nhập bằng tài khoản của bạn.</p>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="m-sm-4">
                        {/* <div className="text-center">
                          <img
                            src="/static/img/logo-dark.png"
                            alt="Chris Wood"
                            className="img-fluid"
                            width="132"
                            height="132"
                          />
                        </div> */}
                        <Formik
                          initialValues={{
                            ...this.state
                          }}
                          enableReinitialize={true}
                          validationSchema={loginSchema}
                          onSubmit={values => {
                            this.loginAdmin(values);
                          }}
                        >
                          {({ errors, touched }) => (
                            <Form>
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  className="form-control form-control-lg"
                                  type="email"
                                  name="email"
                                  onChange={this.handleChange}
                                  value={this.state.email}
                                  placeholder="Enter your email"
                                />
                                {errors.email && touched.email && (
                                  <small className="form-text text-danger">
                                    {errors.email}
                                  </small>
                                )}
                              </div>
                              <div className="form-group">
                                <label>Password</label>
                                <input
                                  className="form-control form-control-lg"
                                  type="password"
                                  name="password"
                                  onChange={this.handleChange}
                                  value={this.state.password}
                                  placeholder="Enter your password"
                                />
                                {errors.password && touched.password && (
                                  <small className="form-text text-danger">
                                    {errors.password}
                                  </small>
                                )}
                              </div>
                              <div>
                                <div className="custom-control custom-checkbox align-items-center">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    value="remember-me"
                                    name="remember-me"
                                    defaultChecked={true}
                                  />
                                  <label className="custom-control-label text-small">
                                    Remember me
                                  </label>
                                </div>
                              </div>
                              <div className="text-center mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-primary"
                                >
                                  Đăng nhập
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
export default Login;
