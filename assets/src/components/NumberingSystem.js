import React from 'react';
import { Pagination } from 'react-bootstrap';

const NumberingSystem = ({ count, pageSize, currentPage, pagination }) => {
  // console.log(currentPage);
  const active = currentPage;
  const pagesCount = Math.ceil(count / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => pagination(4, currentPage)} />
      <Pagination.Prev onClick={() => pagination(3, currentPage)} />
      {pages.map((page, index) => {
        return (
          <Pagination.Item
            key={index}
            active={page === active}
            onClick={() => pagination(1, page)}
          >
            {page}
          </Pagination.Item>
        );
      })}

      <Pagination.Next onClick={() => pagination(2, currentPage, pages)} />
      <Pagination.Last onClick={() => pagination(5, currentPage, pages)} />
    </Pagination>
  );
};
export default NumberingSystem;
