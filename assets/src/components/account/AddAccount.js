import React from 'react';
import { Row, Col } from 'react-bootstrap';

const AddAccount = ({ first_name, last_name, username, email, inputEl }) => {
  return (
    <Col md="4">
      <Row>
        <Col md="4">
          <img src="#" alt="аватар" />
        </Col>
        <Col md="8">{username}</Col>
      </Row>
      <h5>Имя</h5>
      <h5>Фамилия</h5>
      <h6>{email}</h6>
    </Col>
  );
};

export default AddAccount;
