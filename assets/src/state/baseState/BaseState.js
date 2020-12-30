import React, { useReducer } from 'react';
import axios from 'axios';
import { BaseContext } from './BaseContext';
import { ModelUrls } from '../../constants/urls';
import { itemReducer } from '../../reducers/reducers';

const initialState = {
  itemCard: {},
  itemList: [],
  activeItem: {
    description: '',
    photo: null,
    price: null,
    status: null,
    type: null,
    address: {
      country: null,
      city: null,
      street: null,
      house_number: null,
      zipCode: null,
    },
  },
  ad: false,
};

const BaseState = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  const editAd = () => dispatch({ type: 'EDIT_AD' });
  const refreshList = async () => {
    const response = await axios.get(ModelUrls.ITEMS);

    dispatch({
      type: 'LIST',
      payload: response.data,
    });
  };
  const refreshCard = async (name) => {
    const response = await axios.get(ModelUrls.ITEMS + name);
    // console.log(response.data);
    // console.log(response.data.address);

    dispatch({
      type: 'CARD',
      payload: { ...response.data, ...response.data.address },
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
    // console.log(file);
    const img = { ...state.activeItem, photo: file };
    // console.log(img);
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
    dispatch({
      type: 'ADD_ITEM_ADDRESS',
      payload: itemAddress,
    });
  };

  const { itemList, itemCard, activeItem, show, ad } = state;

  const editItem = (item) => {
    dispatch({
      type: 'EDIT_ITEM',
      payload: item,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let activeForm = new FormData();

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
    if (activeItem.id) {
      await axios.put(ModelUrls.ITEMS + activeItem.id + '/', activeForm);
      refreshList();

      return;
    }

    // console.log(activeItem);
    // for (let pair of activeForm.entries()) {
    //   console.log(pair[0] + ',' + pair[1]);
    // }
    await axios.post(ModelUrls.ITEMS, activeForm);
    refreshList();
  };
  const handleDelete = async (item) => {
    await axios.delete(ModelUrls.ITEMS + item.id);
    refreshList();
  };

  return (
    <BaseContext.Provider
      value={{
        itemList,
        itemCard,
        activeItem,
        show,
        ad,
        refreshList,
        handleChange,
        handleSubmit,
        handleDelete,
        editItem,
        editAd,
        refreshCard,
        handleChangeAddress,
        handleChangePhoto,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseState;
