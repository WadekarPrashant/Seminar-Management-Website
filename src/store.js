import { applyMiddleware,legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './state/reducers/amountReducer';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;