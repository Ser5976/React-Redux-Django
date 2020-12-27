import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import { BaseContext } from '../state/baseState/BaseContext';

const ProfileCard = ({ match }) => {
  const { itemCard, refreshCard } = useContext(BaseContext);
  const urlId = match.params.name;
  useEffect(() => {
    refreshCard(urlId);
    // eslint-disable-next-line
  }, []);

  // console.log(match);
  console.log(itemCard);
  const {
    description,
    photo,
    price,
    country,
    city,
    street,
    house_number,
  } = itemCard;

  //const { country, city, street, house_number } = address;
  // console.log(country);

  // console.log(typeof urlId);

  /* let card = {};
  for (let i = 0; i < itemList.length; i++) {
    //console.log( itemList[i]);
    // console.log(typeof itemList[i].id);
    if (itemList[i].id === +urlId) {
      for (let key in itemList[i]) {
        card[key] = itemList[i][key];
      }
    }
  } */
  //console.log(card);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Card>
        <NavLink to="/ListCard" className="nav-link">
          <Card.Img variant="left" src={photo} alt="фото" />
        </NavLink>
        <Card.Body>
          <p>
            {country}
            г.{city} ул.
            {street} д.
            {house_number}
          </p>
          <div>{description}</div>
          <h3>Цена:{price}</h3>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileCard;
