import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Wallet = ({ wallet }) => {
  const { balance, currency } = wallet;
  const money = { ...currency };

  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        Ваш кошелёк
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Row className="justify-content-between">
            <Col sm={4}>Ваш баланc:</Col>
            <Col sm={5}>
              {balance}
              <span> </span>
              {money.symbol}
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Wallet;
