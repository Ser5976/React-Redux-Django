import React, { useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { BaseContext } from '../state/baseState/BaseContext';
import { receiveDataStorage } from '../utilities/receiveDataStorage';
import FormData from '../components/FormData';

const AddData = () => {
  const history = useHistory();
  const {
    handleChange,
    activeItem,
    handleSubmit,
    handleChangeAddress,
    handleChangePhoto,
    validated,
    bug,
    image,
    addUserId,
  } = useContext(BaseContext);
  useEffect(() => {
    addUserId(receiveDataStorage('userId'));

    // eslint-disable-next-line
  }, [activeItem.photo]);
  const inputEl = useRef(null);
  const { description, price, address, status, house_type, photo } = activeItem;
  const { country, city, street, house_number, zip_code } = address;

  const splitPhoto = () => {
    const photo1 = photo.split('/');
    const photo2 = photo1[photo1.length - 1];
    return photo2;
  };

  return (
    <FormData
      history={history}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleChangeAddress={handleChangeAddress}
      handleChangePhoto={handleChangePhoto}
      validated={validated}
      bug={bug}
      image={image}
      description={description}
      price={price}
      status={status}
      house_type={house_type}
      photo={photo}
      country={country}
      city={city}
      street={street}
      house_number={house_number}
      zip_code={zip_code}
      inputEl={inputEl}
      splitPhoto={splitPhoto}
    />
  );
};
export default AddData;
