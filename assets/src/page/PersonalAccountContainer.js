import React, { useRef, useEffect, useContext } from 'react';
import { PersonalAccountContext } from '../state/personalAccountState/PersonalAccountContext';
import PersonalAccount from '../components/account/PersonalAccount';

const PersonalAccountContainer = () => {
  const {
    activeUser,
    changeUser,
    formUser,
    getUser,
    wallet,
    handleChangeAccount,
    handleSubmitAccount,
    handleChangeAvatar,
  } = useContext(PersonalAccountContext);

  const inputEl = useRef(null);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <PersonalAccount
      activeUser={activeUser}
      changeUser={changeUser}
      formUser={formUser}
      wallet={wallet}
      handleChangeAccount={handleChangeAccount}
      handleSubmitAccount={handleSubmitAccount}
      handleChangeAvatar={handleChangeAvatar}
      inputEl={inputEl}
    />
  );
};
export default PersonalAccountContainer;
