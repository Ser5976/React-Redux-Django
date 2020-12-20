import React, { useContext } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyModal from './MyModal';
import FormModal from './FormModal';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';

export default function Navibar() {
  const { handleShow } = useContext(RegistrationContext);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Django React </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>

            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link
                  to="/ListCard"
                  style={{ textDecoration: 'none', color: '#212529' }}
                >
                  Список
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Button variant="primary" className=" mr-2" onClick={handleShow}>
              Registration
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <FormModal />
      <MyModal />
    </>
  );
}
