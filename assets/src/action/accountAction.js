import axios from 'axios';
import { ModelUrls } from '../constants/urls';
import { setUser, setFormUser } from '../store/reducers/accountReduser'; //запись данных по пользователю в стор
import { setEditRole } from '../store/reducers/authReduser'; //редактирование статуса покупатель,продавец(в личном кабинете)

// получение данных  пользователя(user) из сервера
export const getUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // при помощи getState() мы можем получать данные из стора
    try {
      const response = await axios.get(ModelUrls.USERS + userId, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log(response);
      // console.log(token);
      //console.log(userId);
      dispatch(setUser(response.data)); // запись данных(все данные) пользователя в стор
      const formUser = getState().account.formUser;
      const user = {
        ...formUser,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      };
      dispatch(setFormUser(user)); //запись данных пользователя(только, которые в форме) в formUser нужно для формы личного кабинета
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
};

//изменение учётной записи на серваке
export const editAccount = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await axios.patch(ModelUrls.USERS + userId + '/', data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(setEditRole(response.data.role));
      dispatch(getUser());
    } catch (e) {
      console.log(e);
    }
  };
};
