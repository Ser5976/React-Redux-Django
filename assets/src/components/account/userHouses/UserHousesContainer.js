import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import ProfileUserHouses from './ProfileUserHouses';

const UserHousesContainer = ({
  userHouses, //список домов пользователя
  isFetching, //крутилка
}) => {
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
        <ProfileUserHouses userHouses={userHouses} />
      )}
    </>
  );
};

export default UserHousesContainer;
