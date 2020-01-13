import React from "react";

const DescriptionProduct = props => {
  const createMarkup = content => {
    return { __html: content };
  };
  return (
    <div className="row mb-50">
      <div className="col-12">
        <ul className="pro-info-tab-list section nav">
          <li>
            <a className="active" href="#more-info" data-toggle="tab">
              Mô tả
            </a>
          </li>
        </ul>
      </div>

      <div className="tab-content col-12">
        <div className="pro-info-tab tab-pane active" id="more-info">
          <div
            dangerouslySetInnerHTML={createMarkup(props.product.description)}
          ></div>
        </div>
        <div className="pro-info-tab tab-pane" id="data-sheet">
          <table className="table-data-sheet">
            <tbody>
              <tr className="odd">
                <td>Compositions</td>
                <td>Cotton</td>
              </tr>
              <tr className="even">
                <td>Styles</td>
                <td>Casual</td>
              </tr>
              <tr className="odd">
                <td>Properties</td>
                <td>Short Sleeve</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pro-info-tab tab-pane" id="reviews">
          <a href="#">Be the first to write your review!</a>
        </div>
      </div>
    </div>
  );
};

export default DescriptionProduct;
