import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import { BaseContext } from '../state/baseState/BaseContext';
import { receiveDataStorage } from '../utilities/receiveDataStorage';

const ProfileCard = ({ match }) => {
  const { itemCard, refreshCard, editItem, handleDelete } = useContext(
    BaseContext
  );
  const urlId = match.params.name;
  const history = useHistory();
  useEffect(() => {
    refreshCard(urlId);
    // eslint-disable-next-line
  }, []);

  const { description, address, photo, price, owner } = itemCard;
  const ad = { ...address };
  const { country, city, street, house_number, zip_code } = ad;

  return (
    <Container style={{ marginTop: '50px' }}>
      <Card>
        <NavLink to="/ListCard" className="nav-link">
          <Card.Img
            variant="left"
            src={photo}
            alt="фото"
            style={{ width: '254px', height: '170px' }}
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
