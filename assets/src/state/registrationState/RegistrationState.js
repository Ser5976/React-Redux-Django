import React, { useReducer } from 'react';
//import axios from 'axios';
import { RegistrationContext } from './RegistrationContext';

const initialState = {
  input: {
    name: '',
    surname: '',
    email: '',
    username: '',
    password1: '',
    password2: '',
  },
  validated: false,
  show: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE':
      return { ...state, input: action.payload };
    case 'VALIDATED':
      return { ...state, validated: true };
    case 'SHOW_CLOSE':
      return {
        ...state,
        show: !state.show,
      };

    default:
      return state;
  }
};

const RegistrationState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleShow = () => dispatch({ type: 'SHOW_CLOSE' });
  const handleClose = () => dispatch({ type: 'SHOW_CLOSE' });

  const handleChangeInput = (e) => {
    const inputValue = { ...state.input, [e.target.name]: e.target.value };
    dispatch({
      type: 'CHANGE_INPUT_VALUE',
      payload: inputValue,
    });
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log(input);
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      console.log(input);
    }

    dispatch({ type: 'VALIDATED' });
  };
  const { input, validated, show } = state;
  return (
    <RegistrationContext.Provider
      value={{
        input,
        validated,
        show,
        handleChangeInput,
        handleSubmitForm,
        handleShow,
        handleClose,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationState;
