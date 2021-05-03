import axios from 'axios';
import { ModelUrls } from '../constants/urls';
import {
  setListHouses,
  setIsFetching,
  setFetchError,
} from '../store/reducers/listHousesReduser';

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
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};
