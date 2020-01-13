import React, { useState, useEffect } from "react";
import withAuth from "../../components/hoc/withAuth";
import ModalAdmin from "../../components/admin/modal";
import {
  getAllVideo,
  createVideo,
  deleteVideo,
  getVideoById,
  updatedVideo
} from "../../services/actions";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import Pagination from "../../components/admin/pagination";

const VideoSchema = yup.object().shape({
  title: yup.string().required("Tiêu đề không được để trống"),
  url: yup.string().required("Link không được để trống")
});

const VideoAdmin = props => {
  const [video, setVideo] = useState(null);
  const [changed, setChanged] = useState(false);
  const [controls, setControls] = useState({
    id: "",
    title: "",
    url: "",
    titleModal: "Thêm mới video",
    show: false,
    showModalNew: false,
    isEdit: false,
    page: 1,
    limit: 10
  });

  useEffect(() => {
    getAllVideo({ page: controls.page, limit: controls.limit }).then(data => {
      setVideo(data);
    });
  }, [controls.page, controls.limit, changed]);

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
      url: "",
      isEdit: false
    });
  };

  const createdVideo = value => {
    const body = {
      title: value.title,
      url: getIdVideo(value.url)
    };
    setChanged(false);
    createVideo(body)
      .then(data => {
        toast.success("Thêm mới video thành công.");
        setChanged(true);
        setControls({ ...controls, showModalNew: false });
      })
      .catch(err => {
        toast.error("Không thể thêm mới video");
        setControls({ ...controls, showModalNew: false });
      });
  };

  const changePage = page => {
    setControls({
      ...controls,
      page: page
    });
  };

  const changePageSize = pageSize => {
    this.setState({
      ...controls,
      limit: pageSize
    });
  };

  const getIdVideo = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return "https://www.youtube.com/embed/" + match[2];
    } else {
      return "error";
    }
  };

  const setDataUpdateVideo = id => {
    getVideoById(id).then(data => {
      setControls({
        ...controls,
        showModalNew: true,
        titleModal: "Chỉnh sửa video",
        title: data.title,
        url: data.url,
        id: id,
        isEdit: true
      });
    });
  };

  const updateVideo = value => {
    const body = {
      title: value.title,
      url: getIdVideo(value.url)
    };
    setChanged(false);
    updatedVideo(controls.id, body)
      .then(data => {
        toast.success("Update video thành công.");
        setChanged(true);
        setControls({ ...controls, showModalNew: false });
      })
      .catch(err => {
        toast.error("Không thể update video");
        setControls({ ...controls, showModalNew: false });
      });
  };

  const deletedVideo = () => {
    setChanged(false);
    deleteVideo(controls.id)
      .then(data => {
        setChanged(true);
        toast.success("Xóa video thành công.");
        setControls({ ...controls, show: false });
      })
      .catch(err => {
        toast.error("Không thể xóa video");
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

      <h1 className="h3 mb-3">Danh mục video</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách video</h5>
              <h6
                className="card-subtitle
                 text-muted"
              >
                Dach sách video
              </h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tiêu đề</th>
                  <th>Đường dẫn</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {video && video.data && video.data.length > 0 ? (
                  video.data.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.url}</td>
                      <td>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => setDataUpdateVideo(item._id)}
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
            {video && video.data && video.data.length > 0 && (
              <div className="text-right mt-3">
                <Pagination
                  totalPage={video.totalPage}
                  page={controls.page}
                  total={video.total}
                  pageSize={controls.limit}
                  changePage={changePage}
                  changePageSize={changePageSize}
                />
              </div>
            )}
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
        hanlerChanged={deletedVideo}
      >
        <h5>Bạn muốn xóa video này?</h5>
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
            url: controls.url
          }}
          enableReinitialize={true}
          validationSchema={VideoSchema}
          onSubmit={values => {
            controls.isEdit ? updateVideo(values) : createdVideo(values);
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

export default withAuth(VideoAdmin);
