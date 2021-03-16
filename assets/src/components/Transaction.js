import React from 'react';
import { Modal, Button, Card, Row, Col, CardDeck } from 'react-bootstrap';

const Transaction = ({
  open,
  closeTransaction,
  selectedWallet,
  itemCard,
  calculationMoney,
  transctionSabmit,
}) => {
  const { currency } = selectedWallet;
  const valuta = { ...currency };
  const { address, price, owner_username, currency_symbol } = itemCard;
  // console.log(itemCard);
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
                Стоимость:
                <div>
                  {price} {currency_symbol}
                </div>
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
              {calculationMoney.remains >= 0 ? (
                currency_symbol === valuta.symbol ? (
                  <h6>
                    С вашего счёта будет списано:
                    <div>{`${price} ${valuta.symbol}`}</div>
                  </h6>
                ) : (
                  <h6>
                    С вашего счёта будет списано:
                    <div>{`${calculationMoney.result} ${valuta.symbol}`}</div>
                    <div>
                      <small>{`Расчёт произведён по курсу на: ${calculationMoney.date}`}</small>
                    </div>
                  </h6>
                )
              ) : (
                <h5 className="text-danger">Недостаточно средств на счёте</h5>
              )}
            </Card.Footer>
          </Card>
        </CardDeck>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={calculationMoney.remains < 0}
          onClick={transctionSabmit}
        >
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Transaction;
