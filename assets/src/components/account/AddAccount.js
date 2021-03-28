import React from 'react';
import { Card } from 'react-bootstrap';

const AddAccount = ({ first_name, last_name, email, avatar, role }) => {
  const firstName = first_name ? first_name : 'Имя';
  const lastName = last_name ? last_name : 'Фамилия';
  const mail = email ? email : '';
  const status = role ? role : null;

  return (
    <Card>
      {avatar ? (
        <Card.Img src={avatar} alt="фото" style={{ height: '300px' }} />
      ) : null}
      <Card.Body>
        <h5>
          {firstName} {lastName}
        </h5>

        <h5>Email: {mail}</h5>
        <h5>
          Статус: {status ? (+status === 1 ? 'Покупатель' : 'Продавец') : null}
        </h5>
      </Card.Body>
    </Card>
  );
};

export default AddAccount;
