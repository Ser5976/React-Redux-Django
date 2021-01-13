import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormModal from './FormModal';
import { BaseContext } from '../state/baseState/BaseContext';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';

export default function Navibar() {
  const {
    handleRegistrationShow,
    token,
    userName,
    logout,
    receiveUserLocalStorage,
  } = useContext(RegistrationContext);
  const { clearActiveItem } = useContext(BaseContext);
  useEffect(() => {
    receiveUserLocalStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            Django React
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>

            <NavDropdown title="Для частных лиц" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link
                  to="/ListCard"
                  style={{ textDecoration: 'none', color: '#212529' }}
                >
                  Выбрать дом
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Замени на что-нибудь полезное
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Для бизнеса" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link
                  to="/ListCard"
                  style={{ textDecoration: 'none', color: '#212529' }}
                >
                  Список объектов
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  to="/addData"
                  style={{ textDecoration: 'none', color: '#212529' }}
                  onClick={clearActiveItem}
                >
                  Разместить объявление
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Для администраторов"
              id="collasible-nav-dropdown"
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="http://127.0.0.1:8000/admin/"
                style={{
                  textDecoration: 'none',
                  color: '#212529',
                  marginLeft: '20px',
                }}
              >
                Django admin
              </a>
              <NavDropdown.Divider />
              <a
                target="_blank"
                rel="noreferrer"
                href="http://127.0.0.1:8000/swagger/"
                style={{
                  textDecoration: 'none',
                  color: '#212529',
                  marginLeft: '20px',
                }}
              >
                Swagger
              </a>
              <NavDropdown.Divider />
              <a
                target="_blank"
                rel="noreferrer"
                href="http://127.0.0.1:8000/silk/"
                style={{
                  textDecoration: 'none',
                  color: '#212529',
                  marginLeft: '20px',
                }}
              >
                Silk
              </a>
            </NavDropdown>
          </Nav>
          <Nav>
            <>
              {token ? (
                <Button variant="primary" className=" mr-2" onClick={logout}>
                  Выйти
                </Button>
              ) : (
                <Link to="/loginCard">
                  <Button variant="primary" className=" mr-2">
                    Вход
                  </Button>
                </Link>
              )}
            </>
            <>
              {token ? (
                <NavDropdown title={"Привет " + userName} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.4">
                    Личный кабинет
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button
                  variant="primary"
                  className=" mr-2"
                  onClick={handleRegistrationShow}
                >
                  Регистрация
                </Button>
              )}
            </>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <FormModal />
    </>
  );
}
