import React from 'react';
import { Card, Row, Col, Accordion, Button } from 'react-bootstrap';

const Wallet = ({ wallet }) => {
  //console.log(wallet);
  const wallets = wallet.map((money) => {
    return (
      <Accordion key={money.id}>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={money.id}
              className="text-center"
            >
              {money.currency.name}
            </Accordion.Toggle>
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
