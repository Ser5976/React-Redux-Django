import { returnRate } from '../../utilities/rate'; //возвращает массив c парами валют(см. в папке utilities)

const SET_CURRENCY_RATE = 'SET_CURRENCY_RATE';

const defaultState = {
  date: '', //дата получения курса валют
  rate: returnRate(), // // массив данных валютных пар и результатов отношений валют
};

export const transactionReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENCY_RATE:
      return {
        ...state,
        date: action.date,
        rate: action.rate,
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
