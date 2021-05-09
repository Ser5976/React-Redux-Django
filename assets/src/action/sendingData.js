import { setFetchError } from '../store/reducers/addDataReduser';
import { ModelUrls } from '../constants/urls';
import { loadingListHouses } from '../action/houseAction';
import axios from 'axios';

// отправляем данные,полученные из addDataHouse,на сервер
export const sendData = (formData, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(ModelUrls.ITEMS, formData);
      console.log(response);
      loadingListHouses();
      history.push('/ListHousesContainer/1');
    } catch (e) {
      console.log(e);
      dispatch(setFetchError(true));
    }
  };
};
