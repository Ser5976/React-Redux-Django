import React, { useReducer } from 'react';
import axios from 'axios';
import { BaseContext } from './BaseContext';
import ModelUrls from '../../constants/urls';

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
const reducer = (state, action) => {
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        itemList: action.payload,
      };
    case 'CARD':
      return {
        ...state,
        itemCard: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        activeItem: action.payload,
        photoFile: action.photoFile,
      };
    case 'ADD_ITEM_ADDRESS':
      return {
        ...state,
        activeItem: { ...state.activeItem, address: action.payload },
      };

    case 'SHOW_CLOSE':
      return {
        ...state,
        show: !state.show,
      };
    case 'EDIT_AD':
      return {
        ...state,
        ad: !state.ad,
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
};

const BaseState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    console.log(response.data);
    console.log(response.data.address);

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
  const handlePhoto = (e) => {
    let photoFile = e.target.files[0];

    dispatch({
      type: 'ADD_ITEM',
      photoFile: photoFile,
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
    console.log(1);
    dispatch({
      type: 'EDIT_ITEM',
      payload: item,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeItem.id) {
      await axios.put(ModelUrls.ITEMS + activeItem.id + '/', activeItem);
      refreshList();

      return;
    }
    let itemData = new FormData('photo', state.photoFile);
    // console.log(state);
    for (var i = activeItem.length - 1; i >= 0; i--) {
      itemData.append(i, activeItem[i])
    }
    // console.log('---', itemData.entries());
    await axios.post(ModelUrls.ITEMS, itemData);
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
        handlePhoto,
        handleSubmit,
        handleDelete,
        editItem,
        editAd,
        refreshCard,
        handleChangeAddress,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseState;
