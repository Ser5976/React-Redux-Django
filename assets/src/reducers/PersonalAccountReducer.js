export const PersonalAccountReducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        activeUser: action.payload,
      };
    case 'FORM_USER':
      return {
        ...state,
        formUser: action.payload,
      };
    case 'CHANGE_USER':
      return {
        ...state,
        changeUser: action.payload,
      };
    case 'CHANGE_FORM_USER':
      return {
        ...state,
        formUser: action.payload,
      };
    case 'AVATAR':
      return {
        ...state,
        changeUser: action.payload,
      };
    case 'AVATAR_FORM':
      return {
        ...state,
        formUser: action.payload,
      };
    case 'CLEAR_CHAGE_USER':
      return { ...state, changeUser: action.payload };
    case 'WALLET':
      return { ...state, wallet: action.payload };
    case 'CURRENCY_RATE':
      return { ...state, date: action.date, eur: action.eur, usd: action.usd };

    default:
      return state;
  }
};
