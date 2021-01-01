import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MyCard = ({ price, photo, handleDelete, item, editItem }) => {
  return (
    <Card style={{ width: '18rem', margin: '.75rem' }}>
      <NavLink to={'/profile/' + item.id} className="nav-link">
        <Card.Img variant="top" src={photo} alt="фото" />
      </NavLink>
      <Card.Body>
        <Card.Text>Цена:{price}</Card.Text>

        <NavLink to="/addData" className="btn-primary" role="button">
          <Button variant="primary" onClick={() => editItem(item)}>
            Edit
          </Button>
        </NavLink>
        <span> </span>
        <Button variant="danger" onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
