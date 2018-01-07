import _ from 'lodash';
import { FETCH_ITEMS, ADD_LISTING } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload; // Change this
    case ADD_LISTING:
      return [...state, action.payload]; // this means we should return the listing from the api call
    default:
      return state;
  }
}
