import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

const PaginationComponent = ({
  count,
  pageSize,
  portionSize = 5,
  urlPageNumber,
}) => {
  //urlPageNumber выбранная страница по ссылке
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
    <Row className="justify-content-sm-center ">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={
              +urlPageNumber === 1 ? `page-item disabled` : `page-item`
            }
          >
            <Link
              to="/ListHousesContainer/1"
              className="page-link"
              onClick={() => {
                setPortionNumber(1);
              }}
            >
              <span aria-hidden={true}>&#x003C;&#x003C;</span>
              <span className="sr-only">First</span>
            </Link>
          </li>

          <li
            className={
              +urlPageNumber === 1 ? `page-item disabled` : `page-item`
            }
          >
            <Link
              to={`/ListHousesContainer/${urlPageNumber - 1}`}
              className="page-link"
              onClick={() => {
                +urlPageNumber === leftBorderPortion &&
                  setPortionNumber(portionNumber - 1);
              }}
            >
              <span aria-hidden={true}>&#x003C;</span>
              <span className="sr-only">Previous</span>
            </Link>
          </li>
          <li
            className={+urlPageNumber === 1 ? `page-item active` : `page-item`}
          >
            <Link to="/ListHousesContainer/1" className="page-link">
              1
            </Link>
          </li>
          {
            portionNumber > 1 && (
              <li className="page-item">
                <Link
                  to="#"
                  role="button"
                  className="page-link"
                  onClick={() => setPortionNumber(portionNumber - 1)}
                >
                  <span aria-hidden={true}>...</span>
                  <span className="sr-only">More</span>
                </Link>
              </li>
            ) //добавляем кнопку многоточие
          }

          {
            pages
              .filter(
                (page) =>
                  page >= leftBorderPortion && page <= rightBorderPortion
              )
              .map((page, index) => {
                return (
                  <li
                    key={index}
                    className={
                      +urlPageNumber === page ? `page-item active` : `page-item`
                    }
                  >
                    <Link
                      to={`/ListHousesContainer/${page}`}
                      className="page-link"
                    >
                      {page}
                    </Link>
                  </li>
                );
              }) // это фильтрация
          }
          {
            portionCount > portionNumber && (
              <li className="page-item">
                <Link
                  to="#"
                  role="button"
                  className="page-link"
                  onClick={() => setPortionNumber(portionNumber + 1)}
                >
                  <span aria-hidden={true}>...</span>
                  <span className="sr-only">More</span>
                </Link>
              </li>
            ) //добавляем кнопку многоточие
          }
          <li
            className={
              +urlPageNumber === pagesCount ? `page-item active` : `page-item`
            }
          >
            <Link
              to={`/ListHousesContainer/${pagesCount}`}
              className="page-link"
              onClick={() => {
                setPortionNumber(portionCount);
              }}
            >
              {pagesCount}
            </Link>
          </li>
          <li
            className={
              +urlPageNumber === pagesCount ? `page-item disabled` : `page-item`
            }
          >
            <Link
              to={`/ListHousesContainer/${+urlPageNumber + 1}`}
              className="page-link"
              onClick={() => {
                +urlPageNumber === rightBorderPortion &&
                  setPortionNumber(portionNumber + 1);
              }}
            >
              <span aria-hidden={true}>&#x003E;</span>
              <span className="sr-only">Previous</span>
            </Link>
          </li>
          <li
            className={
              +urlPageNumber === pagesCount ? `page-item disabled` : `page-item`
            }
          >
            <Link
              to={`/ListHousesContainer/${pagesCount}`}
              className="page-link"
              onClick={() => {
                setPortionNumber(portionCount);
              }}
            >
              <span aria-hidden={true}>&#x003E;&#x003E;</span>
              <span className="sr-only">Last</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Row>
  );
};
export default PaginationComponent;
