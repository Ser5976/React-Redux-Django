import React from 'react';
import { Modal } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import RegistrationError from './RegistrationError';

const RegistrationContainer = ({
  show,
  handleClose,
  registrationAction,
  registrationMistake,
  registrationError,
}) => {
  // получение данных регистрации и передача их registrationAction
  const onSubmit = (data) => {
    console.log('Отправлено:', data);
    console.log(registrationMistake);
    registrationAction(data); //отправление данных регистрации на сервер,  получение токена
    if (!registrationMistake) return;
    handleClose(); //закрытие модального окна
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {registrationMistake && (
        <RegistrationError registrationError={registrationError} />
      )}

      <Modal.Header closeButton>
        <Modal.Title>Форма регистрации</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistrationForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
};
export default RegistrationContainer;
