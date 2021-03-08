import React, { useReducer } from 'react';
import axios from 'axios';
import { PersonalAccountReducer } from '../../reducers/PersonalAccountReducer';
import { PersonalAccountContext } from './PersonalAccountContext';
import { ModelUrls } from '../../constants/urls';
import { receiveDataStorage } from '../../utilities/receiveDataStorage';

const initialState = {
  activeUser: {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    username: undefined,
    avatar: undefined,
    role: undefined,
  },
  formUser: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    avatar: '',
    role: '',
  },
  changeUser: {},
  wallet: [],
  selectedWallet: {},
  date: '',

  rate: [
    {
      nameCouple1: 'EUR/USD',
      nameCouple2: 'USD/EUR',
      couple1: null,
      couple2: null,
    },
    {
      nameCouple1: 'EUR/RUB',
      nameCouple2: 'RUB/EUR',
      couple1: null,
      couple2: null,
    },
    {
      nameCouple1: 'USD/RUB',
      nameCouple2: 'RUB/USD',
      couple1: null,
      couple2: null,
    },
  ],
};

const PersonalAccountState = ({ children }) => {
  const [state, dispatch] = useReducer(PersonalAccountReducer, initialState);
  const {
    activeUser,
    changeUser,
    formUser,
    wallet,
    date,
    rate,
    selectedWallet,
  } = state;
  // запрос на сервер, получаем пользователя при помощи токена
  const getUser = async () => {
    let token = receiveDataStorage('token');
    let userId = receiveDataStorage('userId');
    try {
      const response = await axios.get(ModelUrls.USERS + userId, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
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
      //получим значение wallet
      const cash = [...response.data.wallets];
      // console.log(cash);
      dispatch({ type: 'USER', payload: user });
      dispatch({ type: 'FORM_USER', payload: user });
      dispatch({ type: 'WALLET', payload: cash });
    } catch (e) {
      console.log(e);
    }
  };

  // получение значений аккаунта
  // для changeUser
  const handleChangeAccount = (e) => {
    const inputValueAccount = {
      ...state.changeUser,
      [e.target.name]: e.target.value,
    };
    // для formUser
    const inputValueFormAccount = {
      ...state.formUser,
      [e.target.name]: e.target.value,
    };
    // console.log(inputValueAccount);
    dispatch({ type: 'CHANGE_USER', payload: inputValueAccount });
    dispatch({ type: 'CHANGE_FORM_USER', payload: inputValueFormAccount });
  };
  //получение значения avatara
  const handleChangeAvatar = (file) => {
    const img = { ...state.changeUser, avatar: file };
    const imgForm = { ...state.formUser, avatar: file };
    //console.log(imgForm);
    dispatch({
      type: 'AVATAR',
      payload: img,
    });
    dispatch({
      type: 'AVATAR_FORM',
      payload: imgForm,
    });
  };
  //console.log(changeUser);
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
    // console.log(token);
    // добавляем наш объект в new FormData при помощи append, это поможет нам отправить файл с аватаром на сервер
    let userFormData = new FormData();
    for (let key in changeUser) {
      userFormData.append(key, changeUser[key]);
    }
    // console.log(userFormData);
    /* for (let pair of userFormData.entries()) {
      console.log(pair[0] + ',' + pair[1]);
    } */
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
  // получение курса валют
  const currencyRate = async (EUR, USD) => {
    const responseUsd = await axios.get(USD);
    const responseEur = await axios.get(EUR);
    const date = responseUsd.data.date;
    //  console.log(responseUsd.data.rates);
    // console.log(responseEur.data.rates);
    const usdEur = responseUsd.data.rates.EUR.toFixed(2);
    const usdRub = responseUsd.data.rates.RUB.toFixed(2);
    const eurUsd = responseEur.data.rates.USD.toFixed(2);
    const eurRub = responseEur.data.rates.RUB.toFixed(2);

    const rubUsd = (1 / usdRub).toFixed(4);
    const rubEur = (1 / eurRub).toFixed(4);

    const copiRate = [
      {
        ...rate[0],
        nameCouple1: 'EUR/USD',
        nameCouple2: 'USD/EUR',
        couple1: eurUsd,
        couple2: usdEur,
      },

      {
        ...rate[1],
        nameCouple1: 'EUR/RUB',
        nameCouple2: 'RUB/EUR',
        couple1: eurRub,
        couple2: rubEur,
      },
      {
        ...rate[2],
        nameCouple1: 'USD/RUB',
        nameCouple2: 'RUB/USD',
        couple1: usdRub,
        couple2: rubUsd,
      },
    ];

    dispatch({
      type: 'CURRENCY_RATE',
      date,
      payload: copiRate,
    });
  };
  // вибираем кошелёк(ProfileModalWallet)
  const chooseWallet = (money) => {
    dispatch({ type: 'SELECTED_WALLET', payload: money });
  };
  // console.log(selectedWallet);
  return (
    <PersonalAccountContext.Provider
      value={{
        activeUser,
        changeUser,
        formUser,
        wallet,
        date,
        rate,
        selectedWallet,
        getUser,
        handleChangeAccount,
        handleSubmitAccount,
        handleChangeAvatar,
        currencyRate,
        chooseWallet,
      }}
    >
      {children}
    </PersonalAccountContext.Provider>
  );
};
export default PersonalAccountState;
