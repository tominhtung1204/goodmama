import React from "react";
import Pagination from "../page/pagination";
import ItemProduct from "./itemProduct";

const ListProduct = props => (
  <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
    <div className="row">
      {props.product &&
        props.product.data.map(item => (
          <div key={item._id} className="col-xl-4 col-md-6 col-12 mb-40">
            <ItemProduct item={item} />
          </div>
        ))}
      {props.product && props.product.data.length === 0 && (
        <div className="col-12">
          <h4 style={{ textAlign: "center" }}>Không có sản phẩm nào!</h4>
        </div>
      )}
      <div className="col-12">
        {props.product && props.product.data.length > 0 && (
          <Pagination
            totalPage={props.product.totalPage}
            page={props.product.page}
            total={props.product.total}
            pageSize={props.product.pageSize}
            changePage={props.changePage}
          />
        )}
      </div>
    </div>
  </div>
);

export default ListProduct;
