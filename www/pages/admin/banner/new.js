import React, { useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { createBanner } from "../../../services/actions";
import { toast } from "react-toastify";
import Router from "next/router";
import Spiner from "../../../components/spiner";

const BannerSchema = yup.object().shape({
  title: yup.string().required("Tiêu đề không được để trống"),
  subTitle: yup.string().required("Phụ đề không được để trống"),
  description: yup.string(),
  link: yup.string().required("Đường dẫn không được để trống"),
  image: yup.string().required("Ảnh không được để trống")
});

const AddBanner = props => {
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState({
    title: "",
    subTitle: "",
    description: "",
    isSlider: true,
    link: "",
    image: "",
    fileUpload: null
  });

  const handleChange = event => {
    const field = event.target.name;
    setControls({ ...controls, [field]: event.target.value });
  };

  const changedChecked = event => {
    setControls({ ...controls, isSlider: event.target.checked });
  };

  const handleSelectImage = event => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ev => {
        if (ev && ev.target && ev.target.result) {
          setControls({
            ...controls,
            image: ev.target.result,
            fileUpload: file
          });
        }
      };
    }
  };

  const removeImg = () => {
    const imgValue = document.getElementById("image-banner");
    imgValue.value = "";
    setControls({
      ...controls,
      image: "",
      fileUpload: null
    });
  };

  const createdBanner = value => {
    const body = new FormData();
    body.append("title", value.title);
    body.append("subTitle", value.subTitle);
    body.append("description", value.description);
    body.append("image", controls.fileUpload);
    body.append("link", value.link);
    body.append("isSlider", value.isSlider);
    setLoaded(true);
    createBanner(body)
      .then(data => {
        setLoaded(false);
        toast.success("Thêm mới banner thành công");
        Router.push("/admin/banner");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể thêm mới baner");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Thêm mới banner</h5>
            <h6 className="card-subtitle text-muted">
              Thêm mới banner quảng cáo trang chủ
            </h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={BannerSchema}
              onSubmit={values => {
                createdBanner(values);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          Tiêu đề <span className="text-danger">*</span>
                        </label>
                        <input
                          name="title"
                          onChange={handleChange}
                          value={controls.title}
                          className="form-control"
                          placeholder="Tiêu đề..."
                        />
                        {errors.title && touched.title && (
                          <small className="form-text text-danger">
                            {errors.title}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Phụ đề <span className="text-danger">*</span>
                        </label>
                        <input
                          name="subTitle"
                          onChange={handleChange}
                          value={controls.subTitle}
                          className="form-control"
                          placeholder="Phụ đề..."
                        />
                        {errors.subTitle && touched.subTitle && (
                          <small className="form-text text-danger">
                            {errors.subTitle}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Mô tả <span className="text-danger"></span>
                        </label>
                        <textarea
                          row="3"
                          name="description"
                          onChange={handleChange}
                          value={controls.Carddescription}
                          className="form-control"
                          placeholder="Mô tả..."
                        />
                        {errors.description && touched.description && (
                          <small className="form-text text-danger">
                            {errors.description}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Đường dẫn <span className="text-danger">*</span>
                        </label>
                        <input
                          name="link"
                          onChange={handleChange}
                          value={controls.link}
                          className="form-control"
                          placeholder="Đường dẫn..."
                        />
                        {errors.link && touched.link && (
                          <small className="form-text text-danger">
                            {errors.link}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            checked={values.isSlider}
                            onChange={changedChecked}
                          />
                          <span className="custom-control-label">
                            Banner chính
                          </span>
                        </label>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          Ảnh <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="image-banner"
                          className="d-none"
                          onChange={handleSelectImage}
                        />
                        {controls.image === "" && (
                          <label className="img-banner" htmlFor="image-banner">
                            <i className="fas fa-image" />
                          </label>
                        )}
                        {controls.image !== "" && (
                          <label className="banner-display">
                            <img
                              className="img-fluid"
                              src={controls.image}
                              alt="logo"
                            />
                            <i
                              className="far fa-times-circle"
                              onClick={removeImg}
                            />
                          </label>
                        )}
                        {errors.image && touched.image && (
                          <small className="form-text text-danger">
                            {errors.image}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col md={12} className="text-center mt-3">
                      <Button disabled={loaded} type="submit">
                        Thêm mới
                        {loaded && <Spiner />}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default withAuth(AddBanner);
