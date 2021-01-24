import React from 'react';
import { Col, Form, Button, Row } from 'react-bootstrap';

const AccountForm = ({
  changeUser,
  inputEl,
  handleChangeAccount,
  handleSubmitAccount,
  handleChangeAvatar,
}) => {
  //const { first_name, last_name, username, email, role } = changeUser;
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
                  checked={
                    changeUser.role ? +changeUser.role === radio.value : false
                  }
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
            value={changeUser.first_name ? changeUser.first_name : ''}
            onChange={handleChangeAccount}
          />
        </Form.Group>
        <Form.Group controlId="FormGroupLastName">
          <Form.Label>Фамилия</Form.Label>

          <Form.Control
            placeholder="Фамилия"
            type="text"
            name="last_name"
            value={changeUser.last_name ? changeUser.last_name : ''}
            onChange={handleChangeAccount}
          />
        </Form.Group>
        <Form.Group controlId="FormGroupUsername">
          <Form.Label>Имя пользователя</Form.Label>

          <Form.Control
            placeholder="Имя пользователя"
            type="text"
            name="username"
            value={changeUser.username ? changeUser.username : ''}
            onChange={handleChangeAccount}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Электронная почта </Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите адрес электронной почты"
            name="email"
            value={changeUser.email ? changeUser.email : ''}
            onChange={handleChangeAccount}
          />
        </Form.Group>

        <Form.Group controlId="formGroupAvatar">
          <Form.Label>Аватар </Form.Label>
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
