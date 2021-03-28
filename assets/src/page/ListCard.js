import React, { useEffect, useContext } from 'react';
import { Row } from 'react-bootstrap';
import NumberingSystem from '../components/listCard/NumberingSystem';
import ProfileListCard from '../components/listCard/ProfileListCard';
import { BaseContext } from '../state/baseState/BaseContext';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';

const ListCard = ({ match }) => {
  const urlPageNumer = match.params.name; //для пагинации через router
  const {
    itemList,
    handleDelete,
    handleShow,
    editItem,
    count,
    pageSize,
    paginationUrl,
  } = useContext(BaseContext);
  const { rememberLastEvent } = useContext(RegistrationContext);

  useEffect(() => {
    //console.log('работает');
    paginationUrl(+urlPageNumer);

    // eslint-disable-next-line
  }, [+urlPageNumer]);

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
            urlPageNumber={urlPageNumer}
          />
        </Row>
      </div>
    </>
  );
};
export default ListCard;
