import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL,
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "./userConstants";

function userCreateReducer(state = {}, action) {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userListReducer(state = {}, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, userslist: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userDeleteReducer(state = {}, action) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  userDeleteReducer, userCreateReducer, userListReducer, userUpdateReducer
}