import React, { useEffect, useContext } from 'react';
import { Container, CardColumns, Button, Nav } from 'react-bootstrap';
import MyCard from '../components/MyCard';
import { BaseContext } from '../state/baseState/BaseContext';

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
      <Nav.Link href="/addData">
        <Button variant="primary" className=" mr-2">
          Добавить объявление
        </Button>
      </Nav.Link>
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
