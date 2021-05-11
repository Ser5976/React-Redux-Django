import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //  это расширение в хроме,можно наблюдать за state
import thunk from 'redux-thunk';
import { addDataReduser } from './reducers/addDataReduser';
import { houseReducer } from './reducers/houseReduser';
import { registrationReduser } from './reducers/registrationReduser';

const rootReducer = combineReducers({
  house: houseReducer,
  addData: addDataReduser,
  registration: registrationReduser,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
