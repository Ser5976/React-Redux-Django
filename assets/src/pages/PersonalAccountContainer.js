import React, { useEffect } from 'react';
import PersonalAccount from '../components/account/PersonalAccount';
import { getUser, editAccount } from '../action/accountAction';
import { setFormUser } from '../store/reducers/accountReduser';
import { connect } from 'react-redux';

const PersonalAccountContainer = ({
  formUser,
  user,
  getUser,
  setFormUser,
  editAccount,
}) => {
  //запускаем функцию, получаем данные пользователя из сервака
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  // получение значений из формы и запись их в стор в formUser(для контроля за формой, а так же подготовка объекта для отправки на сервак)
  const handleChangeAccount = (e) => {
    const inputValueAccount = {
      ...formUser,
      [e.target.name]: e.target.value,
    };
    setFormUser(inputValueAccount);
    // console.log(inputValueAccount);
  };
  // отправка formUser на сервак
  const handleSubmit = (e) => {
    e.preventDefault();
    editAccount(formUser);
  };

  return (
    <PersonalAccount
      user={user}
      formUser={formUser}
      handleSubmit={handleSubmit}
      handleChangeAccount={handleChangeAccount}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    formUser: state.account.formUser, // данные пользователя( которые в форме)
    user: state.account.user, //полные данные пользователя
  };
};
export default connect(mapStateToProps, {
  getUser, // получение данных пользователя(user) из сервера
  setFormUser, //запись данных пользователя(только которые в форме) в formUser, нужно для формы личного кабинета
  editAccount, //изменение учётной записи на серваке
})(PersonalAccountContainer);
