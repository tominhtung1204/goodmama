import React, { useState, useEffect } from "react";
import withAuth from "../../components/hoc/withAuth";
import ModalAdmin from "../../components/admin/modal";
import {
  getAllMenu,
  createMenu,
  deleteMenu,
  getMenuById,
  updatedMenu
} from "../../services/actions";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button } from "react-bootstrap";

const MenuSchema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  url: yup.string().required("Link không được để trống")
});

const Menu = props => {
  const [menu, setMenu] = useState(null);
  const [changed, setChanged] = useState(false);
  const [controls, setControls] = useState({
    id: "",
    name: "",
    url: "",
    titleModal: "Thêm mới menu",
    show: false,
    showModalNew: false,
    isEdit: false
  });

  useEffect(() => {
    getAllMenu().then(data => {
      setMenu(data);
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
      name: "",
      url: "",
      isEdit: false
    });
  };

  const createdMenu = value => {
    const body = {
      name: value.name,
      url: value.url
    };
    setChanged(false);
    createMenu(body)
      .then(data => {
        toast.success("Thêm mới menu thành công.");
        setChanged(true);
        setControls({ ...controls, showModalNew: false });
      })
      .catch(err => {
        toast.error("Không thể thêm mới menu");
        setChanged(false);
        setControls({ ...controls, showModalNew: false });
      });
  };

  const setDataUpdateMenu = id => {
    getMenuById(id).then(data => {
      setControls({
        ...controls,
        showModalNew: true,
        titleModal: "Chỉnh sửa menu",
        name: data.name,
        url: data.url,
        id: id,
        isEdit: true
      });
    });
  };

  const updateMenu = value => {
    const body = {
      name: value.name,
      url: value.url
    };
    setChanged(false);
    updatedMenu(controls.id, body)
      .then(data => {
        toast.success("Update menu thành công.");
        setChanged(true);
        setControls({ ...controls, showModalNew: false });
      })
      .catch(err => {
        toast.error("Không thể update menu");
        setChanged(false);
        setControls({ ...controls, showModalNew: false });
      });
  };

  const deletedMenu = () => {
    setChanged(false);
    deleteMenu(controls.id)
      .then(data => {
        toast.success("Xóa menu thành công.");
        setChanged(true);
        setControls({ ...controls, show: false });
      })
      .catch(err => {
        toast.error("Không thể xóa menu");
        setChanged(false);
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

      <h1 className="h3 mb-3">Danh mục menu</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách menu</h5>
              <h6
                className="card-subtitle
                 text-muted"
              >
                Dach sách menu
              </h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Đường dẫn</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {menu && menu.length > 0 ? (
                  menu.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.url}</td>
                      <td>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => setDataUpdateMenu(item._id)}
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
        hanlerChanged={deletedMenu}
      >
        <h5>Bạn muốn xóa menu này?</h5>
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
            name: controls.name,
            url: controls.url
          }}
          enableReinitialize={true}
          validationSchema={MenuSchema}
          onSubmit={values => {
            controls.isEdit ? updateMenu(values) : createdMenu(values);
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
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
                  <small className="form-text text-danger">{errors.name}</small>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">
                  Link <span className="text-danger">*</span>
                </label>
                <input
                  name="url"
                  onChange={handleChange}
                  value={controls.url}
                  className="form-control"
                  placeholder="Đường dẫn..."
                />
                {errors.url && touched.url && (
                  <small className="form-text text-danger">{errors.url}</small>
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

export default withAuth(Menu);
