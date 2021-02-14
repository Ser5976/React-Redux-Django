import React, { useEffect, useContext } from 'react';
import { Container, CardColumns, Row } from 'react-bootstrap';
import MyCard from '../components/MyCard';
import NumberingSystem from '../components/NumberingSystem';
import { BaseContext } from '../state/baseState/BaseContext';
import { receiveDataStorage } from '../utilities/receiveDataStorage';
//import { ModelUrls } from '../constants/urls';

const ListCard = (e) => {
  const {
    itemList,
    refreshList,
    handleDelete,
    handleShow,
    editItem,
    count,
    pageSize,
    currentPage,
    handleCurrentPage,
    nextCurrentPage,
    previousCurrentPage,
    firstCurrentPage,
    lastCurrentPage,
  } = useContext(BaseContext);
  useEffect(() => {
    // const url = ModelUrls.ITEMS;
    receiveDataStorage('urlPage') !== null
      ? refreshList(receiveDataStorage('urlPage'))
      : refreshList();

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Container fluid style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <CardColumns style={{ columnCount: 'auto' }}>
          {itemList.map((item) => {
            return (
              <MyCard
                key={item.id}
                price={item.price}
                photo={item.photo}
                handleDelete={handleDelete}
                item={item}
                handleShow={handleShow}
                editItem={editItem}
              />
            );
          })}
        </CardColumns>
      </Container>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <hr />
        <Row className="justify-content-sm-center ">
          <NumberingSystem
            count={count}
            pageSize={pageSize}
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            nextCurrentPage={nextCurrentPage}
            previousCurrentPage={previousCurrentPage}
            firstCurrentPage={firstCurrentPage}
            lastCurrentPage={lastCurrentPage}
          />
        </Row>
      </div>
    </>
  );
};
export default ListCard;
