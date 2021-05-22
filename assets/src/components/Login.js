import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const Login = ({
  onSubmit,
  setModalRegistration, //для открытия модального окна регистрации
  authError,
}) => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  return (
    <Container className="p-5">
      <Card
        /* style={{ width: '50rem', margin: ' 100px auto' }} */
        className="mx-auto w-50 mt-5"
      >
        <Card.Title className="text-center bg-dark text-white">
          <h3>Авторизация</h3>
        </Card.Title>
        {authError && (
          <div className="text-center text-danger">
            Пароль или логин неверный
          </div>
        )}

        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="FormGroupUsername">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                placeholder="Имя пользователя"
                type="text"
                {...register('username')}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword1">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Пароль"
                {...register('password')}
              />
            </Form.Group>

            <Form.Group controlId="Checkbox">
              <Form.Check
                type="checkbox"
                label="Запомнить меня"
                {...register('checkbox')}
              />
            </Form.Group>

            <Row>
              <Col>
                <Button variant="secondary" type="submit">
                  Войти
                </Button>
              </Col>
              <Col>
                <div>
                  <span>Ещё нет учётной записи? </span>
                  <Link
                    to="#"
                    onClick={() => {
                      history.push();
                      setModalRegistration(true);
                    }}
                  >
                    <small>Зарегистрироваться</small>
                  </Link>
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
