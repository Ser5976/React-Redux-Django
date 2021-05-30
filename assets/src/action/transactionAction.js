import axios from 'axios';
import { setCurrensyRate } from '../store/reducers/transactionReduser';
import { CONVERTER } from '../constants/urls';
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
