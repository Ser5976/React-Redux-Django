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
      };
    case 'PHOTO':
      return {
        ...state,
        activeItem: action.payload,
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
    /* case 'RESET_ACTIV_ITEM':
      return {
        ...state,
        activeItem: action.payload,
      }; */
    default:
      return state;
  }
};

const BaseState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const handleShow = () => dispatch({ type: 'SHOW_CLOSE' });
  // const handleClose = () => dispatch({ type: 'SHOW_CLOSE' });
  const editAd = () => dispatch({ type: 'EDIT_AD' });
  const refreshList = async () => {
    const response = await axios.get(ModelUrls.ITEMS);
    // console.log(response.data);

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
  //console.log(state.itemList);
  const handleChange = (e) => {
    const item = { ...state.activeItem, [e.target.name]: e.target.value };
    // console.log(item);

    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };
  const handleChangePhoto = (file) => {
    console.log(file);
    const img = { ...state.activeItem, photo: file };
    console.log(img);
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
    //  console.log(itemAddress);
    dispatch({
      type: 'ADD_ITEM_ADDRESS',
      payload: itemAddress,
    });
  };

  const { itemList, itemCard, activeItem, show, ad } = state;

  const editItem = (item) => {
    // console.log(item);
    console.log(1);
    dispatch({
      type: 'EDIT_ITEM',
      payload: item,
    });
    // console.log(activeItem);
  };
  /* const resetActivItem = () => {
    const reset = { ...state.activeItem, title: '', description: '' };
    dispatch({ type: 'RESET_ACTIV_ITEM', payload: reset });
    handleClose();
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(activeItem);
    if (activeItem.id) {
      await axios.put(ModelUrls.ITEMS + activeItem.id + '/', activeItem);
      refreshList();
      // resetActivItem();

      return;
    }

    console.log(activeItem);

    let activForm = new FormData();

    for (let key in activeItem) {
      if (key === 'address') {
        let address = {};
        for (let ak in activeItem.address) {
          address[ak] = activeItem.address[ak];
        }
        console.log(address);
        activForm.append('address', address);
      } else {
        activForm.append(key, activeItem[key]);
        // console.log(key, activeItem[key]);
      }
    }
    console.log(activForm);
    for (let pair of activForm.entries()) {
      console.log(pair[0] + ',' + pair[1]);
    }
    await axios.post(ModelUrls.ITEMS, activForm);
    refreshList();
    //resetActivItem();
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
