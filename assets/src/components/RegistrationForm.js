import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const RegistrationForm = ({
  validated,
  activeUsers,
  handleChange,
  handleSubmit,
}) => {
  // console.log(activeUsers);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        {[
          { label: 'Покупатель', value: 1 },
          { label: 'Продавец', value: 2 },
        ].map((radio, index) => {
          return (
            <Col key={`${index}`}>
              <Form.Check
                required
                type="radio"
                label={radio.label}
                name="role"
                value={radio.value}
                onChange={handleChange}
              />
            </Col>
          );
        })}
      </Form.Group>
      <hr />
      <Form.Group controlId="FormGroupUsername">
        <Form.Label>Имя пользователя</Form.Label>

        <Form.Control
          placeholder="Имя пользователя"
          type="text"
          aria-describedby="inputGroupPrepend"
          required
          name="username"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Пожалуйста введите имя пользователя
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Электронная почта </Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Введите адрес электронной почты"
          name="email"
          onChange={handleChange}
        />

        <Form.Control.Feedback type="invalid">
          Некорректно набран email
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupPassword1">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Пароль"
          minLength="8"
          required
          name="password1"
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Ваш пароль должен содержать не менее 8 символов
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          В пароле недостаточно символов
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupPassword2">
        <Form.Label>Повторите пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Повторите пароль"
          required
          name="password2"
          pattern={activeUsers.password1}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Неверный пароль
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};
export default RegistrationForm;
