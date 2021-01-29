import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { PersonalAccountContext } from '../state/personalAccountState/PersonalAccountContext';
import AccountForm from '../components/account/AccountForm';
import AddAccount from '../components/account/AddAccount';
import Wallet from '../components/account/Wallet';

const PersonalAccount = () => {
  const {
    activeUser,
    changeUser,
    formUser,
    getUser,
    wallet,
    handleChangeAccount,
    handleSubmitAccount,
    handleChangeAvatar,
  } = useContext(PersonalAccountContext);
  //variant="pills"

  const inputEl = useRef(null);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  const { first_name, last_name, email, username, role, avatar } = activeUser;
  const firstName = first_name ? first_name : 'Имя';
  //className="pr-20"
  return (
    <>
      <Row className="m-3 justify-content-between">
        <Col sm={3}>
          <h4>{firstName}</h4>
          <div>Ваш личный кабинет</div>
        </Col>

        <Col sm={2}>
          {avatar ? (
            <img
              src={avatar}
              alt="аватар"
              style={{ width: '125px' }}
              className="rounded ml-5"
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
            <Col sm={7}>
              <Tab.Content className="pl-5">
                <Tab.Pane eventKey="first">
                  <AccountForm
                    formUser={formUser}
                    inputEl={inputEl}
                    handleChangeAccount={handleChangeAccount}
                    handleSubmitAccount={handleSubmitAccount}
                    handleChangeAvatar={handleChangeAvatar}
                    changeUser={changeUser}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <AddAccount
                    first_name={first_name}
                    last_name={last_name}
                    email={email}
                    username={username}
                    avatar={avatar}
                    role={role}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Wallet wallet={wallet} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      {/*  <Row>
        <AddAccount
          first_name={first_name}
          last_name={last_name}
          email={email}
          username={username}
          avatar={avatar}
          role={role}
        />
        <AccountForm
          formUser={formUser}
          inputEl={inputEl}
          handleChangeAccount={handleChangeAccount}
          handleSubmitAccount={handleSubmitAccount}
          handleChangeAvatar={handleChangeAvatar}
          changeUser={changeUser}
        />
      </Row> */}
    </>
  );
};
export default PersonalAccount;
