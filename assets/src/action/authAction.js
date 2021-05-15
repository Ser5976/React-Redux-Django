import axios from 'axios';
import { AuthUrls } from '../constants/urls';
import { setUserStorage } from '../action/regisrationAction'; // Добавление данных пользователя в LocalStorage
import {
  setPathname, // запись пути к последнему клику
  setAuthError, //  активация ошибки при авторизации
  setAuth, //запись токена и т.д. в стейт
} from '../store/reducers/authReduser';

// отправление данных авторизации на сервер,  получение токена и т.д.
export const authAction = (data, history, pathname) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(AuthUrls.LOGIN, data);
      dispatch(
        setAuth(
          response.data.key,
          response.data.username,
          response.data['user_id']
        )
      );
      setUserStorage(response.data);
      console.log(response);
      history.push(pathname);
    } catch (e) {
      console.log(e);
      dispatch(setAuthError(true));
    }
  };
};

// Запомнить последний клик
export const rememberLastEvent = (e) => {
  console.log(e);
  let pathname = e.target.pathname;
  console.log(pathname);
  if (pathname === undefined) {
    pathname = e.target.parentElement.pathname;
  }
  return (dispatch) => {
    dispatch(setPathname(pathname));
  };
};
