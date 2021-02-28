import React, { useState } from 'react';
import { Modal, Card, CardDeck, Row, Col } from 'react-bootstrap';
import styles from '../css/profileModalWallet.module.css';

const ProfileModalWallet = ({ closeWalet, show, wallet }) => {
  const [green, setGreen] = useState(false);

  const changeBorder = (id) => {
    if (green === id) {
      setGreen(false);
    } else {
      setGreen(id);
    }
  };

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
                className={green === index ? styles.card : styles.card1}
                onClick={() => changeBorder(index)}
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
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            );
          })}
        </CardDeck>
      </Modal.Body>
    </Modal>
  );
};
export default ProfileModalWallet;
