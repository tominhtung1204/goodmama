import React, { useState, useEffect } from "react";
import Link from "next/link";
import withAuth from "../../../components/hoc/withAuth";
import { getAllBlog, deleteBlog } from "../../../services/actions";
import ModalAdmin from "../../../components/admin/modal";
import { toast } from "react-toastify";
import Pagination from "../../../components/admin/pagination";

const BlogAdmin = props => {
  const [controls, setControls] = useState({
    show: false,
    id: "",
    page: 1,
    limit: 10
  });
  const [deleted, setDeleted] = useState(false);
  const [blog, setBlog] = useState(null);

  const hanlerModalComfirm = id => {
    setControls({ ...controls, id: id, show: !controls.show });
  };

  useEffect(() => {
    getAllBlog({ page: controls.page, limit: controls.limit }).then(data => {
      setBlog(data);
    });
  }, [controls.page, controls.limit, deleted]);

  const deletedBlog = () => {
    setDeleted(true);
    deleteBlog(controls.id)
      .then(data => {
        toast.success("Xóa bài viết thành công.");
        setControls({ ...controls, show: !controls.show });
        setDeleted(false);
      })
      .catch(e => {
        toast.error("Không thể xóa bài viết.");
        setControls({ ...controls, show: !controls.show });
        setDeleted(false);
      });
  };

  const changePage = page => {
    setControls({
      ...controls,
      page: page
    });
  };

  const changePageSize = pageSize => {
    setControls({
      ...controls,
      limit: pageSize
    });
  };

  return (
    <>
      <Link href="/admin/blog/new">
        <a className="btn btn-primary float-right mt-n1">
          <i className="fas fa-plus"></i> Thêm mới
        </a>
      </Link>
      <h1 className="h3 mb-3">Tin tức</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách tin tức</h5>
              <h6 className="card-subtitle text-muted">Dach sách tin tức</h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th style={{ width: "30%" }}>Tiêu đề</th>
                  <th>Danh mục</th>
                  <th>Tác giả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {blog && blog.data && blog.data.length > 0 ? (
                  blog.data.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        {controls.page > 1
                          ? (controls.page - 1) * controls.limit + index + 1
                          : index + 1}
                      </td>
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
                      <td style={{ width: "30%" }}>{item.title}</td>
                      <td>{item.category ? item.category.title : ""}</td>
                      <td>{item.author ? item.author.name : ""}</td>
                      <td>
                        <Link
                          href={`/admin/blog/[id]`}
                          as={`/admin/blog/${item._id}`}
                        >
                          <a>
                            <i className="far fa-edit" />
                          </a>
                        </Link>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => hanlerModalComfirm(item._id)}
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Không có dữ liệu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {blog && blog.data && blog.data.length > 0 && (
              <div className="text-right mt-3">
                <Pagination
                  totalPage={blog.totalPage}
                  page={controls.page}
                  total={blog.total}
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
        onHide={() => hanlerModalComfirm("")}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hideFooter={false}
        hanlerChanged={deletedBlog}
      >
        <h5>Bạn muốn xóa bài viết này?</h5>
      </ModalAdmin>
    </>
  );
};

export default withAuth(BlogAdmin);
