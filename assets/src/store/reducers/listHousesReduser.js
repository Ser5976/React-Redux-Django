const SET_LIST_HOUSES = 'SET_LIST_HOUSES';
const IS_FETCHING = 'IS_FETCHING';

const defaultState = {
  //получение  списка домов
  listHouses: [],
  // для крутёлки
  isFetching: true,
  // количество элементов всего, для пагинации
  сount: 0,
  //количество элементов на странице
  pageSize: 3,
};

export const listHousesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LIST_HOUSES:
      return {
        ...state,
        listHouses: action.payload.results,
        count: action.payload.count,
        isFetching: false,
      };
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };

    default:
      return state;
  }
};
// получение списка домов
export const setListHouses = (data) => ({
  type: SET_LIST_HOUSES,
  payload: data,
});
//для крутёлки
export const setIsFetching = (bul) => ({ type: IS_FETCHING, payload: bul });
