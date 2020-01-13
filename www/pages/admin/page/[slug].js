import React, { useState, useEffect, useRef } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getPageById, updatePage } from "../../../services/actions";
import { MyUploadAdapter } from "../../../components/admin/uploadImage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spiner from "../../../components/spiner";

const pageSchema = yup.object().shape({
  name: yup.string().required("Tên trang không được để trống"),
  url: yup.string(),
  content: yup.string()
});

const EditPageAdmin = props => {
  const editorRef = useRef(null);
  const router = useRouter();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState({
    name: "",
    content: ""
  });

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    setEditorLoaded(true);
  });

  useEffect(() => {
    getPageById(router.query.slug).then(data => {
      setControls({
        ...controls,
        name: data.name,
        content: data.content
      });
    });
  }, []);

  const handleChange = event => {
    const field = event.target.name;
    setControls({ ...controls, [field]: event.target.value });
  };

  const updatedPage = value => {
    const body = {
      name: value.name,
      content: value.content
    };
    setLoaded(true);
    updatePage(router.query.slug, body)
      .then(data => {
        toast.success("Update page thành công");
        setLoaded(false);
        router.push("/admin/page");
      })
      .catch(err => {
        setLoaded(false);
        toast.error("Không thể update page");
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Chỉnh sửa page</h5>
            <h6 className="card-subtitle text-muted">Chỉnh sửa page</h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={pageSchema}
              onSubmit={values => {
                updatedPage(values);
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
                          placeholder="Tiêu đề..."
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
                        {editorLoaded && controls.content && (
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

export default withAuth(EditPageAdmin);
