import React from 'react';
import { Modal, Card, Col, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as yup from 'yup';

//схема валидации
/* export const schema = yup.object().shape({
    description: yup.string().required('Обязательно поле для заполнения*'),
    price: yup.string().required('Обязательно поле для заполнения*'),
    currency: yup.string().required(),
    status: yup.string().nullable().required(),
    house_type: yup.string().nullable().required(),
    city: yup.string().required('Обязательно поле для заполнения*'),
    country: yup.string().required('Обязательно поле для заполнения*'),
    street: yup.string().required('Обязательно поле для заполнения*'),
    house_number: yup.string().required('Обязательно поле для заполнения*'),
  });
 */
const ModalAddCardWallet = ({ show, setShow, onSubmit }) => {
  const select = [
    { label: 'USD', value: { name: 'доллар', symbol: 'USD' } },
    { label: 'EUR', value: { name: 'евро', symbol: 'EUR' } },
    { label: 'RUB', value: { name: 'рубль', symbol: 'RUB' } },
  ];

  // хук useForm собирает данные из формы и при помощи handleSubmit передаёт данные в onSumit
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить карту
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Row>
                  <Form.Label column="sm" lg={4}>
                    balance
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      size="sm"
                      type="number"
                      {...register('balance')}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row>
                  <Form.Label column="sm" lg={4}>
                    public key
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      size="sm"
                      type="text"
                      {...register('public_key')}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row className="justify-content-between">
                  <Form.Label column="sm" lg={4}>
                    currency
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control
                      as="select"
                      size="sm"
                      {...register('currency')}
                    >
                      <option></option>
                      {select.map((valuta, index) => {
                        return (
                          <option
                            value={JSON.stringify(valuta.value)}
                            key={index}
                          >
                            {valuta.label}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>

              <Button variant="secondary" type="submit">
                Добавить
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
export default ModalAddCardWallet;
