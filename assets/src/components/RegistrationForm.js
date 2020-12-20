import React from 'react';
import { Form, Button } from 'react-bootstrap';

const RegistrationForm = ({ validated, input, handleChange, handleSubmit }) => {
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupName">
        <Form.Label>Имя </Form.Label>
        <Form.Control placeholder="Имя" name="name" onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="formGroupSurname">
        <Form.Label>Фамилия </Form.Label>
        <Form.Control
          placeholder="Фамилия"
          name="surname"
          onChange={handleChange}
        />
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
      <Form.Group controlId="formGroupPassword1">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Пароль"
          minLength="6"
          required
          name="password1"
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Ваш пароль должен содержать не менее 6 символов
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
          pattern={input.password1}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Неверный пароль
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Отправить
      </Button>
    </Form>
  );
};
export default RegistrationForm;
