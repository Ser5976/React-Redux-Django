const SET_REGISTRATION_ERROR = 'SET_REGISTRATION_ERROR';
const SET_REGISTRATION_ERROR_CLEAR = 'SET_REGISTRATION_ERROR_CLEAR';
const SET_MODAL_REGISTRATION = 'SET_MODAL_REGISTRATION';

const defaultState = {
  registrationError: {}, //вывод данных по ошибки
  registrationMistake: false, // есть ошибка или нет
  openCloseModal: false, //открыть закрыть модальное окно регистрации
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
    case SET_MODAL_REGISTRATION:
      return {
        ...state,
        openCloseModal: action.payload,
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
//открывает закрывает модальное окно регистрации
export const setModalRegistration = (bul) => ({
  type: SET_MODAL_REGISTRATION,
  payload: bul,
});
