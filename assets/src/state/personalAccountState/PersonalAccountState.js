import React, { useReducer } from 'react';
import axios from 'axios';
import { PersonalAccountReducer } from '../../reducers/PersonalAccountReducer';
import { PersonalAccountContext } from './PersonalAccountContext';
import { ModelUrls } from '../../constants/urls';

const initialState = {
  activeUser: {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    username: undefined,
    // avatar: undefined,
  },
};

const PersonalAccountState = ({ children }) => {
  const [state, dispatch] = useReducer(PersonalAccountReducer, initialState);
  const { activeUser } = state;
  // запрос на сервер, получаем пользователя при помощи токена
  const getUser = async () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    // console.log(token);
    const response = await axios.get(ModelUrls.USERS + userId, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const { first_name, last_name, email, username } = response.data;
    // если ключ и значение совпадают (email:email), можем писать email
    const user = {
      ...activeUser,
      first_name,
      last_name,
      username,
      email,
    };

    dispatch({ type: 'USER', payload: user });
  };
  //console.log(activeUser);
  return (
    <PersonalAccountContext.Provider value={{ activeUser, getUser }}>
      {children}
    </PersonalAccountContext.Provider>
  );
};
export default PersonalAccountState;
