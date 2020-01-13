import React, { useEffect, useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { updatePartner, getPartnerById } from "../../../services/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spiner from "../../../components/spiner";

const partnerSchema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  link: yup.string().required("Link không được để trống"),
  image: yup.string().required("Ảnh không được để trống")
});

const EditPartner = props => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState({
    name: "",
    link: "",
    image: "",
    fileUpload: null
  });

  useEffect(() => {
    getPartnerById(router.query.id).then(data => {
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

  const updatedPartner = (id, value) => {
    const body = new FormData();
    body.append("name", value.name);
    body.append("link", value.link);
    body.append(
      "image",
      controls.fileUpload ? controls.fileUpload : controls.image
    );
    setLoaded(true);
    updatePartner(id, body)
      .then(data => {
        toast.success("Updated đối tác thành công");
        setLoaded(false);
        router.push("/admin/partner");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể update đối tác");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Chỉnh sửa danh mục sản phẩm</h5>
            <h6 className="card-subtitle text-muted">
              Chỉnh sửa danh mục sản phẩm
            </h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={partnerSchema}
              onSubmit={values => {
                updatedPartner(router.query.id, values);
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

export default withAuth(EditPartner);
