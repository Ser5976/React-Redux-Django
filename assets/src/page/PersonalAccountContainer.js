import React, { useRef, useEffect, useContext } from 'react';
import { PersonalAccountContext } from '../state/personalAccountState/PersonalAccountContext';
import PersonalAccount from '../components/account/PersonalAccount';
import { CONVERTER } from '../constants/urls';

const PersonalAccountContainer = () => {
  const {
    activeUser,
    changeUser,
    formUser,
    getUser,
    wallet,
    date,
    rate,
    handleChangeAccount,
    handleSubmitAccount,
    handleChangeAvatar,
    currencyRate,
  } = useContext(PersonalAccountContext);

  const inputEl = useRef(null);
  useEffect(() => {
    getUser();
    currencyRate(CONVERTER);
    // eslint-disable-next-line
  }, []);

  return (
    <PersonalAccount
      activeUser={activeUser}
      changeUser={changeUser}
      formUser={formUser}
      wallet={wallet}
      date={date}
      handleChangeAccount={handleChangeAccount}
      handleSubmitAccount={handleSubmitAccount}
      handleChangeAvatar={handleChangeAvatar}
      inputEl={inputEl}
      rate={rate}
    />
  );
};
export default PersonalAccountContainer;
