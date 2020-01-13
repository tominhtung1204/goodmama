import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationAdmin = props => {
  const {
    totalPage,
    page,
    total,
    pageSize,
    changePage,
    changePageSize
  } = props;

  return (
    <div className="pagination-custom">
      <Pagination>
        <Pagination.First disabled={page === 1} onClick={() => changePage(1)} />
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
        />
        {totalPage <= 5 &&
          Array.from(Array(totalPage), (e, i) => (
            <Pagination.Item
              onClick={() => changePage(i + 1)}
              key={i}
              active={i + 1 === page}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        {totalPage > 5 && (
          <>
            {page - 3 > 0 && (
              <Pagination.Item
                active={page === 1}
                onClick={() => changePage(1)}
              >
                1
              </Pagination.Item>
            )}

            {page - 1 > 3 && <Pagination.Ellipsis />}

            {Array.from(Array(totalPage), (e, i) => (
              <React.Fragment key={i}>
                {i + 1 > page - 3 && i + 1 < page + 3 && i + 1 < totalPage && (
                  <Pagination.Item
                    active={i + 1 === page}
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )}
              </React.Fragment>
            ))}
            {totalPage - page > 3 && <Pagination.Ellipsis />}
            <Pagination.Item
              active={totalPage === page}
              onClick={() => changePage(totalPage)}
            >
              {totalPage}
            </Pagination.Item>
          </>
        )}

        <Pagination.Next
          disabled={page === totalPage}
          onClick={() => changePage(page + 1)}
        />
        <Pagination.Last
          disabled={page === totalPage}
          onClick={() => changePage(totalPage)}
        />
      </Pagination>
      <div className="option-pagination">
        <select
          onChange={event => changePageSize(event.target.value)}
          defaultValue={pageSize}
          className="form-control"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>
          Hiển thị {page > 1 ? page * pageSize - (pageSize - 1) : 1} -{' '}
          {page * pageSize > total ? total : page * pageSize} trên {total}
        </span>
      </div>
    </div>
  );
};

export default PaginationAdmin;
