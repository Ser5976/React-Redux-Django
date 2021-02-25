import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Jumbot from '../components/home/Jumbot';
import Slider from '../components/Slider';
import Futer from '../components/home/Futer';
import { BaseContext } from '../state/baseState/BaseContext';
import styled from 'styled-components';
const Styles = styled.div`
  .container {
    margin-bottom: 0;
  }
`;

const Home = () => {
  const { itemList, refreshList } = useContext(BaseContext);
  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  return (
    <Styles>
      <Jumbot />
      <Container className="container">
        <Row>
          <Col md={7}>
            <Slider itemList={itemList} />
          </Col>
          <Col md={5}>
            <h2>Django react</h2>
            <p>
              Bootstrap Icons are designed to work best with Bootstrap
              components, but they’ll work in any project. They’re SVGs, so they
              scale quickly and easily, can be implemented in several ways, and
              can be styled with CSS. Bootstrap Icons are designed to work best
              with Bootstrap components, but they’ll work in any project.
              They’re SVGs, so they scale quickly and easily, can be implemented
              in several ways, and can be styled with CSS. Bootstrap Icons are
              designed to work best with Bootstrap components, but they’ll work
              in any project. They’re SVGs, so they scale quickly and easily,
              can be implemented in several ways, and can be styled with CSS.
            </p>
          </Col>
        </Row>
      </Container>

      <Futer />
    </Styles>
  );
};
export default Home;
