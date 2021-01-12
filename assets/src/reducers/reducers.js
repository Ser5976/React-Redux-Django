//src/reducers/reducers.js

export const itemReducer = (state, action) => {
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        itemList: action.payload,
      };
    case 'VALIDATED':
      return { ...state, validated: true };
    case 'BUG':
      return { ...state, bug: action.payload };
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

    case 'EDIT_ITEM':
      return {
        ...state,
        image: true,
        activeItem: action.payload,
      };
    case 'CLEAR':
      return {
        ...state,
        activeItem: action.payload,
        validated: false,
      };
    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE':
      return { ...state, activeUsers: action.payload };
    case 'VALIDATED':
      return { ...state, validated: true };
    case 'SHOW_CLOSE':
      return {
        ...state,
        show: !state.show,
      };
    case 'AUTH_CLEAR':
      return {
        ...state,
        activeItem: action.payload,
        validated: false,
      };
    case 'AUTH':
      return {
        ...state,
        token: action.payload,
        userName: action.userName,
        userId: action.userId,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: undefined,
        userName: undefined,
        userId: undefined,
      };
    case 'CHANGE_ACTIVE_LOGIN':
      return { ...state, activeLogin: action.payload };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'NO_ERROR':
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
};
