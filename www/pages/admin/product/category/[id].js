import React, { useEffect, useState } from "react";
import withAuth from "../../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  updateCatgoryProduct,
  getCategoryProductById
} from "../../../../services/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spiner from "../../../../components/spiner";

const categorySchema = yup.object().shape({
  title: yup.string().required("Tiêu đề không được để trống"),
  description: yup.string(),
  image: yup.string().required("Ảnh không được để trống")
});

const EditCategoryProductAdmin = props => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState({
    title: "",
    description: "",
    image: "",
    children: [],
    fileUpload: null
  });

  useEffect(() => {
    getCategoryProductById(router.query.id).then(data => {
      setControls(data);
    });
  }, []);

  const addCategory = () => {
    const newCategory = controls.children;
    newCategory.push({
      title: ""
    });
    setControls({
      ...controls,
      children: newCategory
    });
  };

  const removeCategory = index => {
    const neCategory = controls.children;
    neCategory.splice(index, 1);
    setControls({
      ...controls,
      children: neCategory
    });
  };

  const changeNameCategory = (event, index) => {
    const newCategory = controls.children;
    newCategory[index].title = event.target.value;
    setControls({
      ...controls,
      count: newCategory
    });
  };

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

  const updatedCatgoryProduct = (id, value) => {
    const body = new FormData();
    body.append("title", value.title);
    body.append("description", value.description);
    body.append(
      "image",
      controls.fileUpload ? controls.fileUpload : controls.image
    );
    setLoaded(true);
    updateCatgoryProduct(id, body)
      .then(data => {
        toast.success("Updated danh mục sản phẩm thành công");
        setLoaded(false);
        router.push("/admin/product/category");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể update danh mục sản phẩm");
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
              validationSchema={categorySchema}
              onSubmit={values => {
                updatedCatgoryProduct(router.query.id, values);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <Row>
                    <Col md={12}>
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
                          Mô tả <span className="text-danger"></span>
                        </label>
                        <textarea
                          row="3"
                          name="description"
                          onChange={handleChange}
                          value={controls.description}
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
                        <label className="form-label d-block">
                          Danh mục con
                        </label>
                        {controls.children.map((item, index) => (
                          <div className="d-flex mb-2" key={index}>
                            <input
                              name="name"
                              onChange={event =>
                                changeNameCategory(event, index)
                              }
                              value={item.title}
                              className="form-control mr-3"
                              placeholder="Tên danh mục ..."
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm  ml-3"
                              onClick={() => removeCategory(index)}
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addCategory}
                          type="button"
                          className="btn btn-primary btn-sm "
                        >
                          Thêm danh mục
                        </button>
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

export default withAuth(EditCategoryProductAdmin);
