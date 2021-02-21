import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RegistrationContext } from '../state/registrationState/RegistrationContext';
import Login from '../components/Login';

const LoginContainer = () => {
  const history = useHistory();
  const {
    handleChangeLogin,
    handleSubmitLogin,
    error,
    registrationShow,
    handleChangeCheckbox,
  } = useContext(RegistrationContext);

  return (
    <Login
      handleChangeLogin={handleChangeLogin}
      handleSubmitLogin={handleSubmitLogin}
      error={error}
      registrationShow={registrationShow}
      handleChangeCheckbox={handleChangeCheckbox}
      history={history}
    />
  );
};
export default LoginContainer;
