import React from 'react';

const RegistrationError = ({ registrationError }) => {
  return (
    <>
      {registrationError.email && registrationError.username ? (
        <div className="text-center text-danger pt-3">
          Пользователь и email уже существует
        </div>
      ) : registrationError.username ? (
        <div className="text-center text-danger pt-3">
          Пользователь с этим именем уже существует
        </div>
      ) : registrationError.email ? (
        <div className="text-center text-danger pt-3">
          Данный email уже существует
        </div>
      ) : (
        <div className="text-center text-danger pt-3">Что-то пошло не так</div>
      )}
    </>
  );
};
export default RegistrationError;
