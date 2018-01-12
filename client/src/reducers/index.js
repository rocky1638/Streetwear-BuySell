import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import itemsReducer from './reducer_items';
import authReducer from './reducer_auth';
import userItemsReducer from './reducer_user_item';

const rootReducer = combineReducers({
  form: formReducer,
  items: itemsReducer,
  auth: authReducer,
  userItems: userItemsReducer
});

export default rootReducer;
