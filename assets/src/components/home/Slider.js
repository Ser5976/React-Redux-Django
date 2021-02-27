import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../../css/slider.module.css';

const Slider = ({ imgHouse }) => {
  return (
    <Carousel className="mb-3">
      {imgHouse.map((item, index) => {
        return (
          <Carousel.Item key={index}>
            <img className="d-block w-100  " src={item} alt=" slide" />
            <Carousel.Caption>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
export default Slider;
