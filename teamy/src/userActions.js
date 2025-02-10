import Axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from "./userConstants";

const BASE_URL = "https://teamy-nine.vercel.app/api/users";

const listUsers = (
  pageNumber = 1,
  limit = 20,
  searchQuery = '',
  filterGender = '',
  filterDomain = '',
  filterAvailability = null
) => async (dispatch, getState) => {
  console.log("List User");
  try {
    dispatch({ type: USER_LIST_REQUEST });

    if (filterAvailability === "") {
      filterAvailability = null
    }
    let url = `${BASE_URL}?page=${pageNumber}&limit=${limit}&name=${searchQuery}&gender=${filterGender}&domain=${filterDomain}`;

    if (filterAvailability !== null) {
      url += `&availability=${filterAvailability}`;
    }

    const { data } = await Axios.get(url);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
};

const createUser = ({ first_name, last_name, email, gender, avatar, domain, available }) => async (dispatch, getState) => {
  console.log("Create User");
  dispatch({ type: USER_CREATE_REQUEST, payload: { first_name, last_name, email, gender, avatar, domain, available } });
  try {
    const { data } = await Axios.post(BASE_URL, {
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available
    });
    dispatch({ type: USER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_CREATE_FAIL, payload: error.message });
  }
};

const updateUser = ({ userId, first_name, last_name, email, gender, avatar, domain, available }) => async (dispatch, getState) => {
  console.log("Update User");
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, first_name, last_name, email, gender, avatar, domain, available } });
  try {
    const { data } = await Axios.put(`${BASE_URL}/${userId}`, {
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
};

const deleteUser = (userId) => async (dispatch, getState) => {

  console.log("Delete User");
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    await Axios.delete(`${BASE_URL}/${userId}`);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });
  }
};

export { createUser, deleteUser, updateUser, listUsers };
