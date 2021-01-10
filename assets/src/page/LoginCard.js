import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Card, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';

const LoginCard = () => {
  const { handleChangeLogin, onSubmitLogin } = useContext(RegistrationContext);

  return (
    <Container className="p-5">
      <Card style={{ width: '50rem', margin: ' 100px auto' }}>
        <Card.Title className="text-center bg-dark text-white">
          <h3>Авторизация</h3>
        </Card.Title>

        <Card.Body>
          <Form onSubmit={onSubmitLogin}>
            <Form.Group controlId="FormGroupUsername">
              <Form.Label>Имя пользователя</Form.Label>

              <Form.Control
                placeholder="Имя пользователя"
                type="text"
                name="username"
                onChange={handleChangeLogin}
              />
            </Form.Group>

            <Form.Group controlId="formGroupPassword1">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Пароль"
                name="password"
                onChange={handleChangeLogin}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Войти
                </Button>
              </Col>
              <Col>
                <div>
                  Ещё нет учётной записи?<span> </span>
                  <span> </span>
                  <small>
                    <a className="nav-link" href="#">
                      Зарегистрироваться
                    </a>
                  </small>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default LoginCard;
