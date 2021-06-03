import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadingSelectedHouse } from '../action/houseAction';
import ProfileHouse from '../components/house/ProfileHouse';
import ProfileModalWallet from '../components/house/ProfileModalWallet';
import Transaction from '../components/house/Transaction';
import { getUser } from '../action/accountAction';
import {
  convertetTransaction,
  addDataTransaction,
  addCurrentExchange,
  transctionSabmit,
} from '../action/transactionAction';
import { setImg } from '../store/reducers/addDataReduser'; //чтобы убрать название файла, в форме, при редактировании дома
import { setSelectedWallet } from '../store/reducers/transactionReduser'; //запись выбранного кашелька в ProfileModalWallet
import { connect } from 'react-redux';

const ProfileHouseContainer = ({
  loadingSelectedHouse, //запрос для списка домов
  getUser, // получение данных  пользователя(user) из сервера
  selectedHouse, // данные выбранного дома
  selectedWallet, // выбранный кошелёк пользователя, используем в transaction
  setSelectedWallet, //запись выбранного кашелька в ProfileModalWallet
  convertetTransaction, //делаем конвертацию на transaction, если разные валюты
  addDataTransaction, // добавляем данные для транзакции
  addCurrentExchange, //добавление отношение валюты дома/на валюту кашелька в объект transaction
  calculationMoney, // для конвертацию на transaction, если разные валюты
  transctionSabmit, //отправка данных по транзакции на сервер
  wallet, ////данные кашелка пользователя
  setImg,
  userId, //чтобы распознать кто владелец
}) => {
  const { urlId } = useParams(); //  хук роутера ,который помогает получить значение params
  // console.log(selectedHouse);

  useEffect(() => {
    loadingSelectedHouse(urlId);
    getUser();
    // eslint-disable-next-line
  }, []);
  const [show, setShow] = useState(false); // для открытия модального окна ProfileModalWallet
  const openWallet = () => {
    setShow(!show);
  }; // открытие  модального окна ProfileModalWallet
  const closeWalet = () => {
    setShow(!show);
  }; //закрытие модального окна ProfileModalWallet
  const [open, setOpen] = useState(false); // для открытия модального окна Transaction
  const showTransaction = () => {
    setOpen(!open);
  }; //открытие модального окна Transaction
  const closeTransaction = () => {
    setOpen(!open);
  }; //закрытие модального окна Transaction

  return (
    <>
      <ProfileHouse
        selectedHouse={selectedHouse}
        setImg={setImg}
        userId={userId}
        openWallet={openWallet}
      />
      <ProfileModalWallet
        wallet={wallet}
        show={show}
        closeWalet={closeWalet}
        selectedHouse={selectedHouse}
        setSelectedWallet={setSelectedWallet}
        convertetTransaction={convertetTransaction}
        addDataTransaction={addDataTransaction}
        addCurrentExchange={addCurrentExchange}
        showTransaction={showTransaction}
      />
      <Transaction
        open={open}
        closeTransaction={closeTransaction}
        selectedWallet={selectedWallet}
        selectedHouse={selectedHouse}
        calculationMoney={calculationMoney}
        transctionSabmit={transctionSabmit}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedHouse: state.house.selectedHouse,
    selectedWallet: state.transaction.selectedWallet,
    userId: state.auth.userId,
    wallet: state.account.wallet,
    calculationMoney: state.transaction.calculationMoney,
  };
};
export default connect(mapStateToProps, {
  loadingSelectedHouse,
  setImg,
  getUser,
  setSelectedWallet,
  convertetTransaction,
  addDataTransaction,
  addCurrentExchange,
  transctionSabmit,
})(ProfileHouseContainer);
