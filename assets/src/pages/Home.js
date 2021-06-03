import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Jumbot from '../components/home/Jumbot';
import Slider from '../components/home/Slider';
import Futer from '../components/home/Futer';
//import { house1, house2, house3, house4 } from '../constants/img';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img3.jpg';
import img5 from '../img/img5.jpg';
import styles from '../css/home.module.css';

const imgHouse = [img1, img2, img3, img4, img5];
//const imgHouse = [house1, house2, house3, house4];

const Home = () => {
  return (
    <>
      <Jumbot />
      <Container className={styles.container}>
        <Row>
          <Col md={7}>
            <Slider imgHouse={imgHouse} />
          </Col>
          <Col md={5}>
            <h2>React Redux Django</h2>
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
    </>
  );
};
export default Home;
