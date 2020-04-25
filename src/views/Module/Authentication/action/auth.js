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
    CLEAR_PROFILE
} from '../actionsType/actiontype'

import { setAuthToken } from '../utils/setAuthToken'
import callApi from '../utils/callApi'
import { setAlertLogin, setAlertRegister } from './alert'

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await callApi('/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = (newUser) => async dispatch => {
    dispatch({ type: REGISTER })
    try {
        const res = await callApi('/user', 'POST', newUser)

        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch(setAlertLogin({ msg: 'You have registered successful', isSuccess: true }));
        dispatch(loadUser());
    }
    catch (err) {
        const error = err.response.data.error;

        if (error) {
            dispatch(setAlertRegister({ msg: error, isSuccess: false }))
        }
        dispatch({
            type: REGISTER_FAILED
        })

    }
}

export const login = (formData) => async dispatch => {
    dispatch({ type: LOGIN })
    try {
        const res = await callApi('/auth', 'POST', formData)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        dispatch(loadUser)
    } catch (err) {
        const error = err.response.data.error
        if (error) {
            dispatch(setAlertLogin(error))
        }

        dispatch({ type: LOGIN_FAILED })
    }
}

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT })
}