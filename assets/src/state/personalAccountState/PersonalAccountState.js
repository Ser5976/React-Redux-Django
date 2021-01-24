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
    avatar: undefined,
    role: undefined,
  },
  changeUser: {},
};

const PersonalAccountState = ({ children }) => {
  const [state, dispatch] = useReducer(PersonalAccountReducer, initialState);
  const { activeUser, changeUser } = state;
  // запрос на сервер, получаем пользователя при помощи токена
  const getUser = async () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    try {
      const response = await axios.get(ModelUrls.USERS + userId, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response);
      const {
        first_name,
        last_name,
        email,
        username,
        role,
        avatar,
      } = response.data;
      // если ключ и значение совпадают (email:email), можем писать email
      const user = {
        ...activeUser,
        first_name,
        last_name,
        username,
        email,
        role,
        avatar,
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
  //получение значения avatara
  const handleChangeAvatar = (file) => {
    const img = { ...state.changeUser, avatar: file };
    console.log(img);
    dispatch({
      type: 'AVATAR',
      payload: img,
    });
  };
  console.log(changeUser);
  // Очистка changeUser
  const clearChageUser = () => {
    let clearUser = {};
    dispatch({ type: 'CLEAR_CHAGE_USER', payload: clearUser });
  };
  // редактирование аккаунта на сервере
  const handleSubmitAccount = async (event) => {
    event.preventDefault();
    console.log(changeUser);
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    console.log(token);
    // добавляем наш объект в new FormData при помощи append, это поможет нам отправить файл с аватаром на сервер
    let userFormData = new FormData();
    for (let key in changeUser) {
      userFormData.append(key, changeUser[key]);
    }
    console.log(userFormData);
    for (let pair of userFormData.entries()) {
      console.log(pair[0] + ',' + pair[1]);
    }
    try {
      const response = await axios.patch(
        ModelUrls.USERS + userId + '/',
        userFormData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      getUser();
      clearChageUser();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PersonalAccountContext.Provider
      value={{
        activeUser,
        changeUser,
        getUser,
        handleChangeAccount,
        handleSubmitAccount,
        handleChangeAvatar,
      }}
    >
      {children}
    </PersonalAccountContext.Provider>
  );
};
export default PersonalAccountState;
