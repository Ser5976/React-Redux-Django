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
              title={item.title}
              description={item.description}
              handleDelete={handleDelete}
              item={item}
              handleShow={handleShow}
              editItem={editItem}
            />
          );
        })}
      </CardColumns>
      <Button variant="primary" className=" mr-2" onClick={handleShow}>
        Add
      </Button>
    </Container>
  );
};
export default ListCard;
