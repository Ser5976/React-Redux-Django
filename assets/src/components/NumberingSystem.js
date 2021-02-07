import React from 'react';
import { Pagination } from 'react-bootstrap';

const NumberingSystem = ({
  count,
  pageSize,
  currentPage,
  handleCurrentPage,
}) => {
  const active = currentPage;
  const pagesCount = Math.ceil(count / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
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

      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};
export default NumberingSystem;
