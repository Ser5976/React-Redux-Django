import React from 'react';
import { Pagination } from 'react-bootstrap';

const NumberingSystem = ({
  count,
  pageSize,
  currentPage,
  handleCurrentPage,
  nextCurrentPage,
  previousCurrentPage,
  firstCurrentPage,
  lastCurrentPage,
}) => {
  const active = currentPage;
  const pagesCount = Math.ceil(count / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => firstCurrentPage(currentPage)} />
      <Pagination.Prev
        onClick={() => previousCurrentPage(currentPage, pages)}
      />
      {pages.map((page, index) => {
        return (
          <Pagination.Item
            key={index}
            active={page === active}
            onClick={() => handleCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        );
      })}

      <Pagination.Next onClick={() => nextCurrentPage(currentPage, pages)} />
      <Pagination.Last onClick={() => lastCurrentPage(currentPage, pages)} />
    </Pagination>
  );
};
export default NumberingSystem;
