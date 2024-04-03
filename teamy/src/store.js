import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore from Redux Toolkit

import {
  userCreateReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
} from './userReducers';

import {
  teamListReducer,
  teamCreateReducer,
  teamDetailsReducer,
} from './teamReducers';

const reducer = {
  userSignin: userCreateReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  teamList: teamListReducer,
  teamCreate: teamCreateReducer,
  teamDetails: teamDetailsReducer,
};

const store = configureStore({
  reducer,
});

export default store;
