import axios from 'axios';
import { FETCH_ITEMS, FETCH_USER, UPDATE_USER } from './types';

export function fetchItems(res) {
  return { type: FETCH_ITEMS, payload: res };
}

export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};

export const updateUser = (values, callback) => dispatch => {
  axios.put('/api/update_user', values).then(res => {
    callback();
    return dispatch({ type: UPDATE_USER, payload: res.data });
  });
};
