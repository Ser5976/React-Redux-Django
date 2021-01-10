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
  validated: false,
  show: false,
  token: undefined,
};

const RegistrationState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const handleClose = () => dispatch({ type: 'SHOW_CLOSE' });
  const { activeUsers, validated, show, token } = state;
  const handleRegistrationShow = () => {
    dispatch({ type: 'SHOW_CLOSE' });
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
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };
  const receiveTokenLocalStorage = () => {
    let token = localStorage.getItem('token');
    dispatch({ type: 'AUTH', payload: token });
  };

  return (
    <RegistrationContext.Provider
      value={{
        activeUsers,
        validated,
        show,
        token,
        handleChangeInput,
        handleSubmitForm,
        handleRegistrationShow,
        handleClose,
        logout,
        receiveTokenLocalStorage,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationState;
