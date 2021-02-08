import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Wallet = ({ wallet }) => {
  const wallets = wallet.map((money) => {
    return (
      <Card>
        <Card.Header as="h5" className="text-center">
          {money.currency.name}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Row className="justify-content-between">
              <Col sm={4}>Ваш баланc:</Col>
              <Col sm={5}>
                {money.balance} <span></span>
                {money.currency.symbol}
              </Col>
            </Row>
          </Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    );
  });
  return <>{wallets}</>;
};

export default Wallet;
