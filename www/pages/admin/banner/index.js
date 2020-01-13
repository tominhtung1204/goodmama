import React, { useState, useEffect } from "react";
import Link from "next/link";
import withAuth from "../../../components/hoc/withAuth";
import { getAllBanner, deleteBanner } from "../../../services/actions";
import ModalAdmin from "../../../components/admin/modal";
import { toast } from "react-toastify";

const BannerAdmin = props => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState(null);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getAllBanner().then(res => {
      setBanner(res);
    });
  }, [deleted]);

  const hanlerChangeShowHideModal = id => {
    setId(id);
    setShow(!show);
  };

  const deletedBanner = () => {
    setDeleted(true);
    deleteBanner(id).then(data => {
      toast.success("Xóa banner thành công.");
      setShow(!show);
      setDeleted(false);
    });
  };

  return (
    <>
      <Link href="/admin/banner/new">
        <a className="btn btn-primary float-right mt-n1">
          <i className="fas fa-plus"></i> Thêm mới
        </a>
      </Link>
      <h1 className="h3 mb-3">Banner</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách banner</h5>
              <h6 className="card-subtitle text-muted">
                Dach sách banner quảng cáo trang chủ
              </h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tiêu đề</th>
                  <th>Phụ đề</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {banner && banner.length > 0 ? (
                  banner.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          className="img-fluid"
                          style={{
                            width: "100px",
                            height: "auto",
                            maxHeight: "100px"
                          }}
                          src={item.image}
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.subTitle}</td>
                      <td>
                        <Link
                          href={`/admin/banner/[id]`}
                          as={`/admin/banner/${item._id}`}
                        >
                          <a>
                            <i className="far fa-edit" />
                          </a>
                        </Link>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => hanlerChangeShowHideModal(item._id)}
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
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
        show={show}
        size={"sm"}
        title="Thông báo"
        onHide={() => hanlerChangeShowHideModal("")}
        hideFooter={false}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hanlerChanged={deletedBanner}
      >
        <h5>Bạn muốn xóa banner này?</h5>
      </ModalAdmin>
    </>
  );
};

export default withAuth(BannerAdmin);
