import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileCard from '../components/Profilecard';
import ProfileModalWallet from '../components/ProfileModalWallet';
import { BaseContext } from '../state/baseState/BaseContext';
import { PersonalAccountContext } from '../state/personalAccountState/PersonalAccountContext';

const ProfileCardContainer = ({ match }) => {
  const { itemCard, refreshCard, editItem, handleDelete } = useContext(
    BaseContext
  );
  const { wallet, getUser } = useContext(PersonalAccountContext);
  const urlId = match.params.name;
  const history = useHistory();
  useEffect(() => {
    refreshCard(urlId);
    getUser();
    // eslint-disable-next-line
  }, []);

  // console.log(match);
  const [show, setShow] = useState(false);
  const openWallet = () => {
    console.log(3);
    setShow(!show);
  };
  const closeWalet = () => {
    setShow(!show);
  };

  return (
    <>
      <ProfileCard
        editItem={editItem}
        handleDelete={handleDelete}
        history={history}
        itemCard={itemCard}
        openWallet={openWallet}
      />
      <ProfileModalWallet closeWalet={closeWalet} show={show} wallet={wallet} />
    </>
  );
};

export default ProfileCardContainer;
