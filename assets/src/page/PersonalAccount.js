import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PersonalAccount = () => {
  const inputEl = useRef(null);
  return (
    <Container className="p-3">
      <Row className="justify-content-md-center">
        <Col md="4">
          <Row>
            <Col md="4">
              <img src="#" alt="аватар" />
            </Col>
            <Col md="8">Логин</Col>
          </Row>
          <h5>Имя</h5>
          <h5>Фамилия</h5>
          <h6>электронный ящик</h6>
        </Col>
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

              <Form.Control
                placeholder="Фамилия"
                type="text"
                name="last_name"
              />
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
      </Row>
    </Container>
  );
};
export default PersonalAccount;
