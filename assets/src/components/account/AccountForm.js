import React from 'react';
import { Col, Form, Button, Card } from 'react-bootstrap';

const AccountForm = ({
  formUser, // данные пользователя( которые в форме)
  handleSubmit, // отправка formUser на сервак
  handleChangeAccount, // получение значений из формы и запись их в стор в formUser(для контроля за формой, а так же подготовка объекта для отправки на сервак)
  disabled, //блокировка кнопки
  setDisabled, // изменение блокирования кнопки в AccountForm(сохранить настройки)
}) => {
  //console.log(formUser);
  const { first_name, last_name, email, role, username } = formUser;

  return (
    <Card>
      <Card.Header as="h5">Изменить информацию об учетной записи</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" lg={4}>
                Имя
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  size="sm"
                  type="text"
                  name="first_name"
                  value={first_name ? first_name : ''} //реакт ругается на null
                  onChange={handleChangeAccount}
                  onFocus={() => setDisabled(false)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" lg={4}>
                Фамилия
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  size="sm"
                  type="text"
                  name="last_name"
                  value={last_name ? last_name : ''} //реакт ругается на null
                  onChange={handleChangeAccount}
                  onFocus={() => setDisabled(false)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" lg={4}>
                Логин
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  size="sm"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChangeAccount}
                  onFocus={() => setDisabled(false)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" lg={4}>
                Адрес элетронной почты
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  size="sm"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChangeAccount}
                  onFocus={() => setDisabled(false)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column="sm" lg={4}>
                Статус
              </Form.Label>
              <Col sm={8}>
                <div className="row">
                  {[
                    { label: 'Покупатель', value: 1 },
                    { label: 'Продавец', value: 2 },
                  ].map((radio, index) => {
                    return (
                      <Col key={`${index}`}>
                        <Form.Check
                          type="radio"
                          label={radio.label}
                          checked={+role === radio.value}
                          name="role"
                          value={radio.value}
                          onChange={handleChangeAccount}
                          onFocus={() => setDisabled(false)}
                        />
                      </Col>
                    );
                  })}
                </div>
              </Col>
            </Form.Row>
          </Form.Group>

          <Button variant="secondary" type="submit" disabled={disabled}>
            Сохранить настройки
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default AccountForm;
