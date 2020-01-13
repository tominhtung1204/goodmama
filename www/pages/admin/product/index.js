import React, { useState, useEffect } from "react";
import Link from "next/link";
import withAuth from "../../../components/hoc/withAuth";
import { getAllProduct, deleteProduct } from "../../../services/actions";
import ModalAdmin from "../../../components/admin/modal";
import { toast } from "react-toastify";
import Pagination from "../../../components/admin/pagination";

const ProductAdmin = props => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    getAllProduct({ page: page, limit: limit }).then(data => {
      setProduct(data);
    });
    return () => {
      isCancelled = true;
    };
  }, [limit, page, deleted]);

  const hanlerModalComfirm = id => {
    setId(id);
    setShow(!show);
  };

  const deletedProduct = () => {
    setDeleted(deleted);
    deleteProduct(id)
      .then(data => {
        toast.success("Xóa sản phẩm thành công.");
        setShow(!show);
        setDeleted(!deleted);
      })
      .catch(e => {
        toast.error("Không thể xóa sản phẩm.");
        setShow(!show);
      });
  };

  const changePage = page => {
    setPage(page);
  };

  const changePageSize = pageSize => {
    setLimit(pageSize);
  };

  return (
    <>
      <Link href="/admin/product/new">
        <a
          href="/admin/product/new"
          className="btn btn-primary float-right mt-n1"
        >
          <i className="fas fa-plus"></i> Thêm mới
        </a>
      </Link>

      <h1 className="h3 mb-3">Sản phẩm</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách sản phẩm</h5>
              <h6 className="card-subtitle text-muted">Dach sách sản phẩm</h6>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Danh mục</th>
                  <th>Giá (vnđ)</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {product && product.data && product.data.length > 0 ? (
                  product.data.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        {page > 1 ? (page - 1) * limit + index + 1 : index + 1}
                      </td>
                      <td>
                        <img
                          className="img-fluid"
                          style={{
                            width: "100px",
                            height: "auto",
                            maxHeight: "100px"
                          }}
                          src={
                            item.image.length > 0
                              ? item.image[0].data.link
                              : "/static/img/default-image.png"
                          }
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category ? item.category.title : ""}</td>
                      <td>{item.price.toLocaleString()}</td>
                      <td>
                        <Link
                          href={`/admin/product/[id]`}
                          as={`/admin/product/${item._id}`}
                          prefetch={false}
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
            {product && product.data && product.data.length > 0 && (
              <div className="text-right mt-3">
                <Pagination
                  totalPage={product.totalPage}
                  page={page}
                  total={product.total}
                  pageSize={limit}
                  changePage={changePage}
                  changePageSize={changePageSize}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalAdmin
        show={show}
        size={"sm"}
        title="Thông báo"
        onHide={() => hanlerModalComfirm("")}
        titleButtonCancel="Không"
        titleButtonComfirm="Có"
        hideFooter={false}
        hanlerChanged={deletedProduct}
      >
        <h5>Bạn muốn xóa sản phẩm này?</h5>
      </ModalAdmin>
    </>
  );
};

// ProductAdmin.getInitialProps = async ({ req }) => {
//   const product = await getAllProduct({ page: 1, limit: 10 }, req);
//   return { product };
// };

export default withAuth(ProductAdmin);
