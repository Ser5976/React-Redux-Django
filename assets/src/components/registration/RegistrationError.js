import React from 'react';

const RegistrationError = ({ registrationError }) => {
  return (
    <>
      {registrationError.email && registrationError.username ? (
        <h8 className="text-center text-danger pt-3">
          Пользователь и email уже существует
        </h8>
      ) : registrationError.username ? (
        <h8 className="text-center text-danger pt-3">
          Пользователь с этим именем уже существует
        </h8>
      ) : registrationError.email ? (
        <h8 className="text-center text-danger pt-3">
          Данный email уже существует
        </h8>
      ) : (
        <h8 className="text-center text-danger pt-3">Что-то пошло не так</h8>
      )}
    </>
  );
};
export default RegistrationError;
