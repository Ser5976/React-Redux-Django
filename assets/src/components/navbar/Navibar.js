import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AdminUrls } from '../../constants/urls';
import { receiveDataStorage } from '../../utilities/receiveDataStorage';

export default function Navibar({
  handleRegistrationShow,
  token,
  userName,
  logout,
  history,
  rememberLastEvent,
  clearActiveItem,
  showCustomer,
  setShowCustomer,
  showBusiness,
  setShowBusiness,
  showAdmin,
  setShowAdmin,
  showAccount,
  setShowAccount,
  clearCurrentPage,
  currentPage,
}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
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
            <Link to={'/ListCard/' + currentPage} className="dropdown-item">
              Выбрать дом
            </Link>

            <NavDropdown.Divider />
            <Link to={'/ListCard/' + currentPage} className="dropdown-item">
              Замени на что-нибудь полезное
            </Link>
          </NavDropdown>
          {receiveDataStorage('role') === '1' ? null : (
            <NavDropdown
              title="Для бизнеса"
              className="mr-3"
              show={showBusiness}
              onMouseEnter={() => setShowBusiness(!showBusiness)}
              onMouseLeave={() => setShowBusiness(!showBusiness)}
              id="business-dropdown"
            >
              <Link to={'/ListCard/' + currentPage} className="dropdown-item">
                Список объектов
              </Link>

              <NavDropdown.Divider />

              <Link
                to="/addData"
                className="dropdown-item"
                onClick={(event) => {
                  rememberLastEvent(event);
                  clearActiveItem();
                }}
              >
                Разместить объявление
              </Link>
            </NavDropdown>
          )}
          {receiveDataStorage('is_admin') === 'true' && (
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
                className="dropdown-item"
              >
                Django admin
              </a>
              <NavDropdown.Divider />
              <a
                target="_blank"
                rel="noreferrer"
                href={AdminUrls.SWAGGER}
                className="dropdown-item"
              >
                Swagger
              </a>
              <NavDropdown.Divider />
              <a
                target="_blank"
                rel="noreferrer"
                href={AdminUrls.SILK}
                className="dropdown-item"
              >
                Silk
              </a>
            </NavDropdown>
          )}
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
              <Link to="/personalAccount" className="dropdown-item">
                Личный кабинет
              </Link>
              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => {
                  logout(history);
                  setShowAccount(false);
                  clearCurrentPage();
                }}
              >
                Выйти
              </Link>
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
  );
}
