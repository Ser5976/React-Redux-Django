import React, { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import ProfileListCard from '../components/listhouses/ProfileListCard';
import { loadingListHouses } from '../action/listHouseAction';
import { setFetchError } from '../store/reducers/listHousesReduser';
import AlertComponent from '../components/listhouses/AlertComponent';
import { connect } from 'react-redux';

const ListHousesContainer = ({
  listHouses,
  loadingListHouses,
  isFetching,
  setFetchError,
  isFetchError,
}) => {
  useEffect(() => {
    loadingListHouses();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isFetchError && <AlertComponent setFetchError={setFetchError} />}
      {isFetching ? (
        <Row
          className=" d-flex justify-content-center align-items-center "
          style={{ height: window.innerHeight - 65.6 }}
        >
          <Spinner animation="border" variant="dark" />
        </Row>
      ) : (
        <ProfileListCard listHouses={listHouses} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listHouses: state.listHouses.listHouses,
    isFetching: state.listHouses.isFetching,
    isFetchError: state.listHouses.isFetchError,
  };
};

export default connect(mapStateToProps, {
  loadingListHouses,
  setFetchError,
})(ListHousesContainer);
