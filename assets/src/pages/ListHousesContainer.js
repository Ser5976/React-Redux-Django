import React, { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import ProfileListCard from '../components/listhouses/ProfileListCard';
import { loadingListHouses } from '../action/listHouseAction';
import { ModelUrls } from '../constants/urls';
import PaginationComponent from '../components/listhouses/PaginationComponent';
import { connect } from 'react-redux';

const ListHousesContainer = ({
  listHouses,
  loadingListHouses,
  isFetching,
  pageSize,
  count,
  match,
}) => {
  const urlPageNumer = match.params.name; //для пагинации через router

  //useEffect запускается при каждом изменении urlPageNumer
  useEffect(() => {
    paginationUrl(urlPageNumer, pageSize);
    // eslint-disable-next-line
  }, [urlPageNumer]);

  //Пагинация
  // постраничный запрос на сервер(через router (match.params.name), вычисляем offset и делаем запрос)
  // offset(смещение на лимит), нужен для вычисления страницы. (1 стр.offset =0, 2стр - offset=лимит,  3 стр- offset=2 лимита и т.д )
  // лимит -кол. домов на странице. offset=(номер страниц-1)*лимит
  const paginationUrl = (urlPageNumber, pageSize) => {
    const offset = (urlPageNumber - 1) * pageSize;
    const urlPage = `${ModelUrls.ITEMS}?offset=${offset}&limit=${pageSize}`;
    loadingListHouses(urlPage);
  };

  return (
    <>
      {isFetching ? (
        <Row
          className=" d-flex justify-content-center align-items-center "
          style={{ height: window.innerHeight - 65.6 }}
        >
          <Spinner animation="border" variant="dark" />
        </Row>
      ) : (
        <>
          <ProfileListCard listHouses={listHouses} />

          <PaginationComponent
            count={count}
            pageSize={pageSize}
            urlPageNumber={urlPageNumer}
          />
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listHouses: state.listHouses.listHouses,
    isFetching: state.listHouses.isFetching,
    isFetchError: state.listHouses.isFetchError,
    pageSize: state.listHouses.pageSize,
    count: state.listHouses.count,
  };
};

export default connect(mapStateToProps, {
  loadingListHouses,
})(ListHousesContainer);
