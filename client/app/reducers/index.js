import { combineReducers } from 'redux';
import { REQUEST_POSTS, RECEIVE_POSTS, CHANGE_INDEX, EDIT_POST, LOGIN_STATUS } from '../actions';

const posts = ( state = { isFetching: false, items: [], currentIndex: 0, status: '1' }, action ) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        currentIndex: 0
      };
    case CHANGE_INDEX:
      return {
        ...state,
        currentIndex: action.index
      };
    case LOGIN_STATUS:
      return {
        ...state,
        status: action.status
      }
    case EDIT_POST:
    default:
      return state;
  }
};

const status = ( state = { status: '1' }, action ) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts,
  status
})

export default rootReducer
