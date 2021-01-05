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
  const refreshList = async () => {
    const response = await axios.get(ModelUrls.ITEMS);
    //console.log(response.data);

    dispatch({
      type: 'LIST',
      payload: response.data,
    });
  };

  const refreshCard = async (name) => {
    const response = await axios.get(ModelUrls.ITEMS + name);
    // console.log(response.data);

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
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseState;
