import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //  это расширение в хроме,можно наблюдать за state
import thunk from 'redux-thunk';
import { addDataReduser } from './reducers/addDataReduser';
import { authReduser } from './reducers/authReduser';
import { houseReducer } from './reducers/houseReduser';
import { registrationReduser } from './reducers/registrationReduser';
import { accountReduser } from './reducers/accountReduser';
import { transactionReduser } from './reducers/transactionReduser';

const rootReducer = combineReducers({
  house: houseReducer,
  addData: addDataReduser,
  registration: registrationReduser,
  auth: authReduser,
  account: accountReduser,
  transaction: transactionReduser,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
