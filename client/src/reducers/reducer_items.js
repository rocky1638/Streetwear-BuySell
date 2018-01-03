import _ from 'lodash';
import { FETCH_ITEMS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload; // Change this
    default:
      return state;
  }
}
