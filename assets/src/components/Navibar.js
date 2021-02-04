import '../css/navbar.css';

import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FormModal from './FormModal';
import { BaseContext } from '../state/baseState/BaseContext';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';
import { AdminUrls } from '../constants/urls';

export default function Navibar() {
  const history = useHistory();
  const {
    handleRegistrationShow,
    token,
    userName,
    logout,
    receiveUserStorage,
    rememberLastEvent,
  } = useContext(RegistrationContext);
  // console.log(history.location.state.from.pathname);

  const { clearActiveItem } = useContext(BaseContext);
  useEffect(() => {
    receiveUserStorage();
    // eslint-disable-next-line
  }, []);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  // console.log(showAccount);
  /*  const toggleDropdown = (e) => {
    let dropdownId = e.target.id;
    switch (dropdownId) {
      case 'customer-dropdown':
        setShowCustomer(!showCustomer);
        break;
      case 'business-dropdown':
        setShowBusiness(!showBusiness);
        break;
      case 'admin-dropdown':
        setShowAdmin(!showAdmin);
        break;
      default:
      // console.log('error ', e.target);
    }
    console.log(dropdownId);
  };
  console.log(showBusiness);
 */
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

            <NavDropdown
              title="Для частных лиц"
              className="mr-3"
              show={showCustomer}
              onMouseEnter={() => setShowCustomer(!showCustomer)}
              onMouseLeave={() => setShowCustomer(!showCustomer)}
              id="customer-dropdown"
            >
              <NavDropdown.Item>
                <Link to="/ListCard" className="dropdown-link">
                  Выбрать дом
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="dropdown-link">
                Замени на что-нибудь полезное
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Для бизнеса"
              className="mr-3"
              show={showBusiness}
              onMouseEnter={() => setShowBusiness(!showBusiness)}
              onMouseLeave={() => setShowBusiness(!showBusiness)}
              id="business-dropdown"
            >
              <NavDropdown.Item>
                <Link to="/ListCard" className="dropdown-link">
                  Список объектов
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  to="/addData"
                  className="dropdown-link"
                  onClick={(event) => {
                    rememberLastEvent(event);
                    clearActiveItem();
                  }}
                >
                  Разместить объявление
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Для администраторов"
              show={showAdmin}
              onMouseEnter={() => setShowAdmin(!showAdmin)}
              onMouseLeave={() => setShowAdmin(!showAdmin)}
              id="admin-dropdown"
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={AdminUrls.ADMIN}
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
                href={AdminUrls.SWAGGER}
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
                href={AdminUrls.SILK}
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
            {token ? null : (
              <Link to="/login">
                <Button variant="primary" className=" mr-2">
                  Вход
                </Button>
              </Link>
            )}
            {token ? (
              <NavDropdown
                title={'Привет ' + userName}
                id="collasible-nav-dropdown"
                className="mr-5"
                onMouseEnter={() => setShowAccount(!showAccount)}
                onMouseLeave={() => setShowAccount(!showAccount)}
                show={showAccount}
              >
                <NavDropdown.Item>
                  <Link to="/personalAccount" className="dropdown-link">
                    Личный кабинет
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="#"
                    className="dropdown-link"
                    onClick={() => {
                      logout(history);
                      setShowAccount(false);
                    }}
                  >
                    Выйти
                  </Link>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <FormModal />
    </>
  );
}
