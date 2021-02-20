import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navibar from './Navibar';
import FormModal from '../FormModal';
import { BaseContext } from '../../state/baseState/BaseContext';
import { RegistrationContext } from '../../state/registrationState/RegistrationContext';

export default function NavbarContainer() {
  const history = useHistory();
  const {
    handleRegistrationShow,
    token,
    userName,
    logout,
    receiveUserStorage,
    rememberLastEvent,
  } = useContext(RegistrationContext);
  // console.log(history.location.state.from.pathname);

  const { clearActiveItem } = useContext(BaseContext);
  useEffect(() => {
    receiveUserStorage();
    // eslint-disable-next-line
  }, []);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  return (
    <>
      <Navibar
        handleRegistrationShow={handleRegistrationShow}
        token={token}
        userName={userName}
        logout={logout}
        rememberLastEvent={rememberLastEvent}
        clearActiveItem={clearActiveItem}
        showCustomer={showCustomer}
        setShowCustomer={setShowCustomer}
        showBusiness={showBusiness}
        setShowBusiness={setShowBusiness}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        showAccount={showAccount}
        setShowAccount={setShowAccount}
        history={history}
      />
      <FormModal />
    </>
  );
}
