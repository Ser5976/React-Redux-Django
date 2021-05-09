const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

const defaultState = {
  isFetchError: false, // вывод ошибки
};

export const addDataReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };

    default:
      return state;
  }
};
//  изменение булевого значения, если есть ошибка
export const setFetchError = (bul) => ({ type: SET_FETCH_ERROR, payload: bul });
