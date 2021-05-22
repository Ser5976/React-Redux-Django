import React, { useState } from 'react';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const RateCurrensy = ({ date, rate }) => {
  let obj = {};
  for (var i = 0; i < rate.length; i++) {
    obj[i] = true;
    // console.log(obj);
  }
  const [mark, setMark] = useState(obj);

  const handleToggle = (index) => {
    mark[index] = !mark[index];
    setMark({ ...mark });
  };
  //console.log(mark);
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
                    {mark[index] ? element.nameCouple2 : element.nameCouple1}
                  </Button>
                </Col>
                <Col sm={4}>
                  {mark[index] ? element.couple2 : element.couple1}
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
