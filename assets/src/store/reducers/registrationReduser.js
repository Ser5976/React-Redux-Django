const SET_REGISTRATION_ERROR = 'SET_REGISTRATION_ERROR';
const SET_REGISTRATION_ERROR_CLEAR = 'SET_REGISTRATION_ERROR_CLEAR';

const defaultState = {
  registrationError: {}, //вывод данных по ошибки
  registrationMistake: false, // есть ошибка или нет
};

export const registrationReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_REGISTRATION_ERROR:
      return {
        ...state,
        registrationMistake: true,
        registrationError: {
          ...state.registrationError,
          ...action.payload,
        },
      };
    case SET_REGISTRATION_ERROR_CLEAR:
      return {
        ...state,
        registrationMistake: false,
        registrationError: action.payload,
      };

    default:
      return state;
  }
};
// для получение данных о ошибке
export const setRegistrationError = (error) => ({
  type: SET_REGISTRATION_ERROR,
  payload: error,
});
// Очистка данных об ошибке
export const setRegistrationErrorClear = () => ({
  type: SET_REGISTRATION_ERROR_CLEAR,
  payload: {},
});
