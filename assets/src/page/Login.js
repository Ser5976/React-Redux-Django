import '../css/logincard.css';

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';

const Login = () => {
  const history = useHistory();
  const {
    handleChangeLogin,
    handleSubmitLogin,
    error,
    registrationShow,
  } = useContext(RegistrationContext);

  return (
    <Container className="p-5">
      <Card
        style={{ width: '50rem', margin: ' 100px auto' }}
        className="rounded"
      >
        <Card.Title className="text-center bg-dark text-white">
          <h3>Авторизация</h3>
        </Card.Title>
        {error ? (
          <h7 className="text-center text-danger">Пароль или логин неверный</h7>
        ) : null}
        <Card.Body>
          <Form onSubmit={(event) => handleSubmitLogin(event, history)}>
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

            <Form.Group controlId="Checkbox">
              <Form.Check type="checkbox" label="Запомнить пароль" />
            </Form.Group>

            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Войти
                </Button>
              </Col>
              <Col>
                <div>
                  Ещё нет учётной записи?
                  <a href="#" onClick={() => registrationShow(history)}>
                    <small>Зарегистрироваться</small>
                  </a>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Login;
