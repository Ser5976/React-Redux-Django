import React, { useEffect, useContext } from 'react';
import { Container, CardColumns, Row } from 'react-bootstrap';
import MyCard from '../components/MyCard';
import NumberingSystem from '../components/NumberingSystem';
import { BaseContext } from '../state/baseState/BaseContext';

const ListCard = (e) => {
  const {
    itemList,
    refreshList,
    handleDelete,
    handleShow,
    editItem,
  } = useContext(BaseContext);
  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);
  return (
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
      <Row className="justify-content-sm-center">
        <NumberingSystem />
      </Row>
    </Container>
  );
};
export default ListCard;
