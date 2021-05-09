import React from 'react';
import Navibar from './Navibar';
import { setSelectedHouseClear } from '../../store/reducers/houseReduser'; // очистка стейта selectedHouse
import { connect } from 'react-redux';

const NavbarContainer = ({ setSelectedHouseClear }) => {
  return (
    <>
      <Navibar setSelectedHouseClear={setSelectedHouseClear} />
    </>
  );
};
export default connect(null, {
  setSelectedHouseClear,
})(NavbarContainer);
