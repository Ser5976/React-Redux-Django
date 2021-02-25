import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  img {
    height: 400px;
  }
`;

const Slider = ({ itemList }) => {
  return (
    <Styles>
      <Carousel className="mb-3">
        {itemList.map((item) => {
          return (
            <Carousel.Item key={item.id}>
              <img className="d-block w-100" src={item.photo} alt=" slide" />
              <Carousel.Caption>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Styles>
  );
};
export default Slider;
