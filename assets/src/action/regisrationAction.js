import axios from 'axios';
import { AuthUrls } from '../constants/urls';
import {
  setRegistrationError,
  setRegistrationErrorClear,
} from '../store/reducers/registrationReduser';

// отправление данных регистрации на сервер,  получение токена
export const registrationAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(AuthUrls.REGISTRATION, data);
      console.log(response);
      dispatch(setRegistrationErrorClear());
    } catch (e) {
      console.log(e.response);
      dispatch(setRegistrationError(e.response.data));
    }
  };
};

// try {
//     const response = await axios.post(AuthUrls.REGISTRATION, activeUsers);
//     console.log(response);
//     setUserStorage(response.data);
//     dispatch({ type: 'SHOW_CLOSE' });
//   } catch (e) {
//     let err = e.response.data;
//     console.log(err);

//     dispatch({ type: 'REGISTRATION_MISTAKE' });
//     dispatch({ type: 'REGISTRATION_ERROR', payload: err });
//     //  console.log(registrationError);
//     // console.log(registrationMistake);
//   }
