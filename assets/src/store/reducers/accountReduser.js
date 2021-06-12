const SET_USER = 'SET_USER';
const SET_FORM_USER = 'SET_FORM_USER';
const CLEAR_FORM_USER = 'CLEAR_FORM_USER';
const SET_WALLET = 'SET_WALLET';
const SET_USER_HOUSES = 'SET_USER_HOUSES';
const IS_FETCHING = 'IS_FETCHING';

const defaultState = {
  user: {}, // все данные пользователя
  formUser: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    role: '',
  }, //данные пользователя(только, которые в форме) в formUser, нужно для формы личного кабинета
  wallet: [], //данные кашелка пользователя
  userHouses: [], // список домов пользователя
  isFetching: true, // для крутёлки
};

export const accountReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_FORM_USER:
      return {
        ...state,
        formUser: action.payload,
      };
    case CLEAR_FORM_USER:
      return {
        ...state,
        formUser: {
          ...state.formUser,
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          role: '',
        },
      };
    case SET_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    case SET_USER_HOUSES:
      return {
        ...state,
        userHouses: action.payload,
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
// запись данных(все данные) пользователя в стор
export const setUser = (data) => ({ type: SET_USER, payload: data });
//запись данных пользователя(только, которые в форме) в formUser, нужно для формы личного кабинета
export const setFormUser = (data) => ({ type: SET_FORM_USER, payload: data });
//очистка formUser(данных пользователя которые в форме)
export const clearFormUser = () => ({ type: CLEAR_FORM_USER });
//запись данных кашелка пользователя
export const setWallet = (data) => ({ type: SET_WALLET, payload: data });
// запись списка домов пользователя
export const setUserHouses = (data) => ({
  type: SET_USER_HOUSES,
  payload: data,
});
//для крутёлки
export const setIsFetching = (bul) => ({ type: IS_FETCHING, payload: bul });
