import { setFetchError } from '../store/reducers/addDataReduser';
import { ModelUrls } from '../constants/urls';
import { loadingListHouses } from '../action/houseAction';
import axios from 'axios';

// отправляем данные,полученные из addDataHouse,на сервер
export const sendData = (formData, history) => {
  return async (dispatch) => {
    try {
      await axios.post(ModelUrls.ITEMS, formData);
      loadingListHouses();
      history.push('/ListHousesContainer/1');
    } catch (e) {
      console.log(e);
      dispatch(setFetchError(true));
    }
  };
};

// редактирование дома
export const editData = (formData, history, id) => {
  return async (dispatch) => {
    try {
      await axios.put(ModelUrls.ITEMS + id + '/', formData);
      loadingListHouses();
      history.goBack();
    } catch (e) {
      dispatch(setFetchError(true));
    }
  };
};

// удаление дома(это простая функция)
export const deleteData = async (id, history) => {
  try {
    await axios.delete(ModelUrls.ITEMS + id);
    loadingListHouses();
    history.push('/ListHousesContainer/1');
  } catch (e) {
    console.log(e);
  }
};
