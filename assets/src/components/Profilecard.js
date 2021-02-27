import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import { receiveDataStorage } from '../utilities/receiveDataStorage';

const ProfileCard = ({ itemCard, editItem, handleDelete, history }) => {
  const {
    description,
    address,
    photo,
    price,
    owner,
    owner_username,
  } = itemCard;
  const ad = { ...address };
  const { country, city, street, house_number, zip_code } = ad;
  //  style={{ width: '254px', height: '170px' }}
  return (
    <Container className="mt-5">
      <Card>
        <NavLink to="/ListCard" className="nav-link">
          <Card.Img
            variant="left"
            src={photo}
            alt="фото"
            className="w-25 h-auto"
          />
        </NavLink>
        <Card.Body>
          <b>Адрес</b>
          <p>
            {country}
            <span> </span>
            г.{city}
            <span> </span> ул.
            {street}
            <span> </span> д.
            {house_number}
            <span> </span>
            индекс: {zip_code}
          </p>
          <b>Описание</b>
          <div>{description}</div>
          <b>Владелец</b>
          <div>{owner_username}</div>
          <h3>Цена: {price} руб.</h3>
          {owner === +receiveDataStorage('userId') ? (
            <>
              <NavLink to="/addData" className="btn-primary" role="button">
                <Button variant="primary" onClick={() => editItem(itemCard)}>
                  Edit
                </Button>
              </NavLink>
              <span> </span>
              <Button
                variant="danger"
                onClick={() => handleDelete(itemCard, history)}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button variant="danger">Купить</Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileCard;
