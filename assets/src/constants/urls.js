let ROOT_URL = 'http://localhost:8000';
let API_KEY = 'cc2ca05491baaca9dc9e223533a1aa3c';

export const ModelUrls = {
  ITEMS: `${ROOT_URL}/api/items/`,
  USERS: `${ROOT_URL}/api/users/`,
  ADDRESSES: `${ROOT_URL}/api/addresses/`,
  COMMENTS: `${ROOT_URL}/api/comments/`,
  CURRENCIES: `${ROOT_URL}/api/currencies`,
  TRANSACTION: `${ROOT_URL}/api/transactions/`,
};

let ROOT_AUTH = 'dj-rest-auth';
export const AuthUrls = {
  LOGIN: `${ROOT_URL}/${ROOT_AUTH}/login/`,
  LOGOUT: `${ROOT_URL}/${ROOT_AUTH}/logout/`,
  REGISTRATION: `${ROOT_URL}/${ROOT_AUTH}/registration/`,
};

export const AdminUrls = {
  ADMIN: `${ROOT_URL}/admin/`,
  SWAGGER: `${ROOT_URL}/swagger/`,
  SILK: `${ROOT_URL}/silk/`,
};

export const RATE = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
export const CONVERTER = `${RATE}&symbols=RUB,USD`;
/* https://api.exchangeratesapi.io/v1/ latest
    ? access_key = API_KEY
    & base = USD
    & символы = GBP, JPY, EUR
 */
