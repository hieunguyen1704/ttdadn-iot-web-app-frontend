import { SET_ALERT_LOGIN, SET_ALERT_REGISTER, SET_ALERT } from '../actionsType/actiontype'

export const setAlertLogin = payload => ({
    type: SET_ALERT_LOGIN,
    payload
})

export const setAlertRegister = payload => ({
    type: SET_ALERT_REGISTER,
    payload
})

export const setAlert = payload => ({
    type: SET_ALERT,
    payload
})
