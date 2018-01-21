import { FETCH_USER_ITEMS, DELETE_LISTING } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_ITEMS:
      return action.payload;
    case DELETE_LISTING:
      return action.payload;
    default:
      return state;
  }
}
