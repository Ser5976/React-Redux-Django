import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadingSelectedHouse } from '../action/houseAction';
import ProfileHouse from '../components/house/ProfileHouse';
import { connect } from 'react-redux';

const ProfileHouseContainer = ({ loadingSelectedHouse, selectedHouse }) => {
  const { urlId } = useParams(); //  хук роутера ,который помогает получить значение params
  console.log(selectedHouse);

  useEffect(() => {
    loadingSelectedHouse(urlId);
    // eslint-disable-next-line
  }, []);

  return <ProfileHouse selectedHouse={selectedHouse} />;
};
const mapStateToProps = (state) => {
  return {
    selectedHouse: state.house.selectedHouse,
  };
};
export default connect(mapStateToProps, {
  loadingSelectedHouse,
})(ProfileHouseContainer);
