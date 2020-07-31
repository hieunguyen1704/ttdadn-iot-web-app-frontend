import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGIN,
  REGISTER,
} from "../actionsType/actiontype";
import { config } from "../../../../config";

import { setAuthToken } from "../utils/setAuthToken";
import callApi from "../utils/callApi";
import { setAlertLogin, setAlertRegister, resetAlert } from "./alert";

const loginrUrl = config.dbURl + config.api.authoterize;

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await callApi(loginrUrl);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
const registerUrl = config.dbURl + config.api.register;
export const register = (newUser) => async (dispatch) => {
  dispatch({ type: REGISTER });
  try {
    const res = await callApi(registerUrl, "POST", newUser);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlertRegister({
        msg: "You have registered successfully.",
        isSuccess: true,
      })
    );
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      dispatch(setAlertRegister({ msg: error, isSuccess: false }));
    }
    dispatch({
      type: REGISTER_FAILED,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    const res = await callApi(loginrUrl, "POST", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(resetAlert());
  } catch (err) {
    const error = err.response.data.msg;

    if (error) {
      dispatch(resetAlert(error));
      dispatch(setAlertLogin(error));
    }

    dispatch({
      type: LOGIN_FAILED,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

const switchUrl = config.dbURl + config.api.switch;
export const switchbutton = () => async (dispatch) => {
  try {
    // console.log("before call api");
    await callApi(switchUrl, "POST");
    // console.log(res);
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};
