import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navibar = ({ setSelectedHouseClear }) => {
  const [showCustomer, setShowCustomer] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
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
              onClick={setSelectedHouseClear}
            >
              Разместить объявление
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navibar;
