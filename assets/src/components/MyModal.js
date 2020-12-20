import React, { useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BaseContext } from '../state/baseState/BaseContext';

const MyModal = () => {
  const {
    handleChange,
    activeItem,
    handleSubmit,
    show,
    handleClose,
  } = useContext(BaseContext);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ввод данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicText">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={activeItem.title}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicTextarea">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={handleChange}
              value={activeItem.description}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default MyModal;
