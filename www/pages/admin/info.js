import React, { useState, useEffect } from "react";
import withAuth from "../../components/hoc/withAuth";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import {
  getInfoWeb,
  updateInfoWeb,
  updateLogo,
  deleteLogo
} from "../../services/actions";
import * as yup from "yup";
import ModalAdmin from "../../components/admin/modal";
import { toast } from "react-toastify";
import Spiner from "../../components/spiner";

const InfoSchema = yup.object().shape({
  title: yup
    .string()
    .max(60, "Tiêu đề không được dài quá 60 ký tự")
    .required("Tiêu đề không được để trống"),
  description: yup
    .string()
    .min(50, "Mô tả không được ngắn hơn 50 ký tự")
    .max(160, "Mô tả không được dài quá 160 ký tự"),
  keyword: yup.string(),
  address: yup.string(),
  phone: yup.number("Số điện thoại không đúng."),
  email: yup.string().email("Email không đúng định dạng."),
  facebook: yup.string().url("Link facebook không đúng định dạng."),
  twitter: yup.string().url("Link twitter không đúng định dạng."),
  skype: yup.string().url("Link skype không đúng định dạng."),
  linkedin: yup.string().url("Link linkedin không đúng định dạng.")
});

const Info = props => {
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState({
    show: false,
    title: "",
    description: "",
    keyword: "",
    googleSearch: "",
    logo: "",
    address: "",
    phone: "",
    email: "",
    facebook: "",
    twitter: "",
    skype: "",
    zalo: "",
    linkedin: ""
  });

  useEffect(() => {
    getInfoWeb().then(data => {
      setControls(data);
    });
  }, []);

  const handleChange = event => {
    const field = event.target.name;
    setControls({ ...controls, [field]: event.target.value });
  };

  const removeImg = () => {
    const imgValue = document.getElementById("logo-file");
    imgValue.value = "";
    setControls({
      ...controls,
      logo: "",
      show: false
    });
    deleteLogo()
      .then(data => {
        toast.success("Xoá logo thành công.");
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const updatedLogo = file => {
    const body = new FormData();
    body.append("image", file);
    updateLogo(body)
      .then(data => {
        toast.success("Update logo thành công.");
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const onHanlerConfirmModal = () => {
    setControls({
      ...controls,
      show: !controls.show
    });
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
            logo: ev.target.result
          });
          updatedLogo(file);
        }
      };
    }
  };
  return (
    <>
      <h1 className="h3 mb-3">Thông Tin Website</h1>
      <Formik
        initialValues={{
          ...controls
        }}
        enableReinitialize={true}
        validationSchema={InfoSchema}
        onSubmit={values => {
          setLoaded(true);
          updateInfoWeb(values).then(
            data => {
              toast.success("Cập nhật thông tin website thành công.");
              setLoaded(false);
            },
            err => {
              toast.error("Không thể cập nhật thông tin website.");
              setLoaded(false);
            }
          );
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Thông tin chung</h5>
                    <h6 className="card-subtitle text-muted">
                      Thông tin mô tả về website của bạn.
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Tiêu đề</label>
                      <input
                        name="title"
                        onChange={handleChange}
                        value={controls.title}
                        className="form-control"
                        placeholder="Tiêu đề website..."
                      />
                      {errors.title && touched.title && (
                        <small className="form-text text-danger">
                          {errors.title}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mô tả</label>
                      <textarea
                        className="form-control"
                        onChange={handleChange}
                        value={controls.description}
                        name="description"
                        rows="2"
                        placeholder="Description..."
                      ></textarea>
                      {errors.description && touched.description && (
                        <small className="form-text text-danger">
                          {errors.description}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Keyword</label>
                      <textarea
                        className="form-control"
                        onChange={handleChange}
                        value={controls.keyword}
                        name="keyword"
                        rows="2"
                        placeholder="Keyword..."
                      ></textarea>
                      {errors.keyword && touched.keyword && (
                        <small className="form-text text-danger">
                          {errors.keyword}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Goolge Search Verify</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={controls.googleSearch}
                        name="googleSearch"
                        className="form-control"
                        placeholder="Code google search verify..."
                      />
                      {errors.googleSearch && touched.googleSearch && (
                        <small className="form-text text-danger">
                          {errors.googleSearch}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label w-100">Logo</label>
                      <input
                        onChange={handleSelectImage}
                        id="logo-file"
                        className="d-none"
                        type="file"
                      />
                      {controls.logo === "" && (
                        <label className="img-logo" htmlFor="logo-file">
                          <i className="fas fa-image" />
                        </label>
                      )}
                      {controls.logo !== "" && (
                        <label className="logo-display">
                          <img
                            className="img-fluid"
                            src={controls.logo}
                            alt="logo"
                          />
                          <i
                            className="far fa-times-circle"
                            onClick={onHanlerConfirmModal}
                          />
                        </label>
                      )}
                    </div>
                    <Button disabled={loaded} type="submit">
                      Lưu
                      {loaded && <Spiner />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Thông tin liên hệ</h5>
                    <h6 className="card-subtitle text-muted">
                      Thông tin liên hệ của bạn.
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Địa chỉ</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={controls.address}
                        name="address"
                        className="form-control"
                        placeholder="Địa chỉ..."
                      />
                      {errors.address && touched.address && (
                        <small className="form-text text-danger">
                          {errors.address}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={controls.phone}
                        name="phone"
                        className="form-control"
                        placeholder="Số điện thoại..."
                      />
                      {errors.phone && touched.phone && (
                        <small className="form-text text-danger">
                          {errors.phone}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Zalo</label>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={controls.zalo}
                        name="zalo"
                        className="form-control"
                        placeholder="Số Zalo..."
                      />
                      {errors.phone && touched.phone && (
                        <small className="form-text text-danger">
                          {errors.phone}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={handleChange}
                        value={controls.email}
                        name="email"
                        placeholder="Email..."
                      />
                      {errors.email && touched.email && (
                        <small className="form-text text-danger">
                          {errors.email}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fab fa-facebook-square"></i>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          value={controls.facebook}
                          name="facebook"
                          id="facebook"
                          placeholder="Link facebook"
                        />
                      </div>
                      {errors.facebook && touched.facebook && (
                        <small className="form-text text-danger d-block">
                          {errors.facebook}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fab fa-twitter-square"></i>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          value={controls.twitter}
                          name="twitter"
                          id="twitter"
                          placeholder="Link twitter"
                        />
                      </div>
                      {errors.twitter && touched.twitter && (
                        <small className="form-text text-danger">
                          {errors.twitter}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fab fa-skype"></i>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          value={controls.skype}
                          name="skype"
                          id="skype"
                          placeholder="Link skype"
                        />
                      </div>
                      {errors.skype && touched.skype && (
                        <small className="form-text text-danger">
                          {errors.skype}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fab fa-linkedin"></i>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          value={controls.linkedin}
                          name="linkedin"
                          id="linkedin"
                          placeholder="Link linkedin"
                        />
                      </div>
                      {errors.linkedin && touched.linkedin && (
                        <small className="form-text text-danger">
                          {errors.linkedin}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ModalAdmin
        show={controls.show}
        size={"sm"}
        title="Thông báo"
        onHide={onHanlerConfirmModal}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hideFooter={false}
        hanlerChanged={removeImg}
      >
        <h5>Bạn muốn xóa logo này?</h5>
      </ModalAdmin>
    </>
  );
};

export default withAuth(Info);
