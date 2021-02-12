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
  // для пагинации
  pageSize: 3,
  count: 0,
  currentPage: 1,
};

const BaseState = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  //запрос на сервер , получаем список домов
  const refreshList = async (url) => {
    const response = await axios.get(url);
    console.log(response);
    dispatch({
      type: 'LIST',
      payload: response.data.results,
    });
    // получение общего количества домов на сервере(count)
    dispatch({ type: 'COUNT', payload: response.data.count });
  };
  // постраничный запрос на сервер(onClick на пагинации, меняем currentPage, вычисляем offset и делаем запрос)
  //offset(смещение на лимит), нужен для вычисления страницы. (1 стр.offset =0, 2стр - offset=лимит,  3 стр- offset=2 лимита и т.д )
  // лимит -кол. домов на странице. offset=(номер страниц-1)*лимит
  const handleCurrentPage = async (page) => {
    dispatch({ type: 'CURRENT_PAGE', payload: page });
    const offset = (page - 1) * pageSize;
    const urlPage = `${ModelUrls.ITEMS}?offset=${offset}&limit=${pageSize}`;
    refreshList(urlPage);
  };
  //Подключаем ' > ' в пагинации для перехода к следующуй страницы
  const nextCurrentPage = async (currentPage, pages) => {
    if (currentPage > pages.length - 1) {
      return;
    } else {
      currentPage = currentPage + 1;
      dispatch({ type: 'CURRENT_PAGE', payload: currentPage });
      console.log(currentPage);
      const offset = (currentPage - 1) * pageSize;
      const urlNext = `${ModelUrls.ITEMS}?offset=${offset}&limit=${pageSize}`;
      refreshList(urlNext);
    }
  };
  //Подключаем ' < ' в пагинации для перехода к предыдущей страницы
  const previousCurrentPage = async (currentPage) => {
    if (currentPage < 2) {
      return;
    } else {
      currentPage = currentPage - 1;
      dispatch({ type: 'CURRENT_PAGE', payload: currentPage });
      const offset = (currentPage - 1) * pageSize;
      const urlPrevious = `${ModelUrls.ITEMS}?offset=${offset}&limit=${pageSize}`;
      refreshList(urlPrevious);
    }
  };
  //Подключаем "в начало" в пагинации для перехода на первую страницу
  const firstCurrentPage = async (currentPage) => {
    if (currentPage === 1) {
      return;
    } else {
      currentPage = 1;
      dispatch({ type: 'CURRENT_PAGE', payload: currentPage });
      const offset = (currentPage - 1) * pageSize;
      const urlFirst = `${ModelUrls.ITEMS}?offset=${offset}&limit=${pageSize}`;
      refreshList(urlFirst);
    }
  };
  //Подключаем "в конец" в пагинации для перехода на последнюю страницу
  const lastCurrentPage = async (currentPage, pages) => {
    if (currentPage === pages.length) {
      return;
    } else {
      currentPage = pages.length;
      dispatch({ type: 'CURRENT_PAGE', payload: currentPage });
      const offset = (currentPage - 1) * pageSize;
      const urlLast = `${ModelUrls.ITEMS}?offset=${offset}&limit=${pageSize}`;
      refreshList(urlLast);
    }
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

  const {
    itemList,
    itemCard,
    activeItem,
    validated,
    bug,
    image,
    count,
    pageSize,
    currentPage,
  } = state;

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
        count,
        pageSize,
        currentPage,
        refreshList,
        handleChange,
        handleSubmit,
        handleDelete,
        editItem,
        refreshCard,
        handleChangeAddress,
        handleChangePhoto,
        clearActiveItem,
        handleCurrentPage,
        nextCurrentPage,
        previousCurrentPage,
        firstCurrentPage,
        lastCurrentPage,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseState;
