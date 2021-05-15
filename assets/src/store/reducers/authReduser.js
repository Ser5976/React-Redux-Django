const SET_AUTH = 'SET_AUTH';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_PATHNAME = 'SET_PATHNAME';
const SET_AUTH_CLEAR = 'SET_AUTH_CLEAR';

const defaultState = {
  authError: false, // ошибка
  pathname: '/', // записываем путь последнего клика
  token: null,
  userName: null,
  userId: null,
};

export const authReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        token: action.token,
        userName: action.userName,
        userId: action.userId,
      };
    case SET_AUTH_CLEAR:
      return {
        ...state,
        token: null,
        userName: null,
        userId: null,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: true,
      };
    case SET_PATHNAME:
      return {
        ...state,
        pathname: action.payload,
      };
    default:
      return state;
  }
};
//запись данных пользователя в стор
export const setAuth = (token, userName, userId) => ({
  type: SET_AUTH,
  token,
  userName,
  userId,
});
// удаление данных пользователя из стора
export const setAuthClear = () => ({
  type: SET_AUTH_CLEAR,
});
//  активация ошибки при авторизации
export const setAuthError = (bul) => ({
  type: SET_AUTH_ERROR,
  payload: bul,
});
// запись пути к последнему клику
export const setPathname = (pathname) => ({
  type: SET_PATHNAME,
  payload: pathname,
});
