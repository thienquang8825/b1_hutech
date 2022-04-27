import { USER_CONSTANT as CONSTANT } from '../constants/user.constant'

const login = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.LOGIN_REQUEST:
      return { loading: true }
    case CONSTANT.LOGIN_SUCCESS:
      return { loading: false, userSignIn: action.payload }
    case CONSTANT.LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.LOGOUT:
      return {}
    default:
      return state
  }
}

const register = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.REGISTER_REQUEST:
      return { loading: true }
    case CONSTANT.REGISTER_SUCCESS:
      return { loading: false, userSignUp: action.payload }
    case CONSTANT.REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const UserReducer = { login, register }
