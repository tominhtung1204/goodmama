import React, { useState, useRef, useEffect } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getCategoryBlog, createBlog } from "../../../services/actions";
import { toast } from "react-toastify";
import Router from "next/router";
import { MyUploadAdapter } from "../../../components/admin/uploadImage";
import Spiner from "../../../components/spiner";

const BlogSchema = yup.object().shape({
  title: yup.string().required("Tiêu đề không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  content: yup.string().required("Nội dung không được để trống"),
  category: yup.string().required("Danh mục không được để trống"),
  tag: yup.string(),
  image: yup.string().required("Ảnh không được để trống")
});

const AddBlog = props => {
  const editorRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [listCategory, setListCategory] = useState(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [controls, setControls] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    category: "",
    tag: "",
    fileUpload: null
  });

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    setEditorLoaded(true);
  });

  useEffect(() => {
    getCategoryBlog().then(data => {
      setListCategory(data);
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
    const imgValue = document.getElementById("image-blog");
    imgValue.value = "";
    setControls({
      image: "",
      fileUpload: null
    });
  };

  const createdBlog = value => {
    const body = new FormData();
    body.append("title", value.title);
    body.append("content", value.content);
    body.append("description", value.description);
    body.append("image", controls.fileUpload);
    body.append("tag", value.tag);
    body.append("category", value.category);
    setLoaded(true);
    createBlog(body)
      .then(data => {
        toast.success("Thêm mới bài viết thành công");
        setLoaded(false);
        Router.push("/admin/blog");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể thêm mới bài viết.");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Thêm mới bài viết</h5>
            <h6 className="card-subtitle text-muted">Thêm mới bài viết</h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={BlogSchema}
              onSubmit={values => {
                createdBlog(values);
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
                          Mô tả ngắn <span className="text-danger">*</span>
                        </label>
                        <textarea
                          rows="7"
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
                        <label className="form-label">
                          Danh mục <span className="text-danger">*</span>
                        </label>
                        <select
                          name="category"
                          onChange={handleChange}
                          className="custom-select"
                          defaultValue={controls.category}
                        >
                          <option value="">Chọn danh mục</option>
                          {listCategory &&
                            listCategory.length &&
                            listCategory.map(item => (
                              <option key={item._id} value={item._id}>
                                {item.title}
                              </option>
                            ))}
                        </select>
                        {errors.category && touched.category && (
                          <small className="form-text text-danger">
                            {errors.category}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Tag <span className="text-danger"></span>
                        </label>
                        <input
                          name="tag"
                          onChange={handleChange}
                          value={controls.tag}
                          className="form-control"
                          placeholder="Tag..."
                        />
                        {errors.title && touched.title && (
                          <small className="form-text text-danger">
                            {errors.title}
                          </small>
                        )}
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
                          id="image-blog"
                          className="d-none"
                          onChange={handleSelectImage}
                        />
                        {controls.image === "" && (
                          <label
                            className="img-banner"
                            htmlFor="image-blog"
                            style={{ width: "100%" }}
                          >
                            <i className="fas fa-image" />
                          </label>
                        )}
                        {controls.image !== "" && (
                          <label
                            className="banner-display"
                            style={{ width: "100%" }}
                          >
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
                    <Col md={12}>
                      <div className="form-group">
                        <label className="form-label">
                          Nội dung <span className="text-danger">*</span>
                        </label>
                        {editorLoaded && (
                          <CKEditor
                            ref={editorRef}
                            editor={ClassicEditor}
                            onInit={editor => {
                              editor.setData(controls.content);
                              editor.plugins.get(
                                "FileRepository"
                              ).createUploadAdapter = function(loader) {
                                return new MyUploadAdapter(loader);
                              };
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setControls({
                                ...controls,
                                content: data
                              });
                            }}
                          />
                        )}
                        {errors.content && touched.content && (
                          <small className="form-text text-danger">
                            {errors.content}
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

export default withAuth(AddBlog);
