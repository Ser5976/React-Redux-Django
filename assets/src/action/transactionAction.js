import axios from 'axios';
import {
  setCurrensyRate,
  setCalculationMoney,
  setTransaction,
} from '../store/reducers/transactionReduser';
import { ModelUrls, CONVERTER, RATE } from '../constants/urls';
import { returnCopyRate } from '../utilities/rate'; // эта функция возвращает массив(см. в папке utilities)

//  получение курса валют(сайт ExchangeratesapiExchangeratesapi.io),вычесления результатов валютной пары и создание массива данных
export const currencyRate = () => {
  return async (dispatch, getState) => {
    const rate = getState().transaction.rate;
    try {
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
      );

      dispatch(setCurrensyRate(date, copiRate));
    } catch (e) {
      console.log(e);
    }
  };
};

//делаем конвертацию на transaction, если разные валюты
export const convertetTransaction = (
  currencyWallet,
  currencyHouse,
  price,
  balance
) => {
  return async (dispatch) => {
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
      try {
        // console.log(`Конвертация: ${currencyWallet} ${currencyHouse}`);
        const responseCurrency = await axios.get(
          `${RATE}&symbols=${currencyWallet},${currencyHouse}`
        ); //делаем запрос , базовая единица-валюта дома,symbols-валюта кашелька
        rateCurrencyWallet = responseCurrency.data.rates[currencyWallet]; // ставка валюты  кашелька к евро
        rateCurrencyHouse = responseCurrency.data.rates[currencyHouse]; // ставка валюты дома к евро
        rateCurrency = rateCurrencyWallet / rateCurrencyHouse; // ставка отношения валют кашелька и дома
        // console.log(rateCurrency);
        const date = responseCurrency.data.date; //какой датой брался курс валют
        const result = (price * rateCurrency).toFixed(2);
        //console.log(result);
        const remains = balance - result; //проверка достаточности  средств
        copiCalculationMoney = {
          date: date,
          result: result,
          remains: remains,
        };
        dispatch(setCalculationMoney(copiCalculationMoney, rateCurrency));
      } catch (e) {
        console.log(e);
      }
    }
  };
};
// добавляем данные для транзакции
export const addDataTransaction = (
  walletId,
  selectedHouseId,
  selectedHousePrice
) => {
  return (dispatch) => {
    const copiTransactions = {
      from_wallet: walletId,
      item: selectedHouseId,
      amount: selectedHousePrice,
    };
    console.log(copiTransactions);
    dispatch(setTransaction({ ...copiTransactions }));
  };
};
// console.log(transaction);
//добавление отношение валюты дома/на валюту кашелька в объект transaction
export const addCurrentExchange = () => {
  return (dispatch, getState) => {
    let result;
    const currencyHouseСurrencyWallet = getState().transaction
      .currencyHouseСurrencyWallet;
    const transaction = getState().transaction.transaction;
    currencyHouseСurrencyWallet
      ? (result = currencyHouseСurrencyWallet)
      : (result = 1);
    const currentExchange = { ...transaction, current_exchange: result };

    dispatch(setTransaction(currentExchange));
  };
};
//отправка данных по транзакции на сервер
export const transctionSabmit = () => {
  //console.log('транзакция');
  return async (dispatch, getState) => {
    let token = getState().auth.token;
    const transaction = getState().transaction.transaction;
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
};
