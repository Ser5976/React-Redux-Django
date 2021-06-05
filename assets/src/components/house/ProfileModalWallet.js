import React, { useState } from 'react';
import { Modal, Card, CardDeck, Row, Col, Button } from 'react-bootstrap';
import styles from '../../css/profileModalWallet.module.css';

const ProfileModalWallet = ({
  closeWalet, // закрытие модольного окна
  show, // флаг открытия модального окна
  wallet, // все кошелки пользователя
  selectedHouse, //данные выбранного дома
  setSelectedWallet, //запись данных выбранного кашелька
  showTransaction,
  // chooseWallet,
  convertetTransaction, //делаем конвертацию на transaction, если разные валюты
  addDataTransaction, // добавляем данные для транзакции
  addCurrentExchange, //добавление отношение валюты дома/на валюту кашелька в объект transaction
}) => {
  console.log(selectedHouse);
  const { currency_symbol, price } = selectedHouse; //нужен для конвертации в transaction

  const [flag, setFlag] = useState({ green: false, disabled: true });

  const changeBorder = (id) => {
    if (flag.green === id) {
      setFlag({ ...flag, green: false, disabled: true });
    } else {
      setFlag({ ...flag, green: id, disabled: false });
    }
  };

  //console.log(wallet);
  // console.log(selectedHouse);
  return (
    <Modal show={show} onHide={closeWalet} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Ваш кошелёк</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {wallet.length === 0 && <h5 className="text-center ">Нет карт</h5>}
        <CardDeck>
          {wallet.map((money, index) => {
            return (
              <Card
                key={money.id}
                className={flag.green === index ? styles.card : styles.card1}
                onClick={() => {
                  // console.log(money);
                  changeBorder(index);
                  setSelectedWallet(money);
                  convertetTransaction(
                    money.currency.symbol,
                    currency_symbol,
                    price,
                    money.balance
                  ); // будет делать конвертацию на transaction, если разные валюты
                  addDataTransaction(
                    money.id,
                    selectedHouse.id,
                    selectedHouse.price
                  );
                }}
              >
                <Card.Body>
                  <h5>№ {money.public_key}</h5>
                  <Row className="justify-content-between">
                    <Col sm={5}>
                      <h6>Баланc :</h6>
                    </Col>
                    <Col sm={7}>
                      {money.balance} <span></span>
                      {money.currency.symbol}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Обновлено {money.updated}
                  </small>
                </Card.Footer>
              </Card>
            );
          })}
        </CardDeck>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={flag.disabled}
          onClick={() => {
            closeWalet();
            showTransaction();
            addCurrentExchange();
          }}
        >
          Далее
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfileModalWallet;
