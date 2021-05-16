import React, { useEffect } from 'react';
import Navibar from './Navibar';
import { setSelectedHouseClear } from '../../store/reducers/houseReduser'; // очистка стейта selectedHouse
import RegistrationContainer from '../registration/RegistrationContainer';
import { registrationAction } from '../../action/regisrationAction'; // отправление данных регистрации на сервер,  получение токена
import { setModalRegistration } from '../../store/reducers/registrationReduser'; //открывает закрывает модальное окно регистрации
import { logout } from '../../action/regisrationAction'; // очистка Storage
import { setAuth, setAuthClear } from '../../store/reducers/authReduser';
import { receiveDataStorage } from '../../utilities/receiveDataStorage'; //Получение данных  из localStorage или sessionStorage
import { connect } from 'react-redux';

const NavbarContainer = ({
  setSelectedHouseClear,
  setModalRegistration,
  registrationAction,
  registrationError,
  registrationMistake,
  setAuth, // запись данных пользователя в стор
  setAuthClear, // удаление данных пользователя из стора
  openCloseModal,
  token,
  userName,
  role,
  admin,
}) => {
  // Получение данных пользователя из Storage и запись в стор
  useEffect(() => {
    setAuth(
      receiveDataStorage('token'),
      receiveDataStorage('userName'),
      receiveDataStorage('userId'),
      receiveDataStorage('role'),
      receiveDataStorage('is_admin')
    );
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navibar
        setSelectedHouseClear={setSelectedHouseClear} // очистить selectedHouse(выбранный дом)
        setModalRegistration={setModalRegistration} //открытие или закрытие модального окна регистрации
        logout={logout} // очистка Storage
        token={token} //токен
        userName={userName} //логин
        role={role} //роль
        admin={admin} //администратор
        setAuthClear={setAuthClear} // удаление данных пользователя из стора
      />
      <RegistrationContainer
        openCloseModal={openCloseModal}
        setModalRegistration={setModalRegistration} //открытие или закрытие модального окна регистрации
        registrationAction={registrationAction} // отправление данных регистрации на сервер,  получение токена
        registrationMistake={registrationMistake} //есть ошибка или нет при регистрации
        registrationError={registrationError} //получает данные об ошибке
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registrationError: state.registration.registrationError, // данные  ошибки регистрации
    registrationMistake: state.registration.registrationMistake, //есть ошибка или нет при регистрации
    openCloseModal: state.registration.openCloseModal, //открыть закрыть модальное окно регистрации
    token: state.auth.token, //токен
    userName: state.auth.userName, //логин
    role: state.auth.role, // роль
    admin: state.auth.admin, //администратор
  };
};
export default connect(mapStateToProps, {
  setSelectedHouseClear,
  registrationAction,
  setModalRegistration,
  setAuth,
  setAuthClear,
})(NavbarContainer);
