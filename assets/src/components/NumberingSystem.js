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
  for (let i = 1; i <= pagesCount; i++) {
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
      {
        portionNumber > 1 && (
          <Pagination.First
            onClick={() => setPortionNumber(portionNumber - 1)}
          />
        ) //если номер порции > 1, показываем "<<"
      }
      {
        currentPage > 1 && (
          <Pagination.Prev
            onClick={() => {
              pagination(3, currentPage);
              currentPage === leftBorderPortion &&
                setPortionNumber(portionNumber - 1);
            }}
          />
        ) //если номер страницы > 1, показываем "<"
      }
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
      {
        currentPage < pagesCount && (
          <Pagination.Next
            onClick={() => {
              pagination(2, currentPage);
              currentPage === rightBorderPortion &&
                setPortionNumber(portionNumber + 1);
            }}
          />
        ) //если номер страницы меньше количества страниц,показываем ">"
      }

      {
        portionCount > portionNumber && (
          <Pagination.Last
            onClick={() => setPortionNumber(portionNumber + 1)}
          />
        ) //если  количество порций больше номера порции, показываем ">>"
      }
    </Pagination>
  );
};
export default NumberingSystem;
