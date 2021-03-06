import React, { useEffect } from 'react';
import AddDataHouse from '../components/AddDataHouse';
import { defaultData } from '../constants/objects'; //шаблон объекта, для создания объекта с данными из формы и отправки на сервак
import { editData, sendData } from '../action/sendingData';
import { receiveCurrencies } from '../action/houseAction';
import { useHistory } from 'react-router-dom';
import { setImg } from '../store/reducers/addDataReduser';
import { receiveDataStorage } from '../utilities/receiveDataStorage';
import { connect } from 'react-redux';

const AddDataContainer = ({
  sendData, // отправляем данные,полученные из addDataHouse,на сервер
  editData, // редактирование дома
  receiveCurrencies, //Получения массива валют,для выбора валюты стоимости дома
  isFetchError, // вывод ошибки
  selectedHouse, // данные выбранного дома
  setImg, //изменение булевого значения, если выбрано фото
  img, //чтобы убрать название файла, в форме, при редактировании дома,булевое значения
  сurrencies, //массив валют
  userId,
  token,
}) => {
  const history = useHistory();

  //Получения массива валют,для выбора валюты стоимости дома
  useEffect(() => {
    let key = token ? token : receiveDataStorage('token'); // если токена нет в сторе берём в сторадж
    receiveCurrencies(key);
    // eslint-disable-next-line
  }, []);
  //отправка данных по дому из формы
  const onSubmit = (data) => {
    // console.log('Отправлено:', data);
    //создаём объект с данными по дому
    const currentData = {
      ...defaultData,
      owner: userId,
      description: data.description,
      photo: data.photo[0],
      currency: data.currency,
      price: data.price,
      status: data.status,
      house_type: data.house_type,
      address: {
        ...defaultData.address,
        country: data.country,
        city: data.city,
        street: data.street,
        house_number: data.house_number,
        zip_code: data.zip_code,
      },
    };
    // console.log(currentData);
    // т.к. в объекте есть файл, для отправки на сервер  нужно создать специальный объект при помощи new FormData()
    const formData = new FormData();

    // а это все ради вложенного объекта
    for (let key in currentData) {
      if (key === 'address') {
        let address = {};
        for (let ak in currentData.address) {
          address[ak] = currentData.address[ak];
        }
        formData.append('address', JSON.stringify(address));
      } else {
        formData.append(key, currentData[key]);
      }
    }
    // отправка данных на санки
    if (selectedHouse.id) {
      editData(formData, history, selectedHouse.id);
    } else {
      sendData(formData, history);
    }
  };

  return (
    <AddDataHouse
      onSubmit={onSubmit}
      isFetchError={isFetchError}
      selectedHouse={selectedHouse}
      setImg={setImg}
      img={img}
      сurrencies={сurrencies}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isFetchError: state.addData.isFetchError,
    selectedHouse: state.house.selectedHouse,
    img: state.addData.img,
    userId: state.auth.userId, // userId для owner
    token: state.auth.token, //токен для получения массива валют
    сurrencies: state.house.сurrencies, //массив валют
  };
};
export default connect(mapStateToProps, {
  sendData,
  editData,
  setImg,
  receiveCurrencies,
})(AddDataContainer);
