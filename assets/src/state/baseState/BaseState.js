import React, { useReducer } from 'react';
import axios from 'axios';
import { BaseContext } from './BaseContext';
import { ModelUrls } from '../../constants/urls';
import { itemReducer } from '../../reducers/reducers';

const initialState = {
  itemCard: {},
  itemList: [],
  validated: false,
  bug: null,
  image: false,
  activeItem: {
    description: '',
    photo: undefined,
    price: '',
    status: undefined,
    house_type: undefined,
    address: {
      country: '',
      city: '',
      street: '',
      house_number: '',
      zip_code: '',
    },
  },
};

const BaseState = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  //запрос на сервер , получаем список домов
  const refreshList = async () => {
    const response = await axios.get(ModelUrls.ITEMS);
    dispatch({
      type: 'LIST',
      payload: response.data,
    });
  };
  // Запрос на обновление объекта item
  const refreshCard = async (itemId) => {
    const response = await axios.get(ModelUrls.ITEMS + itemId);

    dispatch({
      type: 'CARD',
      payload: { ...response.data },
    });
  };
  const handleChange = (e) => {
    const item = { ...state.activeItem, [e.target.name]: e.target.value };
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };
  const handleChangePhoto = (file) => {
    const img = { ...state.activeItem, photo: file };
    dispatch({
      type: 'PHOTO',
      payload: img,
    });
  };
  const handleChangeAddress = (e) => {
    const itemAddress = {
      ...state.activeItem.address,
      [e.target.name]: e.target.value,
    };
    // console.log(itemAddress);
    dispatch({
      type: 'ADD_ITEM_ADDRESS',
      payload: itemAddress,
    });
  };

  const { itemList, itemCard, activeItem, validated, bug, image } = state;
  // console.log(activeItem);

  const editItem = (item) => {
    //  console.log(item);
    dispatch({
      type: 'EDIT_ITEM',
      payload: item,
    });
  };

  const handleSubmit = async (e, history) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.stopPropagation();
      // добавляем наш объект в new FormData при помощи append, это поможет нам отправить файл с фото на сервер
      let activeForm = new FormData();
      // а это все ради вложенного объекта address
      for (let key in activeItem) {
        if (key === 'address') {
          let address = {};
          for (let ak in activeItem.address) {
            address[ak] = activeItem.address[ak];
          }
          activeForm.append('address', JSON.stringify(address));
        } else {
          activeForm.append(key, activeItem[key]);
        }
      }
      /*  for (let pair of activeForm.entries()) {
        console.log(pair[0] + ',' + pair[1]);
      } */
      if (activeItem.id) {
        try {
          await axios.put(ModelUrls.ITEMS + activeItem.id + '/', activeForm);
          refreshList();
          history.goBack();
        } catch (e) {
          dispatch({ type: 'BUG', payload: e.message });
        }
        return;
      }

      try {
        await axios.post(ModelUrls.ITEMS, activeForm);
        refreshList();
        history.push('/ListCard');
      } catch (e) {
        dispatch({ type: 'BUG', payload: e.message });
      }
    }

    dispatch({ type: 'VALIDATED' });
  };
  const handleDelete = async (item, history) => {
    await axios.delete(ModelUrls.ITEMS + item.id);
    refreshList();
    history.push('/ListCard');
  };
  //Очистка стейта
  const clearActiveItem = () => {
    const emptyActiveItem = {
      activeItem: {
        description: '',
        photo: undefined,
        price: '',
        status: undefined,
        house_type: undefined,
        address: {
          country: '',
          city: '',
          street: '',
          house_number: '',
          zip_code: '',
        },
      },
    };
    dispatch({
      type: 'CLEAR',
      payload: { ...emptyActiveItem.activeItem },
    });
  };

  return (
    <BaseContext.Provider
      value={{
        itemList,
        itemCard,
        activeItem,
        validated,
        bug,
        image,
        refreshList,
        handleChange,
        handleSubmit,
        handleDelete,
        editItem,
        refreshCard,
        handleChangeAddress,
        handleChangePhoto,
        clearActiveItem,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseState;
