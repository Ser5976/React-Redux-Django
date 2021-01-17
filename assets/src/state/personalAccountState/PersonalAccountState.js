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
  changeUser: {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    username: undefined,
    // avatar: undefined,
  },
};

const PersonalAccountState = ({ children }) => {
  const [state, dispatch] = useReducer(PersonalAccountReducer, initialState);
  const { activeUser, changeUser } = state;
  // запрос на сервер, получаем пользователя при помощи токена
  const getUser = async () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    // console.log(token);
    try {
      const response = await axios.get(ModelUrls.USERS + userId, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response);
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
    } catch (e) {
      console.log(e);
    }
  };
  //console.log(activeUser);
  // получение значений аккаунта
  const handleChangeAccount = (e) => {
    const inputValueAccount = {
      ...state.changeUser,
      [e.target.name]: e.target.value,
    };
    // console.log(inputValueAccount);
    dispatch({ type: 'CHANGE_USER', payload: inputValueAccount });
  };

  // редактирование аккаунта на сервере
  const handleSubmitAccount = async (event) => {
    event.preventDefault();
    console.log(changeUser);
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    console.log(token);
    try {
      const response = await axios.put(
        ModelUrls.USERS + userId + '/',
        changeUser,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      getUser();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PersonalAccountContext.Provider
      value={{ activeUser, getUser, handleChangeAccount, handleSubmitAccount }}
    >
      {children}
    </PersonalAccountContext.Provider>
  );
};
export default PersonalAccountState;
