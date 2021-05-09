import axios from 'axios';
import { ModelUrls } from '../constants/urls';
import {
  setListHouses,
  setIsFetching,
  setSelectedHouse,
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
      console.log(response);
      dispatch(setSelectedHouse(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
