import React from 'react';
import { Col, Form, Button, Row } from 'react-bootstrap';

const AccountForm = ({
  formUser,
  inputEl,
  handleChangeAccount,
  handleSubmitAccount,
  handleChangeAvatar,
}) => {
  const splitAvatar = () => {
    const photo1 = formUser.avatar.split('/');
    const photo2 = photo1[photo1.length - 1];
    return photo2;
  };
  return (
    <Col md="6">
      <h4 className="text-center">Редактировать профиль</h4>
      <hr />
      <Form onSubmit={handleSubmitAccount}>
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
                  checked={+formUser.role === radio.value}
                  name="role"
                  value={radio.value}
                  onChange={handleChangeAccount}
                />
              </Col>
            );
          })}
        </Form.Group>
        <Form.Group controlId="FormGroupFirstName">
          <Form.Label>Имя </Form.Label>

          <Form.Control
            placeholder="Имя "
            type="text"
            name="first_name"
            value={formUser.first_name}
            onChange={handleChangeAccount}
          />
        </Form.Group>
        <Form.Group controlId="FormGroupLastName">
          <Form.Label>Фамилия</Form.Label>

          <Form.Control
            placeholder="Фамилия"
            type="text"
            name="last_name"
            value={formUser.last_name}
            onChange={handleChangeAccount}
          />
        </Form.Group>
        <Form.Group controlId="FormGroupUsername">
          <Form.Label>Имя пользователя</Form.Label>

          <Form.Control
            placeholder="Имя пользователя"
            type="text"
            name="username"
            value={formUser.username}
            onChange={handleChangeAccount}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Электронная почта </Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите адрес электронной почты"
            name="email"
            value={formUser.email}
            onChange={handleChangeAccount}
          />
        </Form.Group>

        <Form.Group controlId="formGroupAvatar">
          <Form.Label>Аватар </Form.Label>
          {typeof formUser.avatar == 'string' ? (
            <div>
              {' '}
              <small>В настоящее время:{splitAvatar()}</small>
            </div>
          ) : null}
          <Form.Control
            type="file"
            name="avatar"
            ref={inputEl}
            onChange={() => handleChangeAvatar(inputEl.current.files[0])}
          />
        </Form.Group>

        <Button className="float-right" type="submit">
          Сохранить
        </Button>
      </Form>
    </Col>
  );
};

export default AccountForm;
