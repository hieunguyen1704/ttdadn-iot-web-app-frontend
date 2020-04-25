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
} from '../actionsType/actiontype'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state, loading: true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_FAILED:
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}