import React from 'react';
import { Card, Row, Col, Accordion, Button } from 'react-bootstrap';

const Wallet = ({ wallet }) => {
  console.log(wallet);
  const wallets = wallet.map((money) => {
    return (
      <Accordion key={money.id}>
        <Card>
          <Card.Header>
            <Row className="justify-content-between">
              <Col sm={7}>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={money.id}
                >
                  {money.currency.name}
                </Accordion.Toggle>
              </Col>
              <Col sm={4}> № {money.public_key}</Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey={money.id}>
            <Card.Body>
              {' '}
              <Row className="justify-content-between">
                <Col sm={4}>Ваш баланc:</Col>
                <Col sm={5}>
                  {money.balance} <span></span>
                  {money.currency.symbol}
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  });
  return <>{wallets}</>;
};

export default Wallet;
