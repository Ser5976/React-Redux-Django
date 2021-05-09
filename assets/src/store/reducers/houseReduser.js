const SET_LIST_HOUSES = 'SET_LIST_HOUSES';
const IS_FETCHING = 'IS_FETCHING';
const SET_SELECTED_HOUSE = 'SET_SELECTED_HOUSE';

const defaultState = {
  //получение  списка домов
  listHouses: [],
  // получение выбранного дома
  selectedHouse: {},
  // для крутёлки
  isFetching: true,
  // количество элементов всего, для пагинации
  сount: 0,
  //количество элементов на странице
  pageSize: 3,
};

export const houseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LIST_HOUSES:
      return {
        ...state,
        listHouses: action.payload.results,
        count: action.payload.count,
        isFetching: false,
      };
    case SET_SELECTED_HOUSE:
      return {
        ...state,
        selectedHouse: action.payload,
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
//Экшены
// получение списка домов
export const setListHouses = (data) => ({
  type: SET_LIST_HOUSES,
  payload: data,
});
// получение выбранного дома
export const setSelectedHouse = (data) => ({
  type: SET_SELECTED_HOUSE,
  payload: data,
});
//для крутёлки
export const setIsFetching = (bul) => ({ type: IS_FETCHING, payload: bul });
