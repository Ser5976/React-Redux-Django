import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const NumberingSystem = ({
  count,
  pageSize,
  currentPage,
  pagination,
  portionSize = 5,
}) => {
  // console.log(currentPage);
  const active = currentPage; // currentPage выбранная страница
  const pagesCount = Math.ceil(count / pageSize); //количество страниц(count-общее количество домов,pageSize-сколько домов будет на странице)
  //получение массива страниц
  const pages = [];
  for (let i = 2; i <= pagesCount - 1; i++) {
    pages.push(i);
  }

  //Количество страниц в пагинаторе будем показывать порциями

  const portionCount = Math.ceil(pagesCount / portionSize); // число порций(pageCount-число страниц portionCize-размер порции(этот параметр сами добавили в пропсы с дефолтным значением))
  const [portionNumber, setPortionNumber] = useState(1); //portionNumber - номер порции
  // Вычисление тех страниц,которые будут входить в отображаемую порцию
  const leftBorderPortion = (portionNumber - 1) * portionSize + 1; //вычисление левой границы порции
  const rightBorderPortion = portionNumber * portionSize; //вычисление правой границы порции

  //С помощью фильтрации будем выбирать те страницы,которые входят в порцию
  return (
    <Pagination>
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => {
          pagination(1, 1);
          setPortionNumber(1);
        }}
      />

      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => {
          pagination(3, currentPage);
          currentPage === leftBorderPortion &&
            setPortionNumber(portionNumber - 1);
        }}
      />

      <Pagination.Item
        active={1 === active}
        onClick={() => {
          pagination(1, 1);
          setPortionNumber(1);
        }}
      >
        {1}
      </Pagination.Item>
      {portionNumber > 1 && (
        <Pagination.Ellipsis
          onClick={() => setPortionNumber(portionNumber - 1)}
        />
      )}

      {
        pages
          .filter(
            (page) => page >= leftBorderPortion && page <= rightBorderPortion
          )
          .map((page, index) => {
            return (
              <Pagination.Item
                key={index}
                active={page === active}
                onClick={() => pagination(1, page)}
              >
                {page}
              </Pagination.Item>
            );
          }) // это фильтрация
      }
      {portionCount > portionNumber && (
        <Pagination.Ellipsis
          onClick={() => setPortionNumber(portionNumber + 1)}
        />
      )}

      <Pagination.Item
        active={pagesCount === active}
        onClick={() => {
          pagination(1, pagesCount);
          setPortionNumber(portionCount);
        }}
      >
        {pagesCount}
      </Pagination.Item>

      <Pagination.Next
        disabled={currentPage === pagesCount}
        onClick={() => {
          pagination(2, currentPage);
          currentPage === rightBorderPortion &&
            setPortionNumber(portionNumber + 1);
        }}
      />

      <Pagination.Last
        disabled={currentPage === pagesCount}
        onClick={() => {
          pagination(1, pagesCount);
          setPortionNumber(portionCount);
        }}
      />
    </Pagination>
  );
};
export default NumberingSystem;
