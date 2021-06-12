import React, { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import ProfileUserHouses from './ProfileUserHouses';
import { loadingListHouses } from '../../../action/houseAction';
import { connect } from 'react-redux';

const UserHousesContainer = ({
  listHouses, //список домов
  loadingListHouses, //запрос для списка домов
  isFetching, //крутилка
}) => {
  useEffect(() => {
    loadingListHouses();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isFetching ? (
        <Row
          className=" d-flex justify-content-center align-items-center "
          style={{ height: window.innerHeight - 65.6 }}
        >
          <Spinner animation="border" variant="dark" />
        </Row>
      ) : (
        <ProfileUserHouses listHouses={listHouses} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listHouses: state.house.listHouses,
    isFetching: state.house.isFetching,
  };
};

export default connect(mapStateToProps, {
  loadingListHouses,
})(UserHousesContainer);
