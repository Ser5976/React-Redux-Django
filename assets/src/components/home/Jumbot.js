import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import { Styles } from './StyledJumbot';

const Jumbot = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Django react</h1>
        <p>
          Bootstrap Icons are designed to work best with Bootstrap components,
          but they’ll work in any project. They’re SVGs, so they scale quickly
          and easily, can be implemented in several ways, and can be styled with
          CSS. Bootstrap Icons are designed to work best with Bootstrap
          components, but they’ll work in any project. They’re SVGs, so they
          scale quickly and easily, can be implemented in several ways, and can
          be styled with CSS.
        </p>
      </Container>
    </Jumbo>
  </Styles>
);

export default Jumbot;
