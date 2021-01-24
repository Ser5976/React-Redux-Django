import React from 'react';
import { Row, Col } from 'react-bootstrap';

const AddAccount = ({
  first_name,
  last_name,
  username,
  email,
  avatar,
  role,
}) => {
  const firstName = first_name ? first_name : 'Имя';
  const lastName = last_name ? last_name : 'Фамилия';
  const mail = email ? email : '';
  const status = role ? role : null;

  return (
    <Col md="4">
      <Row>
        <Col md="4">
          {avatar ? (
            <img
              src={avatar}
              alt="аватар"
              style={{ width: '100px' }}
              className="rounded-circle"
            />
          ) : null}
        </Col>
        <Col md="8">
          <h5 className="ml-15">{username}</h5>
        </Col>
      </Row>
      <h5>{firstName}</h5>
      <h5>{lastName}</h5>
      <h5>Email:</h5>
      <h6>{mail}</h6>
      <h5>Статус:</h5>
      {status ? +status === 1 ? <h6>Покупатель</h6> : <h6>Продавец</h6> : null}
    </Col>
  );
};

export default AddAccount;
