

// Получение данных пользователя из LocalStorage
export  const receiveUserLocalStorage = (dispatch) => {
    let token = localStorage.getItem('token');
    let userName = localStorage.getItem('userName');
    let userId = localStorage.getItem('userId');
    dispatch({ type: 'AUTH', payload: token, userName: userName, userId: userId });
    return true;
};