import React, { useEffect } from 'react';
import PersonalAccount from '../components/account/PersonalAccount';
import {
  getUser,
  editAccount,
  activWallet,
  deleteWallet,
  deleteAccount,
} from '../action/accountAction';
import { setFormUser } from '../store/reducers/accountReduser';
import { currencyRate } from '../action/transactionAction';
import { logout } from '../action/regisrationAction'; // очистка Storage
import { connect } from 'react-redux';

const PersonalAccountContainer = ({
  formUser,
  user,
  wallet,
  rate,
  date,
  getUser,
  setFormUser,
  editAccount,
  activWallet,
  currencyRate,
  deleteAccount,
  deleteWallet,
}) => {
  //запускаем функцию, получаем данные пользователя из сервака
  useEffect(() => {
    getUser();
    currencyRate();
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
      wallet={wallet}
      formUser={formUser}
      handleSubmit={handleSubmit}
      handleChangeAccount={handleChangeAccount}
      activWallet={activWallet}
      rate={rate}
      date={date}
      deleteAccount={deleteAccount}
      deleteWallet={deleteWallet}
      logout={logout}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    formUser: state.account.formUser, // данные пользователя( которые в форме)
    user: state.account.user, //полные данные пользователя
    wallet: state.account.wallet, //данные кашелька пользователя
    rate: state.transaction.rate, // массив данных валютных пар и результатов отношений валют
    date: state.transaction.date, // дата получения курса валют
  };
};
export default connect(mapStateToProps, {
  getUser, // получение данных пользователя(user) из сервера
  setFormUser, //запись данных пользователя(только которые в форме) в formUser, нужно для формы личного кабинета
  editAccount, //изменение учётной записи на серваке
  activWallet, //активирование выбранного кашелька
  currencyRate, //  получение курса валют(сайт ExchangeratesapiExchangeratesapi.io),вычесления результатов валютной пары и создание массива данных
  deleteAccount, //удаление аккаунта
  deleteWallet, //удаление карты кошелька
})(PersonalAccountContainer);
