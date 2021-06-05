import React, { useState } from 'react';
import { Card, CardColumns, Button, ListGroup } from 'react-bootstrap';

const Wallet = ({ wallet, activWallet, deleteWallet }) => {
  const [flag, setFlag] = useState(localStorage.getItem('disabled')); //это всё для блокирование кнопок кашельков,которые не активны
  localStorage.setItem('disabled', flag);
  // console.log(flag);
  const [remove, setRemove] = useState(false); // флаг это для удаления карты
  console.log(remove);
  return (
    <Card>
      <Card.Header>Выбор карты для начисления средств</Card.Header>
      <Card.Body>
        <CardColumns>
          {wallet.length === 0 && (
            <Card.Title className="text-center">Нет карт</Card.Title>
          )}
          {wallet.map((money, index) => {
            return (
              <Card
                bg={
                  money.is_default
                    ? 'Success'.toLowerCase()
                    : 'Light'.toLowerCase()
                }
                text={money.is_default ? 'white' : 'dark'}
                key={index}
              >
                <div className="m-1">Карта {index + 1}</div>
                <Card.Body>
                  <Card.Title>
                    {money.balance} {money.currency.symbol}
                  </Card.Title>
                  <div>
                    <small>Остаток на {money.updated}</small>
                  </div>
                  <Card.Text>№{money.public_key}</Card.Text>
                </Card.Body>
                {remove ? (
                  <Button
                    variant="danger"
                    size="lg"
                    block
                    className="border-0 text-white"
                    onClick={() => {
                      deleteWallet(money.id);
                      setRemove(!remove);
                    }}
                  >
                    Удалить
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="lg"
                    block
                    className="border-0 text-white"
                    disabled={
                      +flag !== 0 ? (+flag === money.id ? false : true) : false
                    }
                    onClick={() => {
                      activWallet(money.id, !money.is_default);
                      setFlag(money.is_default ? 0 : money.id);
                    }}
                  >
                    {money.is_default ? (
                      <small>Карта активна</small>
                    ) : (
                      <small>Карта не активна</small>
                    )}
                  </Button>
                )}
              </Card>
            );
          })}
        </CardColumns>
      </Card.Body>
      <Card.Footer className="text-muted">
        <ListGroup horizontal>
          <ListGroup.Item
            action
            variant="danger"
            onClick={() => setRemove(!remove)}
          >
            Удалить карту
          </ListGroup.Item>
          <ListGroup.Item action variant="success">
            Добавить карту
          </ListGroup.Item>
        </ListGroup>
      </Card.Footer>
    </Card>
  );
};

export default Wallet;
