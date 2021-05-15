import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navibar = ({
  setSelectedHouseClear, //очистка стейта выбранного дома
  setModalRegistration, // открытие модального окна регистрации
  logout, //очистка storage(токен и т.д.(данных пользователя))
  setAuthClear, // удаление данных пользователя из стора
  rememberLastEvent, //запомнить  путь к последнему клику
  token, //токен
  userName, //логин
}) => {
  const history = useHistory();
  const [showCustomer, setShowCustomer] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
          React Redux Django
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            title="Для частных лиц"
            className="mr-3"
            show={showCustomer}
            onMouseEnter={() => setShowCustomer(!showCustomer)}
            onMouseLeave={() => setShowCustomer(!showCustomer)}
            id="customer-dropdown"
          >
            <Link to={'/ListHousesContainer/' + 1} className="dropdown-item">
              Выбрать дом
            </Link>

            <NavDropdown.Divider />
            <Link to={'/ListHousesContainer/' + 1} className="dropdown-item">
              Замени на что-нибудь полезное
            </Link>
          </NavDropdown>
          <NavDropdown
            title="Для бизнеса"
            className="mr-3"
            show={showBusiness}
            onMouseEnter={() => setShowBusiness(!showBusiness)}
            onMouseLeave={() => setShowBusiness(!showBusiness)}
            id="business-dropdown"
          >
            <Link
              to="/addDataContainer"
              className="dropdown-item"
              onClick={(e) => {
                setSelectedHouseClear(); //очистка стейта выбранного дома
                rememberLastEvent(e); //запомнить клик(путь)
              }}
            >
              Разместить объявление
            </Link>
          </NavDropdown>
        </Nav>

        <Nav>
          {token ? null : (
            <Link to="/login">
              <Button variant="outline-light" className=" mr-2">
                Войти
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
              <Link to="#" className="dropdown-item">
                Личный кабинет
              </Link>
              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => {
                  logout(history);
                  setAuthClear();
                }}
              >
                Выйти
              </Link>
            </NavDropdown>
          ) : (
            <Button
              variant="outline-light"
              className=" mr-2"
              onClick={() => {
                setModalRegistration(true); // открытие модального окна
              }}
            >
              Регистрация
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navibar;
