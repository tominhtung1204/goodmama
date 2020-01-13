import React from "react";

const PaginationPage = props => {
  const { totalPage, page, total, pageSize, changePage } = props;
  return (
    <ul className="page-pagination">
      <li>
        <a href="#" onClick={() => changePage(page > 1 ? page - 1 : 1)}>
          <i className="fa fa-angle-left"></i>
        </a>
      </li>

      {totalPage <= 5 &&
        Array.from(Array(totalPage), (e, i) => (
          <li
            key={i}
            onClick={() => changePage(i + 1)}
            className={i + 1 === page ? "active" : ""}
          >
            <a href="#">{i + 1}</a>
          </li>
        ))}
      {totalPage > 5 && (
        <>
          {page - 3 > 0 && (
            <li
              onClick={() => changePage(1)}
              className={page === 1 ? "active" : ""}
            >
              <a href="#"> {1}</a>
            </li>
          )}

          {page - 1 > 3 && (
            <li>
              <a href="#">...</a>
            </li>
          )}

          {Array.from(Array(totalPage), (e, i) => (
            <React.Fragment key={i}>
              {i + 1 > page - 3 && i + 1 < page + 3 && i + 1 < totalPage && (
                <li
                  onClick={() => changePage(i + 1)}
                  className={i + 1 === page ? "active" : ""}
                >
                  <a href="#"> {i + 1}</a>
                </li>
              )}
            </React.Fragment>
          ))}
          {totalPage - page > 3 && (
            <li>
              <a href="#">...</a>
            </li>
          )}
          <li
            onClick={() => changePage(totalPage)}
            className={totalPage === page ? "active" : ""}
          >
            <a href="#"> {totalPage}</a>
          </li>
        </>
      )}
      <li>
        <a
          href="#"
          onClick={() => changePage(page < totalPage ? page + 1 : totalPage)}
        >
          <i className="fa fa-angle-right"></i>
        </a>
      </li>
    </ul>
  );
};

export default PaginationPage;
