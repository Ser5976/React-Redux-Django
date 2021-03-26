import { React } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MyCard = ({ price, photo, item, rememberLastEvent }) => {
  return (
    <Card style={{ width: '18rem', margin: '.75rem' }}>
      <NavLink
        to={'/profile/' + item.id}
        className="nav-link"
        onClick={rememberLastEvent}
      >
        <Card.Img
          variant="top"
          src={photo}
          alt="фото"
          style={{ width: '254px', height: '170px' }}
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

export default MyCard;
