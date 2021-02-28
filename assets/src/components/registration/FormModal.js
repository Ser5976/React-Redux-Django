import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { RegistrationContext } from '../../state/registrationState/RegistrationContext';
import RegistrationError from './RegistrationError';
import RegistrationForm from './RegistrationForm';

const FormModal = () => {
  const {
    activeUsers,
    validated,
    handleChangeInput,
    handleSubmitForm,
    show,
    handleClose,
    registrationError,
    registrationMistake,
  } = useContext(RegistrationContext);
  //console.log(input);
  return (
    <Modal show={show} onHide={handleClose}>
      {registrationMistake ? (
        <RegistrationError registrationError={registrationError} />
      ) : null}

      <Modal.Header closeButton>
        <Modal.Title>Форма регистрации</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistrationForm
          handleChange={handleChangeInput}
          handleSubmit={handleSubmitForm}
          validated={validated}
          activeUsers={activeUsers}
        />
      </Modal.Body>
    </Modal>
  );
};
export default FormModal;
