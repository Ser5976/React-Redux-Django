import { React } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MyCard = ({ price, photo, item, ownerUsername, rememberLastEvent }) => {
  return (
    <Card style={{ width: '21rem', margin: '.75rem' }}>
      <NavLink to={'/profile/' + item.id} className="nav-link">
        <Card.Img
          variant="top"
          src={photo}
          alt="фото"
          style={{ width: '300px', height: '197px' }}
          onClick={rememberLastEvent} // запомнить путь к последнему клику
        />
      </NavLink>
      <Card.Body>
        Владелец: {ownerUsername}
        <Card.Text>
          Цена: {price} {item.currency_symbol}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
