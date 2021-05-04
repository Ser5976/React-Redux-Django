import axios from 'axios';
import {
  setListHouses,
  setIsFetching,
} from '../store/reducers/listHousesReduser';

//запрос для списка домов,крутилка, обработка ошибок
export const loadingListHouses = (url) => {
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
