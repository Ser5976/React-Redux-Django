import React, { useEffect, useContext } from 'react';
import { Container, CardColumns, Button } from 'react-bootstrap';
import MyCard from '../components/MyCard';
import { BaseContext } from '../state/baseState/BaseContext';

const ListCard = () => {
  const {
    itemList,
    refreshList,
    handleDelete,
    handleShow,
    editItem,
    editAd,
    ad,
  } = useContext(BaseContext);
  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Button variant="primary" className=" mr-2" onClick={editAd}>
        Редактировать объявление
      </Button>
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
              ad={ad}
            />
          );
        })}
      </CardColumns>
    </Container>
  );
};
export default ListCard;
