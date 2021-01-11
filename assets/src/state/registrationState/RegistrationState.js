import React, { useReducer } from 'react';
import axios from 'axios';
import { RegistrationContext } from './RegistrationContext';
import { authReducer } from '../../reducers/reducers';
import { AuthUrls } from '../../constants/urls';

const initialState = {
  activeUsers: {
    email: '',
    username: '',
    password1: '',
    password2: '',
    role: undefined,
  },
  activeLogin: {
    username: '',
    password: '',
  },
  validated: false,
  show: false,
  token: undefined,
  error: undefined,
};

const RegistrationState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // зыкрытие модального окна зегистрации
  const handleClose = () => dispatch({ type: 'SHOW_CLOSE' });

  const { activeUsers, validated, show, token, activeLogin, error } = state;
  //открытие модального окна регистрации
  const handleRegistrationShow = () => {
    dispatch({ type: 'SHOW_CLOSE' });
    // очистка регистрации
    const emptyActiveUsers = {
      activeUsers: {
        email: '',
        username: '',
        password1: '',
        password2: '',
        role: undefined,
      },
    };
    dispatch({
      type: 'AUTH_CLEAR',
      payload: { ...emptyActiveUsers.activeUsers },
    });
  };
  // получение зачений из формы регистрации
  const handleChangeInput = (e) => {
    const inputValue = {
      ...state.activeUsers,
      [e.target.name]: e.target.value,
    };
    dispatch({
      type: 'CHANGE_INPUT_VALUE',
      payload: inputValue,
    });
  };
  // console.log(activeUsers);
  // отправка данных из формы на сервер
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      // console.log(activeUsers);
      const response = await axios.post(AuthUrls.REGISTRATION, activeUsers);
      console.log(response);
      //console.log(response.config.data.username);
      localStorage.setItem('token', response.data['key']);
      let token = localStorage.getItem('token');
      dispatch({ type: 'AUTH', payload: token });
      dispatch({ type: 'SHOW_CLOSE' });
    }

    dispatch({ type: 'VALIDATED' });
  };
  // очистка LocalStorage
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };
  //Проверка наличия токена на LocalStorage
  const receiveTokenLocalStorage = () => {
    let token = localStorage.getItem('token');
    dispatch({ type: 'AUTH', payload: token });
  };
  //получение значений  авторизации
  const handleChangeLogin = (e) => {
    const inputValueLogin = {
      ...state.activeLogin,
      [e.target.name]: e.target.value,
    };
    //console.log(activeLogin);
    dispatch({
      type: 'CHANGE_ACTIVE_LOGIN',
      payload: inputValueLogin,
    });
  };
  //отправка логина на сервер и получение токина
  const handleSubmitLogin = async (event, history) => {
    event.preventDefault();
    try {
      const response = await axios.post(AuthUrls.LOGIN, activeLogin);
      // console.log(response);

      localStorage.setItem('token', response.data['key']);
      let token = localStorage.getItem('token');
      dispatch({ type: 'AUTH', payload: token });
      dispatch({ type: 'NO_ERROR' });
      history.goBack();
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR', payload: e.name });
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        activeUsers,
        validated,
        show,
        token,
        activeLogin,
        error,
        handleChangeInput,
        handleSubmitForm,
        handleRegistrationShow,
        handleClose,
        logout,
        receiveTokenLocalStorage,
        handleChangeLogin,
        handleSubmitLogin,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationState;
