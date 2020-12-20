import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';
import RegistrationForm from './RegistrationForm';

const FormModal = () => {
  const {
    input,
    validated,
    handleChangeInput,
    handleSubmitForm,
    show,
    handleClose,
  } = useContext(RegistrationContext);
  //console.log(input);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Форма регистрации</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistrationForm
          handleChange={handleChangeInput}
          handleSubmit={handleSubmitForm}
          validated={validated}
          input={input}
        />
      </Modal.Body>
    </Modal>
  );
};
export default FormModal;
