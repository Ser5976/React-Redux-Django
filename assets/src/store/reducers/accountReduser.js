const SET_USER = 'SET_USER';
const SET_FORM_USER = 'SET_FORM_USER';
const CLEAR_FORM_USER = 'CLEAR_FORM_USER';
const SET_WALLET = 'SET_WALLET';

const defaultState = {
  user: {},
  formUser: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    role: '',
  },
  wallet: [],
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
