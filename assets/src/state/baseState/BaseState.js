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
    photo: undefined,
    price: '',
    status: undefined,
    type: undefined,
    address: {
      country: '',
      city: '',
      street: '',
      house_number: '',
      // zip_code: '',
    },
  },
};

const BaseState = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  const refreshList = async () => {
    const response = await axios.get(ModelUrls.ITEMS);
    console.log(response.data);

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
    // console.log(itemAddress);
    dispatch({
      type: 'ADD_ITEM_ADDRESS',
      payload: itemAddress,
    });
  };

  const { itemList, itemCard, activeItem } = state;
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
      history.push('/ListCard');

      return;
    }

    // console.log(activeItem);
    for (let pair of activeForm.entries()) {
      console.log(pair[0] + ',' + pair[1]);
    }
    const response = await axios.post(ModelUrls.ITEMS, activeForm);
    console.log(response.data);
    refreshList();
    history.push('/ListCard');
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
        refreshList,
        handleChange,
        handleSubmit,
        handleDelete,
        editItem,
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
