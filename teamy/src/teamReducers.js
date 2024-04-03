import * as types from './teamConstants';

export const teamListReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case types.TEAM_LIST_REQUEST:
      return { loading: true, teams: [] };
    case types.TEAM_LIST_SUCCESS:
      return { loading: false, teams: action.payload };
    case types.TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.TEAM_CREATE_REQUEST:
      return { loading: true };
    case types.TEAM_CREATE_SUCCESS:
      return { loading: false, success: true, team: action.payload };
    case types.TEAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamDetailsReducer = (state = { team: { users: [] } }, action) => {
  switch (action.type) {
    case types.TEAM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.TEAM_DETAILS_SUCCESS:
      return { loading: false, team: action.payload };
    case types.TEAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
