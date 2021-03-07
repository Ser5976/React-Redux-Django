import React, { useState } from 'react';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const RateCurrensy = ({ date, rate }) => {
  // console.log(rate);
  const [mark, setMark] = useState(false);

  const handleToggle = (index) => {
    if (mark === index) {
      setMark(false);
    } else {
      setMark(index);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Курсы валют на {date}</Card.Header>
      <ListGroup variant="flush">
        {rate.map((element, index) => {
          return (
            <ListGroup.Item key={index}>
              <Row className="justify-content-between">
                <Col sm={7}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      handleToggle(index);
                    }}
                  >
                    {mark === index ? element.nameCouple2 : element.nameCouple1}
                  </Button>
                </Col>
                <Col sm={4}>
                  {mark === index ? element.couple2 : element.couple1}
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};
export default RateCurrensy;
