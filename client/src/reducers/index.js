import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import itemsReducer from './reducer_items';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
  form: formReducer,
  items: itemsReducer,
  auth: authReducer
});

export default rootReducer;
