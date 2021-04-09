import React, { useReducer } from 'react';
import axios from 'axios';
import { PersonalAccountReducer } from '../../reducers/PersonalAccountReducer';
import { PersonalAccountContext } from './PersonalAccountContext';
import { ModelUrls, RATE } from '../../constants/urls';
import { receiveDataStorage } from '../../utilities/receiveDataStorage';
import { returnRate, returnCopyRate } from '../../utilities/rate';

console.log(returnRate());

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

  rate: returnRate(), // эта функция возвращает массив(см. в папке utilities)

  currencyHouseСurrencyWallet: null, //отношение валюты дома/на валюту кашелька, чтобы потом использовать в addDataTransaction

  calculationMoney: {}, // для конвертацию на transaction, если разные валюты
  transaction: {}, //данные по транзакции
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
    calculationMoney,
    transaction,
    currencyHouseСurrencyWallet,
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
    let token = receiveDataStorage('token');
    let userId = receiveDataStorage('userId');
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
  const currencyRate = async (CONVERTER) => {
    const response = await axios.get(CONVERTER);
    console.log(response.data);
    const date = response.data.date;
    console.log(date);
    const eurUsd = response.data.rates.USD.toFixed(2);
    const eurRub = response.data.rates.RUB.toFixed(2);
    const rubEur = (1 / eurRub).toFixed(4);
    const usdEur = (1 / eurUsd).toFixed(4);
    const usdRub = (eurRub / eurUsd).toFixed(2);
    const rubUsd = (eurUsd / eurRub).toFixed(4);

    const copiRate = returnCopyRate(
      rate,
      eurUsd,
      usdEur,
      eurRub,
      rubEur,
      usdRub,
      rubUsd
    ); // эта функция возвращает массив(см. в папке utilities)

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
  //делаем конвертацию на transaction, если разные валюты
  const convertetTransaction = async (
    currencyWallet,
    currencyHouse,
    price,
    balance
  ) => {
    let rateCurrency;
    let rateCurrencyWallet;
    let rateCurrencyHouse;
    let copiCalculationMoney = {};
    if (currencyHouse === currencyWallet) {
      const remains = balance - price; ////проверка достаточности  средств
      copiCalculationMoney = {
        remains: remains,
      };
    } else {
      // console.log(`Конвертация: ${currencyWallet} ${currencyHouse}`);
      const responseCurrency = await axios.get(
        `${RATE}&symbols=${currencyWallet},${currencyHouse}`
      ); //делаем запрос , базовая единица-валюта дома,symbols-валюта кашелька
      rateCurrencyWallet = responseCurrency.data.rates[currencyWallet]; // ставка валюты  кашелька к евро
      rateCurrencyHouse = responseCurrency.data.rates[currencyHouse]; // ставка валюты дома к евро
      rateCurrency = rateCurrencyWallet / rateCurrencyHouse; // ставка отношения валют кашелька и дома
      console.log(rateCurrency);

      const date = responseCurrency.data.date; //какой датой брался курс валют
      const result = (price * rateCurrency).toFixed(2);
      //console.log(result);
      const remains = balance - result; //проверка достаточности  средств
      copiCalculationMoney = {
        date: date,
        result: result,
        remains: remains,
      };
    }
    dispatch({
      type: 'CALCULATION_MONEY',
      payload: { ...copiCalculationMoney },
      rateCurrency: rateCurrency, //// отношение валюты дома/на валюту кашелька сохраняем в стейте,чтобы потом использовать в addDataTransaction
    });
  };
  // console.log(calculationMoney);
  // console.log(currencyHouseСurrencyWallet);
  // добавить данные для транзакции
  const addDataTransaction = (
    walletId,
    itemCardId,
    // itemCardCurrency,
    itemCardPrice
  ) => {
    const copiTransactions = {
      from_wallet: walletId,
      item: itemCardId,
      amount: itemCardPrice,
    };
    console.log(copiTransactions);
    dispatch({ type: 'TRANSACTION', payload: { ...copiTransactions } });
  };
  // console.log(transaction);

  //добавление отношение валюты дома/на валюту кашелька в объект transaction
  const addCurrentExchange = () => {
    let result;
    currencyHouseСurrencyWallet
      ? (result = currencyHouseСurrencyWallet)
      : (result = 1);
    const currentExchange = { ...transaction, current_exchange: result };

    dispatch({ type: 'TRANSACTION', payload: { ...currentExchange } });
  };
  console.log(transaction);
  //отправка данных по транзакции на сервер
  const transctionSabmit = async () => {
    console.log('транзакция');
    let token = receiveDataStorage('token');
    try {
      const response = await axios.post(ModelUrls.TRANSACTION, transaction, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
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
        calculationMoney,
        getUser,
        handleChangeAccount,
        handleSubmitAccount,
        handleChangeAvatar,
        currencyRate,
        chooseWallet,
        convertetTransaction,
        transctionSabmit,
        addDataTransaction,
        addCurrentExchange,
      }}
    >
      {children}
    </PersonalAccountContext.Provider>
  );
};
export default PersonalAccountState;
