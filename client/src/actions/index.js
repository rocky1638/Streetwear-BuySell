import axios from 'axios';
import {
  FETCH_ITEMS,
  FETCH_USER,
  UPDATE_USER,
  ADD_LISTING,
  FETCH_USER_ITEMS
} from './types';

export const fetchItems = (params, callback) => dispatch => {
  axios
    .get('/api/fetch_items', {
      params: params
    })
    .then(res => {
      callback();
      return dispatch({ type: FETCH_ITEMS, payload: res.data });
    });
};

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

export const fetchUserItems = () => dispatch => {
  axios.get('/api/fetch_user_items').then(res => {
    console.log(res.data);
    return dispatch({ type: FETCH_USER_ITEMS, payload: res.data });
  });
};

export const addListing = (
  { brand, price, listingPicture, category, color, name, description },
  callback
) => dispatch => {
  let data = new FormData();
  data.append('brand', brand);
  data.append('price', price);
  data.append('listingPicture', listingPicture);
  data.append('isSold', false);
  data.append('category', category);
  data.append('color', color);
  data.append('name', name);
  data.append('description', description);

  console.log(data);

  axios.post('/api/add_listing', data).then(res => {
    callback();
    return dispatch({ type: ADD_LISTING, payload: res.data });
  });
};
