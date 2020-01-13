import React, { useState, useEffect } from "react";
import Link from "next/link";
import withAuth from "../../../../components/hoc/withAuth";
import {
  getAllCategoryProduct,
  deleteCategoryProduct
} from "../../../../services/actions";
import ModalAdmin from "../../../../components/admin/modal";
import { toast } from "react-toastify";

const categoryProductAdmin = props => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [category, setCategory] = useState(null);

  const hideShowModal = id => {
    setShow(!show);
    setId(id);
  };

  useEffect(() => {
    getAllCategoryProduct().then(data => {
      setCategory(data);
    });
  }, [deleted]);

  const deletedCategoryProduct = () => {
    setDeleted(false);
    deleteCategoryProduct(id)
      .then(data => {
        toast.success("Xóa danh mục thành công.");
        setShow(!show);
        setDeleted(true);
      })
      .catch(er => {
        setShow(!show);
        toast.error("Không thể xóa danh mục");
      });
  };

  return (
    <>
      <Link href="/admin/product/category/new">
        <a className="btn btn-primary float-right mt-n1">
          <i className="fas fa-plus"></i> Thêm mới
        </a>
      </Link>
      <h1 className="h3 mb-3">Danh mục sản phẩm</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách danh mục sản phẩm</h5>
              <h6 className="card-subtitle text-muted">
                Danh sách danh mục sản phẩm
              </h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {category && category.length > 0 ? (
                  category.map((item, index) => (
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
                      <td>{item.description}</td>
                      <td>
                        <Link
                          href={`/admin/product/category/[id]`}
                          as={`/admin/product/category/${item._id}`}
                        >
                          <a>
                            <i className="far fa-edit" />
                          </a>
                        </Link>
                        <a
                          href="#"
                          className="ml-2"
                          onClick={() => hideShowModal(item._id)}
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
        onHide={() => hideShowModal("")}
        hideFooter={false}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hanlerChanged={deletedCategoryProduct}
      >
        <h5>Bạn muốn xóa danh mục này?</h5>
      </ModalAdmin>
    </>
  );
};

export default withAuth(categoryProductAdmin);
