import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../constants/validationSchemaRegistration'; // схема валидации

const RegistrationForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row}>
        {[
          { label: 'Покупатель', value: 1 },
          { label: 'Продавец', value: 2 },
        ].map((radio, index) => {
          return (
            <Col key={`${index}`}>
              <Form.Check
                type="radio"
                label={radio.label}
                {...register('role')}
                value={radio.value}
                className={errors.role && 'text-danger'}
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
          {...register('username')}
          className={errors.username && 'form-control is-invalid'}
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </Form.Group>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Электронная почта </Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите адрес электронной почты"
          name="email"
          {...register('email')}
          className={errors.email && 'form-control is-invalid'}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </Form.Group>

      <Form.Group controlId="formGroupPassword1">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Пароль"
          {...register('password1')}
          className={errors.password1 && 'form-control is-invalid'}
        />
        <Form.Text className="text-muted">
          Ваш пароль должен содержать не менее 8 символов
        </Form.Text>
        <div className="invalid-feedback">{errors.password1?.message}</div>
      </Form.Group>
      <Form.Group controlId="formGroupPassword2">
        <Form.Label>Повторите пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Повторите пароль"
          name="password2"
          {...register('password2')}
          className={errors.password2 && 'form-control is-invalid'}
        />
        <div className="invalid-feedback">{errors.password2?.message}</div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};
export default RegistrationForm;
