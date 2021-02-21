import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileCard from '../components/Profilecard';
import { BaseContext } from '../state/baseState/BaseContext';

const ProfileCardContainer = ({ match }) => {
  const { itemCard, refreshCard, editItem, handleDelete } = useContext(
    BaseContext
  );
  const urlId = match.params.name;
  const history = useHistory();
  useEffect(() => {
    refreshCard(urlId);
    // eslint-disable-next-line
  }, []);
  console.log(match);

  return (
    <ProfileCard
      editItem={editItem}
      handleDelete={handleDelete}
      history={history}
      itemCard={itemCard}
    />
  );
};

export default ProfileCardContainer;
