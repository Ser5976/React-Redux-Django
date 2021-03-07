import React from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import AccountForm from './AccountForm';
import AddAccount from './AddAccount';
import Wallet from './Wallet';
import RateCurrensy from './RateCurrensy';

const PersonalAccount = ({
  activeUser,
  changeUser,
  formUser,
  wallet,
  date,
  usdEur,
  eurRub,
  eurUsd,
  usdRub,
  rate,
  handleChangeAccount,
  handleSubmitAccount,
  handleChangeAvatar,
  inputEl,
}) => {
  const { first_name, last_name, email, username, role, avatar } = activeUser;
  const firstName = first_name ? first_name : 'Имя';
  //background-color: rgba(0,0,0,.03);
  return (
    <>
      <Row className="m-3 justify-content-between">
        <Col sm={3}>
          <h4>Здравствуйте {firstName}</h4>
          <div>
            Это Ваш личный кабинет, где Вы сможете просматривать личные данные,
            редактировать свой профиль, а также управлять балансами своих
            кошельков.
          </div>
        </Col>

        <Col sm={2}>
          {avatar ? (
            <img
              src={avatar}
              alt="аватар"
              style={{ width: '125px', height: '100px' }}
              className="rounded-circle ml-5 "
            />
          ) : null}
        </Col>
      </Row>
      <Container className="  mt-5">
        <Tab.Container id="tabs" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className=" flex-column mt-2">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <h6>Профиль</h6>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <h6>Личные данные</h6>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    <h6>Кошелёк</h6>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="pl-5">
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col sm={8}>
                      <AccountForm
                        formUser={formUser}
                        inputEl={inputEl}
                        handleChangeAccount={handleChangeAccount}
                        handleSubmitAccount={handleSubmitAccount}
                        handleChangeAvatar={handleChangeAvatar}
                        changeUser={changeUser}
                      />
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    <Col sm={8}>
                      <AddAccount
                        first_name={first_name}
                        last_name={last_name}
                        email={email}
                        username={username}
                        avatar={avatar}
                        role={role}
                      />
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Row>
                    <Col sm={7}>
                      <Wallet wallet={wallet} />
                    </Col>
                    <Col>
                      <RateCurrensy date={date} rate={rate} />
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};
export default PersonalAccount;
