import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components'; // install styled-components. Для создания стилей
import { firstHouse } from '../../constants/img';

const Styles = styled.div`
  .jumbo {
    background: url(${firstHouse}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 300px;
    position: relative;
    z-index: -2;
    top: 0;
  }
  .overlay {
    background-color: #000;
    opacity: 0.5;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;

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
