import React, { useReducer } from 'react';
import axios from 'axios';
import { BaseContext } from './BaseContext';
import ModelUrls from '../../constants/urls';

const initialState = {
  itemList: [],
  activeItem: {
    title: '',
    description: '',
  },
  show: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        itemList: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        activeItem: action.payload,
      };
    case 'SHOW_CLOSE':
      return {
        ...state,
        show: !state.show,
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
  const handleShow = () => dispatch({ type: 'SHOW_CLOSE' });
  const handleClose = () => dispatch({ type: 'SHOW_CLOSE' });
  const refreshList = async () => {
    const response = await axios.get(ModelUrls.ITEMS);
    console.log(response.data);

    dispatch({
      type: 'LIST',
      payload: response.data,
    });
  };
  console.log(state.itemList);
  const handleChange = (e) => {
    const item = { ...state.activeItem, [e.target.name]: e.target.value };
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };
  const { itemList, activeItem, show } = state;

  const editItem = (item) => {
    // console.log(item);
    handleShow();
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
    //e.preventDefault();
    // console.log(activeItem.id);
    if (activeItem.id) {
      await axios.put(ModelUrls.ITEMS + activeItem.id + '/', activeItem);
      refreshList();
      // resetActivItem();

      return;
    }
    console.log(activeItem);
    await axios.post(ModelUrls.ITEMS, activeItem);
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
        activeItem,
        show,
        refreshList,
        handleChange,
        handleSubmit,
        handleDelete,
        handleShow,
        handleClose,
        editItem,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseState;
