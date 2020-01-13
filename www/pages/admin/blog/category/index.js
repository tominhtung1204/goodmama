import React, { useState, useEffect } from "react";
import withAuth from "../../../../components/hoc/withAuth";
import ModalAdmin from "../../../../components/admin/modal";
import {
  getCategoryBlog,
  createCategoryBlog,
  deleteCategoryBlog,
  getCategoryBlogById,
  updateCategoryBlog
} from "../../../../services/actions";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button } from "react-bootstrap";

const CategorySchema = yup.object().shape({
  title: yup.string().required("Tiêu đề không được để trống"),
  description: yup.string()
});

const categoriesBlog = props => {
  const [category, setCategory] = useState(null);
  const [changed, setChanged] = useState(false);
  const [controls, setControls] = useState({
    id: "",
    title: "",
    description: "",
    titleModal: "Thêm mới danh mục",
    show: false,
    showModalNew: false,
    isEdit: false
  });

  useEffect(() => {
    getCategoryBlog().then(data => {
      setCategory(data);
    });
  }, [changed]);

  const hanlerModalConfirm = id => {
    setControls({ ...controls, id: id, show: !controls.show });
  };

  const handleChange = event => {
    const field = event.target.name;
    setControls({ ...controls, [field]: event.target.value });
  };

  const hanlerModalNew = id => {
    setControls({
      ...controls,
      id: id,
      showModalNew: !controls.showModalNew,
      title: "",
      description: "",
      isEdit: false
    });
  };

  const createdCategoryBlog = value => {
    const body = {
      title: value.title,
      description: value.description
    };
    setChanged(false);
    createCategoryBlog(body)
      .then(data => {
        toast.success("Thêm mới danh mục thành công.");
        setControls({ ...controls, showModalNew: false });
        setChanged(true);
      })
      .catch(err => {
        toast.error("Không thể thêm mới danh mục");
        this.setState({ ...controls, showModalNew: false });
      });
  };

  const setDataUpdateCategoryBlog = id => {
    getCategoryBlogById(id).then(data => {
      setControls({
        ...controls,
        showModalNew: true,
        titleModal: "Chỉnh sửa danh mục",
        title: data.title,
        description: data.description,
        id: id,
        isEdit: true
      });
    });
  };

  const updatedCategoryBlog = value => {
    const body = {
      title: value.title,
      description: value.description
    };
    setChanged(false);
    updateCategoryBlog(controls.id, body)
      .then(data => {
        toast.success("Update danh mục thành công.");
        setChanged(true);
        setControls({ ...controls, showModalNew: false });
      })
      .catch(err => {
        toast.error("Không thể update danh mục");
        setControls({ ...controls, showModalNew: false });
      });
  };

  const deletedCategoryBlog = () => {
    setChanged(false);
    deleteCategoryBlog(controls.id)
      .then(data => {
        toast.success("Xóa danh mục thành công.");
        setChanged(true);
        setControls({ ...controls, show: false });
      })
      .catch(err => {
        toast.error("Không thể xóa danh mục");
        setControls({ ...controls, show: false });
      });
  };

  return (
    <>
      <a
        href="#"
        onClick={() => hanlerModalNew("")}
        className="btn btn-primary float-right mt-n1"
      >
        <i className="fas fa-plus"></i> Thêm mới
      </a>

      <h1 className="h3 mb-3">Danh mục bài viết</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách danh mục</h5>
              <h6
                className="card-subtitle
                 text-muted"
              >
                Dach sách danh mục bài viết
              </h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {category && category.length > 0 ? (
                  category.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => setDataUpdateCategoryBlog(item._id)}
                        >
                          <i className="far fa-edit" />
                        </a>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => hanlerModalConfirm(item._id)}
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Không có dữ liệu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalAdmin
        show={controls.show}
        size={"sm"}
        title="Thông báo"
        hideFooter={false}
        onHide={() => hanlerModalConfirm("")}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hanlerChanged={deletedCategoryBlog}
      >
        <h5>Bạn muốn xóa danh mục này?</h5>
      </ModalAdmin>
      <ModalAdmin
        show={controls.showModalNew}
        size={"lg"}
        hideFooter={true}
        title={controls.titleModal}
        onHide={() => hanlerModalNew("")}
      >
        <Formik
          initialValues={{
            title: controls.title,
            description: controls.description
          }}
          enableReinitialize={true}
          validationSchema={CategorySchema}
          onSubmit={values => {
            controls.isEdit
              ? updatedCategoryBlog(values)
              : createdCategoryBlog(values);
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
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
                  value={values.description}
                  className="form-control"
                  placeholder="Mô tả..."
                />
                {errors.description && touched.description && (
                  <small className="form-text text-danger">
                    {errors.description}
                  </small>
                )}
              </div>
              <Button type="submit" className="float-right">
                {controls.isEdit ? "Lưu" : "Thêm mới"}
              </Button>
            </Form>
          )}
        </Formik>
      </ModalAdmin>
    </>
  );
};

export default withAuth(categoriesBlog);
