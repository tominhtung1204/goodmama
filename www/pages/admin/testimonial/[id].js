import React, { useState, useEffect } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  getTestimonialById,
  updatedTestimonial
} from "../../../services/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spiner from "../../../components/spiner";

const testimonialSchema = yup.object().shape({
  name: yup.string().required("Tên  không được để trống"),
  content: yup.string().required("Nội dung  không được để trống"),
  job: yup.string().required("Nghề nghiệp không được để trống"),
  image: yup.string().required("Ảnh không được để trống")
});

const EditTestimonial = props => {
  const router = useRouter();
  const [controls, setControls] = useState({
    name: "",
    content: "",
    job: "",
    image: "",
    fileUpload: null
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTestimonialById(router.query.id).then(data => {
      setControls(data);
    });
  }, []);

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

  const updateTestimonial = value => {
    const body = new FormData();
    body.append("name", value.name);
    body.append("content", value.content);
    body.append("job", value.job);
    body.append(
      "image",
      controls.fileUpload ? controls.fileUpload : controls.image
    );
    setLoaded(true);
    updatedTestimonial(router.query.id, body)
      .then(data => {
        toast.success("Updated đánh giá thành công");
        setLoaded(false);
        router.push("/admin/testimonial");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể update đánh giá");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Chỉnh sửa đánh giá khách hàng</h5>
            <h6 className="card-subtitle text-muted">
              Chỉnh sửa đánh giá khách hàng
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
                updateTestimonial(values);
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
                        Lưu
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

export default withAuth(EditTestimonial);
