import React, { useEffect, useContext } from 'react';
import { Container, CardColumns, Button } from 'react-bootstrap';
import MyCard from '../components/MyCard';
import { BaseContext } from '../state/baseState/BaseContext';
import { Link } from 'react-router-dom';

const ListCard = () => {
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
      <Link to="/addData">
        <Button variant="primary" className=" mr-2">
          Добавить объявление
        </Button>
      </Link>
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
  );
};
export default ListCard;
