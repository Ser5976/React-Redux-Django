import React from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import MyCard from './MyCard';

const ProfileListCard = ({ listHouses }) => {
  return (
    <Container fluid style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <CardColumns style={{ columnCount: 'auto' }}>
        {listHouses.map((item) => {
          return (
            <MyCard
              key={item.id}
              price={item.price}
              photo={item.photo}
              item={item}
            />
          );
        })}
      </CardColumns>
    </Container>
  );
};
export default ProfileListCard;
