import React from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import MyCard from './MyCard';

const ProfileListHouses = ({ listHouses, rememberLastEvent }) => {
  return (
    <Container className="mt-3">
      <CardColumns style={{ columnCount: 'auto' }}>
        {listHouses.map((item) => {
          return (
            <MyCard
              key={item.id}
              price={item.price}
              photo={item.photo}
              ownerUsername={item.owner_username}
              item={item}
              rememberLastEvent={rememberLastEvent} //запомнить путь к последнему клику
            />
          );
        })}
      </CardColumns>
      <hr />
    </Container>
  );
};
export default ProfileListHouses;
