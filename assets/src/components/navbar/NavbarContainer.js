import React, { useState } from 'react';
import Navibar from './Navibar';
import { setSelectedHouseClear } from '../../store/reducers/houseReduser'; // очистка стейта selectedHouse
import RegistrationContainer from '../registration/RegistrationContainer';
import { registrationAction } from '../../action/regisrationAction'; // отправление данных регистрации на сервер,  получение токена
import { connect } from 'react-redux';

const NavbarContainer = ({
  setSelectedHouseClear,
  registrationAction,
  registrationError,
  registrationMistake,
}) => {
  const [showRegistration, setShowRegistration] = useState(false); // открытие модального окна
  const handleClose = () => setShowRegistration(false); // закрытие модального окна регистрации

  return (
    <>
      <Navibar
        setSelectedHouseClear={setSelectedHouseClear}
        setShowRegistration={setShowRegistration}
      />
      <RegistrationContainer
        show={showRegistration}
        handleClose={handleClose}
        registrationAction={registrationAction}
        registrationMistake={registrationMistake}
        registrationError={registrationError}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registrationError: state.registration.registrationError, // данные  ошибки регистрации
    registrationMistake: state.registration.registrationMistake, //есть ошибка или нет при регистрации
  };
};
export default connect(mapStateToProps, {
  setSelectedHouseClear,
  registrationAction,
})(NavbarContainer);
