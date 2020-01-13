import React, { useState, useEffect } from "react";
import withAuth from "../../../components/hoc/withAuth";
import ModalAdmin from "../../../components/admin/modal";
import { getAllPage, deletePage } from "../../../services/actions";
import { toast } from "react-toastify";
import Link from "next/link";

const PageAdmin = props => {
  const [page, setPage] = useState(null);
  const [changed, setChanged] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    getAllPage().then(data => {
      setPage(data);
    });
  }, [changed]);

  const hanlerModalConfirm = id => {
    setShow(!show);
    setId(id);
  };

  const deletedPage = () => {
    setChanged(false);
    deletePage(id)
      .then(data => {
        toast.success("Xóa page thành công.");
        setChanged(true);
        setShow(false);
      })
      .catch(err => {
        toast.error("Không thể xóa page");
        setChanged(false);
        setShow(false);
      });
  };

  return (
    <>
      <Link href="/admin/page/new">
        <a className="btn btn-primary float-right mt-n1">
          <i className="fas fa-plus"></i> Thêm mới
        </a>
      </Link>

      <h1 className="h3 mb-3">Danh mục page</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách page</h5>
              <h6
                className="card-subtitle
                 text-muted"
              >
                Dach sách page
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
                {page && page.length > 0 ? (
                  page.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.url}</td>
                      <td>
                        <Link
                          href={`/admin/page/[slug]`}
                          as={`/admin/page/${item.url}`}
                        >
                          <a className="ml-2">
                            <i className="far fa-edit" />
                          </a>
                        </Link>

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
        show={show}
        size={"sm"}
        title="Thông báo"
        hideFooter={false}
        onHide={() => hanlerModalConfirm("")}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hanlerChanged={deletedPage}
      >
        <h5>Bạn muốn xóa menu này?</h5>
      </ModalAdmin>
    </>
  );
};

export default withAuth(PageAdmin);
