import { React, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { RegistrationContext } from '../state/registrationState/RegistrationContext';


const MyCard = ({ price, photo, item }) => {
  const {rememberLastEvent} = useContext(RegistrationContext);
  return (
    <Card style={{ width: '18rem', margin: '.75rem' }}>
      <NavLink to={'/profile/' + item.id} className="nav-link" onClick={rememberLastEvent}>
        <Card.Img
          variant="top"
          src={photo}
          alt="фото"
          style={{ width: '254px', height: '170px' }}
        />
      </NavLink>
      <Card.Body>
        <Card.Text>Цена: {price} руб.</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
