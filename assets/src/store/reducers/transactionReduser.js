import { returnRate } from '../../utilities/rate'; //возвращает массив c парами валют(см. в папке utilities)

const SET_CURRENCY_RATE = 'SET_CURRENCY_RATE';
const SET_SELECTED_WALLET = 'SET_SELECTED_WALLET';
const SET_CALCULATION_MONEY = 'SET_CALCULATION_MONEY';
const SET_TRANSACTION = 'SET_TRANSACTION';

const defaultState = {
  date: '', //дата получения курса валют
  rate: returnRate(), //  массив данных валютных пар и результатов отношений валют
  selectedWallet: {}, // выбранный кошелёк пользователя, используем в transaction

  currencyHouseСurrencyWallet: null, //отношение валюты дома/на валюту кашелька, чтобы потом использовать в addDataTransaction
  calculationMoney: {}, // для конвертацию на transaction, если разные валюты
  transaction: {}, //данные по транзакции
};

export const transactionReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENCY_RATE:
      return {
        ...state,
        date: action.date,
        rate: action.rate,
      };
    case SET_SELECTED_WALLET:
      return {
        ...state,
        selectedWallet: action.payload,
      };
    case SET_CALCULATION_MONEY:
      return {
        ...state,
        calculationMoney: action.calculationMoney,
        currencyHouseСurrencyWallet: action.rateCurrency,
      };
    case SET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
};
// запись отношения пар валют а также даты
export const setCurrensyRate = (date, rate) => ({
  type: SET_CURRENCY_RATE,
  date,
  rate,
});
//запись выбранного кашелька в ProfileModalWallet
export const setSelectedWallet = (wallet) => ({
  type: SET_SELECTED_WALLET,
  payload: wallet,
});
//запись объекта calculationMoney и currencyHouseСurrencyWallet(отношение валюты дома/на валюту кашелька)
export const setCalculationMoney = (calculationMoney, rateCurrency) => ({
  type: SET_CALCULATION_MONEY,
  calculationMoney,
  rateCurrency,
});
//запись данных в объект transaction
export const setTransaction = (transaction) => ({
  type: SET_TRANSACTION,
  payload: transaction,
});
