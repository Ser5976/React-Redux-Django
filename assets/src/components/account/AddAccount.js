import React from 'react';
import { Row, Col } from 'react-bootstrap';

const AddAccount = ({ first_name, last_name, username, email }) => {
  const firstName = first_name ? first_name : 'Имя';
  const lastName = last_name ? last_name : 'Фамилия';
  const mail = email ? email : '';

  return (
    <Col md="4">
      <Row>
        <Col md="4">
          {/* <img src="#" alt="аватар" /> */}
        </Col>
        <Col md="8">
          <h5>{username}</h5>
        </Col>
      </Row>
      <h5>{firstName}</h5>
      <h5>{lastName}</h5>
      <h5>Email:</h5>
      <h6>{mail}</h6>
    </Col>
  );
};

export default AddAccount;
