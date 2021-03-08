import React from 'react';
import { Modal, Button, Card, Row, Col, CardDeck } from 'react-bootstrap';

const Transaction = ({ open, closeTransaction, selectedWallet, itemCard }) => {
  const { currency } = selectedWallet;
  const valuta = { ...currency };
  const { address, price, owner_username } = itemCard;
  console.log(itemCard);
  const ad = { ...address };
  const { country, city, street, house_number, zip_code } = ad;
  return (
    <Modal show={open} onHide={closeTransaction} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Купить дом</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardDeck>
          <Card>
            <Card.Body>
              <b>Адрес</b>
              <p>
                {country}
                <span> </span>
                г.{city}
                <span> </span> ул.
                {street}
                <span> </span> д.
                {house_number}
                <span> </span>
                индекс: {zip_code}
              </p>
              <b>Владелец</b>
              <div>{owner_username}</div>
            </Card.Body>
            <Card.Footer>
              <h6>
                Стоимость:<span> </span> {price} руб.
              </h6>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <h5>№ {selectedWallet.public_key}</h5>
              <Row className="justify-content-between">
                <Col sm={5}>
                  <h6>Баланc :</h6>
                </Col>
                <Col sm={7}>
                  {selectedWallet.balance} <span></span>
                  {valuta.symbol}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <h6>
                С вашего стёта будет списано:<span> </span>
                {price} руб.
              </h6>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Подтвердить</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Transaction;
