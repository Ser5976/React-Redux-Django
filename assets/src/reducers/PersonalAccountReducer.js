export const PersonalAccountReducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        activeUser: action.payload,
      };
    default:
      return state;
  }
};
