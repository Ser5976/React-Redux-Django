export const PersonalAccountReducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        activeUser: action.payload,
      };
    case 'CHANGE_USER':
      return {
        ...state,
        changeUser: action.payload,
      };
    default:
      return state;
  }
};
