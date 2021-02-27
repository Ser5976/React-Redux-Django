import { firstHouse } from '../../constants/img';
import styled from 'styled-components'; // install styled-components. Для создания стилей

export const Styles = styled.div`
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
