import React, { useRef, useEffect, useContext } from 'react';
import { PersonalAccountContext } from '../state/personalAccountState/PersonalAccountContext';
import PersonalAccount from '../components/account/PersonalAccount';
import { USD, EUR } from '../constants/urls';

const PersonalAccountContainer = () => {
  const {
    activeUser,
    changeUser,
    formUser,
    getUser,
    wallet,
    date,
    usdEur,
    eurRub,
    eurUsd,
    usdRub,
    handleChangeAccount,
    handleSubmitAccount,
    handleChangeAvatar,
    currencyRate,
  } = useContext(PersonalAccountContext);

  const inputEl = useRef(null);
  useEffect(() => {
    getUser();
    currencyRate(EUR, USD);
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
      usdEur={usdEur}
      eurRub={eurRub}
      eurUsd={eurUsd}
      usdRub={usdRub}
    />
  );
};
export default PersonalAccountContainer;
