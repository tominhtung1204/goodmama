import React, { useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { createPartner } from "../../../services/actions";
import { toast } from "react-toastify";
import Router from "next/router";
import Spiner from "../../../components/spiner";

const partnerSchema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  link: yup.string().required("Link không được để trống"),
  image: yup.string().required("Ảnh không được để trống")
});

const AddPartner = props => {
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState({
    name: "",
    link: "",
    image: "",
    fileUpload: null
  });

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

  const createdPartner = value => {
    const body = new FormData();
    body.append("name", value.name);
    body.append("link", value.link);
    body.append("image", controls.fileUpload);
    setLoaded(true);
    createPartner(body)
      .then(data => {
        toast.success("Thêm mới partner thành công");
        setLoaded(false);
        Router.push("/admin/partner");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể update partner.");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Thêm mới đối tác</h5>
            <h6 className="card-subtitle text-muted">Thêm mới đối tác</h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={partnerSchema}
              onSubmit={values => {
                createdPartner(values);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <Row>
                    <Col md={12}>
                      <div className="form-group">
                        <label className="form-label">
                          Tên <span className="text-danger">*</span>
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
                          Link{" "}
                          <span className="text-danger">
                            <span className="text-danger">*</span>
                          </span>
                        </label>
                        <input
                          name="link"
                          onChange={handleChange}
                          value={controls.link}
                          className="form-control"
                          placeholder="Link..."
                        />
                        {errors.link && touched.link && (
                          <small className="form-text text-danger">
                            {errors.link}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="form-group">
                        <label className="form-label">
                          Logo <span className="text-danger">*</span>
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

export default withAuth(AddPartner);
