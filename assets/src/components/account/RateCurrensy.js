import React, { useState } from 'react';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const RateCurrensy = ({ date, usdEur, eurRub, eurUsd, usdRub }) => {
  const rubUsd = (1 / usdRub).toFixed(4);
  const rubEur = (1 / eurRub).toFixed(4);

  const [toggleEurUsd, setToggleEurUsd] = useState(true);
  const [toggleEurRub, setToggleEurRub] = useState(true);
  const [toggleUsdRub, setToggleUsdRub] = useState(true);

  const handleTogleEurUsd = () => setToggleEurUsd(!toggleEurUsd);
  const handleTogleEurRub = () => setToggleEurRub(!toggleEurRub);
  const handleTogleUsdRub = () => setToggleUsdRub(!toggleUsdRub);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Курсы валют на {date}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row className="justify-content-between">
            <Col sm={7}>
              <Button variant="outline-secondary" onClick={handleTogleEurUsd}>
                {toggleEurUsd ? 'EUR / USD' : 'USD / EUR'}
              </Button>
            </Col>
            <Col sm={4}>{toggleEurUsd ? eurUsd : usdEur}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="justify-content-between">
            <Col sm={7}>
              <Button variant="outline-secondary" onClick={handleTogleEurRub}>
                {toggleEurRub ? 'EUR/RUB' : 'RUB/EUR'}
              </Button>
            </Col>
            <Col sm={4}>{toggleEurRub ? eurRub : rubEur}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="justify-content-between">
            <Col sm={7}>
              <Button variant="outline-secondary" onClick={handleTogleUsdRub}>
                {toggleUsdRub ? 'USD/RUB' : 'RUB/USD'}
              </Button>
            </Col>
            <Col sm={4}>{toggleUsdRub ? usdRub : rubUsd}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
export default RateCurrensy;
