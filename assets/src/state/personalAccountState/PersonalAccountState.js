import React, { useReducer } from 'react';
import axios from 'axios';
import { PersonalAccountReducer } from '../../reducers/PersonalAccountReducer';
import { PersonalAccountContext } from './PersonalAccountContext';
import { ModelUrls } from '../../constants/urls';

const initialState = {
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  username: undefined,
  avatar: undefined,
};

const PersonalAccountState = ({ children }) => {
  const [state, dispatch] = useReducer(PersonalAccountReducer, initialState);
  const { first_name, last_name, email, username, avatar } = state;
  // запрос на сервер, получаем пользователей
  const getUser = async () => {
    console.log(1);
    const response = await axios.get(ModelUrls.USERS);
    console.log(response.data);
  };
  return (
    <PersonalAccountContext.Provider value={{ getUser }}>
      {children}
    </PersonalAccountContext.Provider>
  );
};
export default PersonalAccountState;
