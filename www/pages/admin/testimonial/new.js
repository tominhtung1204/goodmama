import React, { useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { createTestimonial } from "../../../services/actions";
import { toast } from "react-toastify";
import Router from "next/router";
import Spiner from "../../../components/spiner";

const testimonialSchema = yup.object().shape({
  name: yup.string().required("Tên  không được để trống"),
  content: yup.string().required("Nội dung  không được để trống"),
  job: yup.string().required("Nghề nghiệp không được để trống"),
  image: yup.string().required("Ảnh không được để trống")
});

const AddTestimonial = props => {
  const [controls, setControls] = useState({
    name: "",
    content: "",
    job: "",
    image: "",
    fileUpload: null
  });
  const [loaded, setLoaded] = useState(false);

  const handleChange = event => {
    const field = event.target.name;
    setControls({ ...controls, [field]: event.target.value });
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

  const createdTestimonial = value => {
    const body = new FormData();
    body.append("name", value.name);
    body.append("content", value.content);
    body.append("job", value.job);
    body.append("image", controls.fileUpload);
    setLoaded(true);
    createTestimonial(body)
      .then(data => {
        toast.success("Thêm mới đánh giá thành công");
        setLoaded(false);
        Router.push("/admin/testimonial");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể thêm mới đánh giá");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Thêm mới đánh giá khách hàng</h5>
            <h6 className="card-subtitle text-muted">
              Thêm mới đánh giá khách hàng
            </h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={testimonialSchema}
              onSubmit={values => {
                createdTestimonial(values);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <Row>
                    <Col md={12}>
                      <div className="form-group">
                        <label className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          onChange={handleChange}
                          value={controls.name}
                          className="form-control"
                          placeholder="Tên..."
                        />
                        {errors.name && touched.name && (
                          <small className="form-text text-danger">
                            {errors.name}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Nghề nghiệp <span className="text-danger">*</span>
                        </label>
                        <input
                          name="job"
                          onChange={handleChange}
                          value={controls.job}
                          className="form-control"
                          placeholder="Nghề nghiệp..."
                        />
                        {errors.name && touched.name && (
                          <small className="form-text text-danger">
                            {errors.name}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Nội dung <span className="text-danger">*</span>
                        </label>
                        <textarea
                          row="3"
                          name="content"
                          onChange={handleChange}
                          value={controls.content}
                          className="form-control"
                          placeholder="Nội dung..."
                        />
                        {errors.content && touched.content && (
                          <small className="form-text text-danger">
                            {errors.content}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
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

export default withAuth(AddTestimonial);
