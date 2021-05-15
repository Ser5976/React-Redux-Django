import React from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/Login';
import { setModalRegistration } from '../store/reducers/registrationReduser';
import { authAction } from '../action/authAction';
import { connect } from 'react-redux';

const LoginContainer = ({
  authError,
  setModalRegistration,
  pathname,
  authAction,
}) => {
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    authAction(data, history, pathname); // передача данных из формы авторизации на сервак(data).history
    //и pathname, нужны для того, чтобы вернутьс на страницу, по последнему клику
    // запись checkbox в  localStorage, для 'запомнить меня'
    localStorage.setItem('checkbox', data.checkbox);
  };

  return (
    <Login
      onSubmit={onSubmit}
      authError={authError}
      setModalRegistration={setModalRegistration}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError, // ошибка авторизации
    pathname: state.auth.pathname, // данные пути последнего клика
  };
};
export default connect(mapStateToProps, {
  setModalRegistration,
  authAction,
})(LoginContainer);
