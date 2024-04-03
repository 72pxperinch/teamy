import * as types from './teamConstants';
import axios from 'axios';

const BASE_URL = 'https://teamy-api.onrender.com/api/teams';

export const listTeams = () => async (dispatch) => {
  try {
    dispatch({ type: types.TEAM_LIST_REQUEST });

    const { data } = await axios.get(BASE_URL);
    dispatch({
      type: types.TEAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.TEAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTeam = ({name, description, users}) => async (dispatch) => {
  try {
    dispatch({ type: types.TEAM_CREATE_REQUEST });

    const { data } = await axios.post(BASE_URL, { name, description, users });

    dispatch({
      type: types.TEAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.TEAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeamDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.TEAM_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/${id}`);

    dispatch({
      type: types.TEAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.TEAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
