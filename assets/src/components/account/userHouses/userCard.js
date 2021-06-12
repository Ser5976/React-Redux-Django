import { React } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserCard = ({ price, photo, item }) => {
  return (
    <Card style={{ width: '21rem', margin: '.75rem' }}>
      <NavLink to={'/profile/' + item.id} className="nav-link">
        <Card.Img
          variant="top"
          src={photo}
          alt="фото"
          style={{ width: '300px', height: '197px' }}
        />
      </NavLink>
      <Card.Body>
        <Card.Text>
          Цена: {price} {item.currency_symbol}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
