import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import styles from '../../css/profileHouse.module.css';

const ProfileHouse = ({ selectedHouse, setImg }) => {
  const {
    description,
    address,
    photo,
    price,
    owner_username,
    currency_symbol,
  } = selectedHouse;
  const history = useHistory();
  const ad = { ...address };
  const { country, city, street, house_number, zip_code } = ad;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Img
          id="img"
          variant="left"
          src={photo}
          alt="фото"
          className={styles.img}
          onClick={() => history.goBack()}
        />
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
          <h3>
            Цена: {price} {currency_symbol}
          </h3>

          <Button
            variant="primary"
            onClick={() => {
              history.push('/addDataContainer');
              setImg(true);
            }}
          >
            Edit
          </Button>

          <span> </span>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileHouse;
