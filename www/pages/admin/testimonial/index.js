import React, { useState, useEffect } from "react";
import Link from "next/link";
import withAuth from "../../../components/hoc/withAuth";
import {
  getAllTestimonial,
  deleteTestimonial
} from "../../../services/actions";
import ModalAdmin from "../../../components/admin/modal";
import { toast } from "react-toastify";

const TestimonialAdmin = props => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    getAllTestimonial().then(data => {
      setTestimonial(data);
    });
  }, [deleted]);

  const hanlerChangeShowHideModal = id => {
    setId(id);
    setShow(!show);
  };

  const deletedTestimonial = () => {
    setDeleted(false);
    deleteTestimonial(id).then(data => {
      toast.success("Xóa đánh giá của khách hàng thành công.");
      setDeleted(true);
      setShow(!show);
    });
  };

  return (
    <>
      <Link href="/admin/testimonial/new">
        <a className="btn btn-primary float-right mt-n1">
          <i className="fas fa-plus"></i> Thêm mới
        </a>
      </Link>
      <h1 className="h3 mb-3">Đánh giá của khách hàng</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách đánh giá của khách hàng</h5>
              <h6 className="card-subtitle text-muted">
                Danh sách đánh giá của khách hàng
              </h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Nghề nghiệp</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {testimonial && testimonial.length > 0 ? (
                  testimonial.map((item, index) => (
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
                      <td>{item.name}</td>
                      <td>{item.job}</td>
                      <td>
                        <Link
                          href={`/admin/testimonial/[id]`}
                          as={`/admin/testimonial/${item._id}`}
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
        hanlerChanged={deletedTestimonial}
      >
        <h5>Bạn muốn xóa đánh giá này?</h5>
      </ModalAdmin>
    </>
  );
};

export default withAuth(TestimonialAdmin);
