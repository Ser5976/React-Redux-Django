import axios from 'axios';
import { ModelUrls } from '../constants/urls';
import {
  setListHouses,
  setIsFetching,
  setSelectedHouse,
  setCurrencies,
} from '../store/reducers/houseReduser';

//запрос для списка домов,крутилка, обработка ошибок
export const loadingListHouses = (url = ModelUrls.ITEMS) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(url);
      console.log(response);
      dispatch(setListHouses(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
//Запрос на сервер,  при помощи id, для получения   дома для профайла
export const loadingSelectedHouse = (urlId) => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(ModelUrls.ITEMS + urlId);
      // console.log(response);
      dispatch(setSelectedHouse(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
//Получения массива валют,для выбора валюты стоимости дома
export const receiveCurrencies = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(ModelUrls.CURRENCIES, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log(response);
      dispatch(setCurrencies(response.data.results));
    } catch (e) {
      console.log(e);
    }
  };
};
