import React from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import UserCard from './userCard';

const ProfileUserHouses = ({ userHouses }) => {
  return (
    <Container className="mt-3">
      <CardColumns style={{ columnCount: 'auto' }}>
        {userHouses.length === 0 && <h2>У Вас нет объявлений!</h2>}
        {userHouses.map((item) => {
          return (
            <UserCard
              key={item.id}
              price={item.price}
              photo={item.photo}
              item={item}
            />
          );
        })}
      </CardColumns>
      <hr />
    </Container>
  );
};
export default ProfileUserHouses;
