const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
const SET_IMG = 'SET_IMG';

const defaultState = {
  isFetchError: false, // вывод ошибки
  img: true, //чтобы убрать название файла, в форме, при редактировании дома
};

export const addDataReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };
    case SET_IMG:
      return {
        ...state,
        img: action.payload,
      };

    default:
      return state;
  }
};
//  изменение булевого значения, если есть ошибка
export const setFetchError = (bul) => ({ type: SET_FETCH_ERROR, payload: bul });
//изменение булевого значения, если выбрано фото
export const setImg = (bul) => ({ type: SET_IMG, payload: bul });
