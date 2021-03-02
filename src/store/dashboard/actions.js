import {
  RESET_DASHBOARDS,
  RESET_ERROR,
  GET_DASHBOARDS,
  SET_DASHBOARDS,
  API_ERROR,
} from "./actionTypes";

export const resetDashboards = (target) => {
  return {
    type: RESET_DASHBOARDS,
    payload: { target },
  };
};

export const resetError = (target) => {
  return {
    type: RESET_ERROR,
    payload: { target },
  };
};

export const getDashboards = (target) => {
  return {
    type: GET_DASHBOARDS,
    payload: { target },
  };
};

export const setDashboards = (target, data) => {
  return {
    type: SET_DASHBOARDS,
    payload: { target, data },
  };
};

export const apiError = (target, error) => {
  return {
    type: API_ERROR,
    payload: { target, error },
  };
};
