import React from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import MyCard from './MyCard';

const ProfileListCard = ({
  itemList,
  handleDelete,
  handleShow,
  editItem,
  rememberLastEvent,
}) => {
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
              rememberLastEvent={rememberLastEvent}
            />
          );
        })}
      </CardColumns>
    </Container>
  );
};
export default ProfileListCard;
