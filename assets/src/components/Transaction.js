import React from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';

const Transaction = ({ open, closeTransaction, selectedWallet }) => {
  return (
    <Modal show={open} onHide={closeTransaction} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Сделка</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <h5>№ {selectedWallet.public_key}</h5>
            <Row className="justify-content-between">
              <Col sm={5}>
                <h6>Баланc :</h6>
              </Col>
              <Col sm={7}>
                {selectedWallet.balance} <span></span>
                {selectedWallet.currency.symbol}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Обновлено {selectedWallet.updated}
            </small>
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Далее</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Transaction;
