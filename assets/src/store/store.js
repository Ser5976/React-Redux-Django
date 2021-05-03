import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //  это расширение в хроме,можно наблюдать за state
import thunk from 'redux-thunk';
import { listHousesReducer } from './reducers/listHousesReduser';

const rootReducer = combineReducers({
  listHouses: listHousesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
