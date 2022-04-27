import axios from 'axios'
import { USER_CONSTANT as CONSTANT } from '../constants/user.constant'

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.LOGIN_REQUEST })

    const config = {
      'Content-Type': 'application/json',
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: CONSTANT.LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userLogin', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CONSTANT.LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const logout = () => async (dispatch) => {
  localStorage.removeItem('userLogin')

  dispatch({ type: CONSTANT.LOGOUT })
  dispatch({ type: CONSTANT.REGISTER_RESET })
}

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.REGISTER_REQUEST })

    const config = {
      'Content-Type': 'application/json',
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: CONSTANT.REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: CONSTANT.LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userLogin', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CONSTANT.REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const UserAction = { login, logout, register }
