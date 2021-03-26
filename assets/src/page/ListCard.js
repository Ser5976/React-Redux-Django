import React, { useEffect, useContext } from 'react';
import { Row } from 'react-bootstrap';
//import MyCard from '../components/MyCard';
import NumberingSystem from '../components/listCard/NumberingSystem';
import ProfileListCard from '../components/listCard/ProfileListCard';
import { BaseContext } from '../state/baseState/BaseContext';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';
import { receiveDataStorage } from '../utilities/receiveDataStorage';

const ListCard = ({ match }) => {
  console.log(match);
  const {
    itemList,
    refreshList,
    handleDelete,
    handleShow,
    editItem,
    count,
    pageSize,
    currentPage,
    pagination,
  } = useContext(BaseContext);
  const { rememberLastEvent } = useContext(RegistrationContext);
  useEffect(() => {
    // const url = ModelUrls.ITEMS;
    currentPage !== 1 && receiveDataStorage('urlPage') !== null
      ? refreshList(receiveDataStorage('urlPage'))
      : refreshList();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ProfileListCard
        itemList={itemList}
        handleDelete={handleDelete}
        handleShow={handleShow}
        editItem={editItem}
        rememberLastEvent={rememberLastEvent}
      />
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <hr />
        <Row className="justify-content-sm-center ">
          <NumberingSystem
            count={count}
            pageSize={pageSize}
            pagination={pagination}
            currentPage={currentPage}
          />
        </Row>
      </div>
    </>
  );
};
export default ListCard;
