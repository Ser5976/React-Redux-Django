import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { schema } from '../constants/validationSchema'; // схема валидации
import { yupResolver } from '@hookform/resolvers/yup';
import { radioStatus, radioType } from '../constants/objects'; //массивы для радиокнопок

const AddDataHouse = ({
  onSubmit,
  isFetchError,
  selectedHouse,
  setImg,
  img,
}) => {
  const {
    description,
    price,
    address,
    status,
    house_type,
    photo,
    currency,
  } = selectedHouse;
  const ad = { ...address };
  const { country, city, street, house_number, zip_code } = ad;
  // вырезаем то что нужно из строки photo, для того что бы вставить в форму при редактировании дома
  const splitPhoto = () => {
    const photo1 = photo.split('/');
    const photo2 = photo1[photo1.length - 1];
    return photo2;
  };
  // хук useForm собирает данные из формы и при помощи handleSubmit передаёт данные в onSumit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: description,
      price: price,
      status: `${status}`,
      house_type: `${house_type}`,
      country: country,
      city: city,
      street: street,
      house_number: house_number,
      zip_code: zip_code,
    }, // можно установить дефолтные значения полей формы
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <Container className="p-5">
      {isFetchError && (
        <h6 className="text-center text-danger">Что-то пошло не так</h6>
      )}{' '}
      <h2 className="text-center">Ввод данных</h2>
      <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="formGroupDescription">
          <Form.Label column sm="2">
            <h5>Описание:</h5>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              as="textarea"
              rows={7}
              {...register('description')}
              className={errors.description && 'form-control is-invalid'}
            />
            <div className="invalid-feedback">
              {errors.description?.message}
            </div>
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} controlId="formGroupPhoto">
          <Form.Label column sm="2">
            <h5>Фото:</h5>
          </Form.Label>
          <Col sm="10">
            {img && typeof photo == 'string' && (
              <small>В настоящее время:{splitPhoto()}</small>
            )}
            <Form.Control
              type="file"
              {...register('photo')}
              onChange={() => setImg(false)}
            />
          </Col>
        </Form.Group>
        <hr />
        <Row>
          <Col>
            <Form.Group as={Row} controlId="formGroupPrice">
              <Form.Label column sm="2">
                <h5>Цена:</h5>
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="number"
                  {...register('price')}
                  className={errors.price && 'form-control is-invalid'}
                />
                <div className="invalid-feedback">{errors.price?.message}</div>
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row} controlId="formGroupSelect">
              <Col sm="6">
                <Form.Label>
                  <h5>Выбор валюты:</h5>
                </Form.Label>
              </Col>
              {/* <Col sm="4">
                <Form.Control as="select" name="currency">
                  <option>Выбрать</option>
                  {currencies.map((valuta, index) => {
                    return (
                      <option value={valuta.id} key={index}>
                        {valuta.symbol}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col> */}
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Form.Group as={Row} controlId="formGroupRadio">
              <Form.Label column sm="4">
                <h5>Статус:</h5>
              </Form.Label>
              <Col sm="8" key="inline - radio">
                {radioStatus.map((radio, index) => {
                  return (
                    <Form.Check
                      key={index}
                      inline
                      type="radio"
                      label={radio.label}
                      value={radio.value}
                      {...register('status')}
                    />
                  );
                })}
                <div>
                  <small className="text-danger">
                    {errors.status?.message}
                  </small>
                </div>
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row} controlId="formGroupRadio">
              <Form.Label column sm="4">
                <h5>Тип:</h5>
              </Form.Label>
              <Col sm="8" key="inline - radio">
                {radioType.map((radio, index) => {
                  return (
                    <Form.Check
                      key={index}
                      inline
                      type="radio"
                      label={radio.label}
                      value={radio.value}
                      {...register('house_type')}
                    />
                  );
                })}
                <div>
                  <small className="text-danger">
                    {errors.house_type?.message}
                  </small>
                </div>
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
                {...register('country')}
                className={errors.country && 'form-control is-invalid'}
              />
              <div className="invalid-feedback">{errors.country?.message}</div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupCity">
              <Form.Label>Город</Form.Label>
              <Form.Control
                type="text"
                {...register('city')}
                className={errors.city && 'form-control is-invalid'}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupStreet">
              <Form.Label>Улица</Form.Label>
              <Form.Control
                type="text"
                {...register('street')}
                className={errors.street && 'form-control is-invalid'}
              />
              <div className="invalid-feedback">{errors.street?.message}</div>
            </Form.Group>
          </Col>
          <Col sm="2">
            <Form.Group controlId="formGroupHouseNumber">
              <Form.Label>Номер дома</Form.Label>
              <Form.Control
                type="text"
                {...register('house_number')}
                className={errors.house_number && 'form-control is-invalid'}
              />
              <div className="invalid-feedback">
                {errors.house_number?.message}
              </div>
            </Form.Group>
          </Col>
          <Col sm="2">
            <Form.Group controlId="formGroupZipCode">
              <Form.Label>Индекс</Form.Label>
              <Form.Control type="number" {...register('zip_code')} />
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
export default AddDataHouse;
