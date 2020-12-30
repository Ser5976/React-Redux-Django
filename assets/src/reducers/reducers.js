//src/reducers/reducers.js

export const itemReducer = (state, action) => {
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
    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE':
      return { ...state, input: action.payload };
    case 'VALIDATED':
      return { ...state, validated: true };
    case 'SHOW_CLOSE':
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};
