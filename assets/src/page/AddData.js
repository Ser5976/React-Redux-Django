import React, { useContext, useRef } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { BaseContext } from '../state/baseState/BaseContext';

const AddData = () => {
  const {
    handleChange,
    handlePhoto,
    activeItem,
    handleSubmit,
    handleChangeAddress,
    handleChangePhoto,
  } = useContext(BaseContext);
  const inputEl = useRef(null);
  const { description, photo, price, address } = activeItem;
  const { country, city, street, houseNumber, zipCode } = address;
  return (
    <Container className="p-5">
      <h2 className="text-center">Ввод данных</h2>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formGroupDescription">
          <Form.Label column sm="2">
            <h5>Описание:</h5>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              as="textarea"
              rows={7}
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} controlId="formGroupPhoto">
          <Form.Label column sm="2">
            <h5>Фото:</h5>
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="file"
              name="photo"
              ref={inputEl}
              onChange={() => handleChangePhoto(inputEl.current.files[0])}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} controlId="formGroupPrice">
          <Form.Label column sm="2">
            <h5>Цена:</h5>
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <hr />
        <Row>
          <Col>
            <Form.Group as={Row} controlId="formGroupRadio">
              <Form.Label column sm="4">
                <h5>Статус:</h5>
              </Form.Label>
              <Col sm="8" key="inline - radio">
                <Form.Check
                  inline
                  type="radio"
                  label="Продаётся"
                  name="status"
                  value={1}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="В продаже"
                  name="status"
                  value={2}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Продан"
                  name="status"
                  value={3}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row} controlId="formGroupRadio">
              <Form.Label column sm="4">
                <h5>Тип:</h5>
              </Form.Label>
              <Col sm="8" key="inline - radio">
                <Form.Check
                  inline
                  type="radio"
                  label="Коттедж"
                  name="type"
                  value={1}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Многоэтажный дом"
                  name="type"
                  value={2}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <h5>Адрес:</h5>
        <Row>
          <Col>
            <Form.Group controlId="formGroupCountry">
              <Form.Label>Страна</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={country}
                onChange={handleChangeAddress}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupCity">
              <Form.Label>Город</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={city}
                onChange={handleChangeAddress}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupStreet">
              <Form.Label>Улица</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={street}
                onChange={handleChangeAddress}
              />
            </Form.Group>
          </Col>
          <Col sm="2">
            <Form.Group controlId="formGroupHouseNumber">
              <Form.Label>Номер дома</Form.Label>
              <Form.Control
                type="text"
                name="house_number"
                value={houseNumber}
                onChange={handleChangeAddress}
              />
            </Form.Group>
          </Col>
          <Col sm="2">
            <Form.Group controlId="formGroupZipCode">
              <Form.Label>Индекс</Form.Label>
              <Form.Control
                type="number"
                name="zipCode"
                value={zipCode}
                onChange={handleChangeAddress}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <Button className="float-right" variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};
export default AddData;
