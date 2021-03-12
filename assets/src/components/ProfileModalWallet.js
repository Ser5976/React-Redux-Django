import React, { useState } from 'react';
import { Modal, Card, CardDeck, Row, Col, Button } from 'react-bootstrap';
import styles from '../css/profileModalWallet.module.css';

const ProfileModalWallet = ({
  closeWalet,
  show,
  wallet,
  showTransaction,
  chooseWallet,
}) => {
  const [flag, setFlag] = useState({ green: false, disabled: true });

  const changeBorder = (id) => {
    if (flag.green === id) {
      setFlag({ ...flag, green: false, disabled: true });
    } else {
      setFlag({ ...flag, green: id, disabled: false });
    }
  };

  console.log(wallet);
  return (
    <Modal show={show} onHide={closeWalet} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Ваш кошелёк</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardDeck>
          {wallet.map((money, index) => {
            return (
              <Card
                key={money.id}
                className={flag.green === index ? styles.card : styles.card1}
                onClick={() => {
                  changeBorder(index);
                  chooseWallet(money);
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
          }}
        >
          Далее
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfileModalWallet;
