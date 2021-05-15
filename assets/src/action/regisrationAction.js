import axios from 'axios';
import { AuthUrls } from '../constants/urls';
import {
  setRegistrationError, // получает данные об ошибке
  setRegistrationErrorClear, // очищает стейт с ошибкой,а также делает registrationMistake false
  setModalRegistration, //открытие и закрытие модального окна регистрации
} from '../store/reducers/registrationReduser';
import { setDataStorage } from '../utilities/setDataStorage'; // место хранение  выбирается от значения "Запомнить меня"
//эта функция лежит в utilities, она добавляет данные в localStorage или sessionStorage
import { removeDataStorage } from '../utilities/removeDataStorage'; //эта функция лежит в utilities, удаляет данные в localStorage или sessionStorage
import { setAuth } from '../store/reducers/authReduser'; //запись токена и т.д в стейт

// отправление данных регистрации на сервер,  получение токена
export const registrationAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(AuthUrls.REGISTRATION, data);
      dispatch(
        setAuth(
          response.data.key,
          response.data.username,
          response.data['user_id']
        )
      );
      setUserStorage(response.data);
      console.log(response);
      dispatch(setRegistrationErrorClear());
      dispatch(setModalRegistration(false));
    } catch (e) {
      console.log(e.response);
      dispatch(setRegistrationError(e.response.data));
    }
  };
};
// Добавление данных пользователя в LocalStorage
export const setUserStorage = (data) => {
  // место хранение токена выбирается от значения "Запомнить меня"
  //эта функция лежит в utilities, она добавляет данные в localStorage или sessionStorage
  setDataStorage('token', data.key);
  setDataStorage('userName', data.username);
  setDataStorage('userId', data['user_id']);
  setDataStorage('role', data.role);
  setDataStorage('is_admin', data['is_admin']);
};
// очистка Storage, чтобы разлогиниться
export const logout = (history) => {
  removeDataStorage('token');
  removeDataStorage('userName');
  removeDataStorage('userId');
  removeDataStorage('urlPage');
  removeDataStorage('role');
  removeDataStorage('is_admin');
  localStorage.removeItem('checkbox');
  history.push('/');
};
