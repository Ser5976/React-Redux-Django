import axios from 'axios';
import { ModelUrls } from '../constants/urls';
import {
  setUser,
  setFormUser,
  setWallet,
} from '../store/reducers/accountReduser'; //запись данных по пользователю в стор
import { receiveDataStorage } from '../utilities/receiveDataStorage';
import { setEditRole } from '../store/reducers/authReduser'; //редактирование статуса покупатель,продавец(в личном кабинете)

// получение данных  пользователя(user) из сервера
export const getUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
      ? getState().auth.token
      : receiveDataStorage('token');
    const userId = getState().auth.userId
      ? getState().auth.userId
      : receiveDataStorage('userId');
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
      dispatch(setWallet([...response.data.wallets])); // запись данных кашелька пользователя  в стор
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
//активация выбранного кашелька
export const activWallet = (id, bul) => {
  console.log(bul);
  return async (dispatch, getState) => {
    const walletActiv = { is_default: bul };
    const token = getState().auth.token;
    try {
      const response = await axios.patch(
        ModelUrls.WALLETS + id + '/',
        walletActiv,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      dispatch(getUser());
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
};

//удаление карты кашелька
export const deleteWallet = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await axios.delete(ModelUrls.WALLETS + id + '/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(getUser());
    } catch (e) {
      console.log(e);
    }
  };
};
// добавить новую карту в кошелёк
export const addCardWallet = (cardWallet, setShow) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(ModelUrls.WALLETS, cardWallet, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(getUser());
      setShow(false);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
};

// удаление аккаунта
export const deleteAccount = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
      ? getState().auth.token
      : receiveDataStorage('token');
    const userId = getState().auth.userId
      ? getState().auth.userId
      : receiveDataStorage('userId');
    console.log(token);
    try {
      await axios.delete(ModelUrls.USERS + userId, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
};
