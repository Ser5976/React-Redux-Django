import React, { useContext } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormModal from './FormModal';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';

export default function Navibar() {
  const { handleRegistrationShow } = useContext(RegistrationContext);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link
            to="/"
            style={{ textDecoration: 'none', color: '#fff', }}
          >
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
              <NavDropdown.Item href="#action/3.4">
                Замени на что-нибудь полезное
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Замени на что-нибудь полезное
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Для администраторов" id="collasible-nav-dropdown">
                <a
                  href="http://127.0.0.1:8000/admin/"
                  style={{ textDecoration: 'none', color: '#212529', 'marginLeft': '20px' }}
                >
                  Django admin
                </a>
              <NavDropdown.Divider />
              <a
                  href="http://127.0.0.1:8000/swagger/"
                  style={{ textDecoration: 'none', color: '#212529', 'marginLeft': '20px' }}
              >
                Swagger
              </a>
              <NavDropdown.Divider />
              <a
                  href="http://127.0.0.1:8000/silk/"
                  style={{ textDecoration: 'none', color: '#212529', 'marginLeft': '20px' }}
              >
                Silk
              </a>
            </NavDropdown>
          </Nav>
          <Nav>
            <Button
              variant="primary"
              className=" mr-2"
              onClick={handleRegistrationShow}
            >
              Войти
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <FormModal />
    </>
  );
}
