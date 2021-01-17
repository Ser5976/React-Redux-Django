import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const AccountForm = ({ first_name, last_name, username, email, inputEl }) => {
  return (
    <Col md="6">
      <h4 className="text-center">Общий профиль</h4>
      <hr />
      <Form>
        <Form.Group controlId="FormGroupFirstName">
          <Form.Label>Имя </Form.Label>

          <Form.Control placeholder="Имя " type="text" name="first_name" />
        </Form.Group>
        <Form.Group controlId="FormGroupLastName">
          <Form.Label>Фамилия</Form.Label>

          <Form.Control placeholder="Фамилия" type="text" name="last_name" />
        </Form.Group>
        <Form.Group controlId="FormGroupUsername">
          <Form.Label>Имя пользователя</Form.Label>

          <Form.Control
            placeholder="Имя пользователя"
            type="text"
            name="username"
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Электронная почта </Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите адрес электронной почты"
            name="email"
          />
        </Form.Group>

        <Form.Group controlId="formGroupAvatar">
          <Form.Label>Аватар </Form.Label>
          <Form.Control type="file" name="avatar" ref={inputEl} />
        </Form.Group>

        <Button className="float-right" type="submit">
          Редактировать профиль
        </Button>
      </Form>
    </Col>
  );
};

export default AccountForm;
