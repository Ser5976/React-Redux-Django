import React from 'react';
import { Container, Row, Col, Tab, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AccountForm from './AccountForm';
import Wallet from './Wallet';
import RateCurrensy from './RateCurrensy';
import ModalAddCardWallet from './ModalAddCardWallet';
import UserHousesContainer from './userHouses/UserHousesContainer';

const PersonalAccount = ({
  wallet, //кошельки пользователя
  user, // данные пользователя
  formUser, // данные пользователь для формы в учётной записи
  rate, // массив данных валютных пар и результатов отношений валют
  date, // дата получения курса валют
  userHouses, //список домов пользователя
  isFetching, // крутилка при загрузки домов
  activWallet, //активирование выбранного кашелька
  handleSubmit, // отправка formUser на сервак
  handleChangeAccount, // получение значений из формы и запись их в стор в formUser(для контроля за формой, а так же подготовка объекта для отправки на сервак)
  deleteAccount, //удаление аккаунта
  deleteWallet, //удаление карты кошелька
  logout, // очистка Storage
  show, //флаг для открытия модального окна
  setShow, // для открытия  и закрытия модального окна добавление карты кошелька.
  onSubmit, // сбор данных из формы добавления карты кошелька,создание объекта для отправки на сервак
}) => {
  const history = useHistory();
  return (
    <Container className="p-5">
      <div className="d-flex justify-content-between ">
        <div>Панель управления-Сведения об учётной записи</div>
        <div>
          Вошли в систему как{'  '}
          {user.first_name || user.last_name
            ? `${user.first_name}   ${user.last_name}`
            : '.....'}
        </div>
      </div>
      <hr />
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#first">
        <Row>
          <Col sm={3}>
            <ListGroup>
              <ListGroup.Item action variant="light" href="#first">
                Учётная запись
              </ListGroup.Item>
              <ListGroup.Item action variant="light" href="#second">
                Ваш кошелёк
              </ListGroup.Item>
              <ListGroup.Item action variant="light" href="#third">
                Ваши объявления
              </ListGroup.Item>
            </ListGroup>
            <RateCurrensy rate={rate} date={date} />
            <ListGroup className="mt-5">
              <ListGroup.Item
                action
                variant="danger"
                onClick={() => {
                  deleteAccount();
                  logout(history);
                }}
              >
                Удалить аккаунт
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#first">
                <AccountForm
                  formUser={formUser}
                  handleSubmit={handleSubmit}
                  handleChangeAccount={handleChangeAccount}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#second">
                <Wallet
                  wallet={wallet}
                  activWallet={activWallet}
                  deleteWallet={deleteWallet}
                  setShow={setShow}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#third">
                <UserHousesContainer
                  userHouses={userHouses}
                  isFetching={isFetching}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <ModalAddCardWallet show={show} setShow={setShow} onSubmit={onSubmit} />
    </Container>
  );
};
export default PersonalAccount;
