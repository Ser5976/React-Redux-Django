import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MyCard = ({ price, photo, handleDelete, item, editItem, ad }) => {
  console.log(ad);
  return (
    <Card style={{ width: '18rem', margin: '.75rem' }}>
      <Card.Img variant="top" src={photo} />
      <Card.Body>
        <Card.Text>Цена:{price}</Card.Text>
        {ad ? (
          <div>
            <Button variant="primary" onClick={() => editItem(item)}>
              Edit
            </Button>
            <span> </span>
            <Button variant="danger" onClick={() => handleDelete(item)}>
              Delete
            </Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default MyCard;
