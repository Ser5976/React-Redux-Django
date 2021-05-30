import React from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import RegistrationError from './RegistrationError';

const RegistrationContainer = ({
  setModalRegistration, //открытие или закрытие ,модального окна регистрации
  registrationAction,
  registrationMistake,
  registrationError,
  openCloseModal, //открыть закрыть модальное окно регистрации(результат)
}) => {
  const history = useHistory();
  // получение данных регистрации и передача их registrationAction
  const onSubmit = (data) => {
    console.log('Отправлено:', data);
    console.log(registrationMistake);
    registrationAction(data, history); //отправление данных регистрации на сервер,  получение токена
  };

  return (
    <Modal show={openCloseModal} onHide={() => setModalRegistration(false)}>
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
