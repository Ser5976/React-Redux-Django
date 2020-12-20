import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { imgUrl } from '../constants/imgUrl';

const MyCard = ({ title, description, handleDelete, item, editItem }) => {
  return (
    <Card style={{ width: '18rem', margin: '.75rem' }}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={() => editItem(item)}>
          Edit
        </Button>
        <span> </span>
        <Button variant="danger" onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
