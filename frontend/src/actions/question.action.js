import axios from 'axios'
import { QUESTION_CONSTANT as CONSTANT } from '../constants/question.constant'
import { UserAction } from './user.action'

//syntax redux-thunk => allow to add a function within a fuction
const getList =
  (type, keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CONSTANT.GET_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/${type}/list?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({
        type: CONSTANT.GET_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CONSTANT.GET_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const getListAuthorize =
  (type, keyword = '', pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CONSTANT.GET_LIST_REQUEST })

      const {
        userLogin: { userSignIn },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userSignIn.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/${type}/list?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: CONSTANT.GET_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(UserAction.logout())
      }
      dispatch({
        type: CONSTANT.GET_DETAIL_FAIL,
        payload: message,
      })
    }
  }

const getOne =
  (type, pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CONSTANT.GET_ONE_REQUEST })

      const { data } = await axios.get(
        `/api/${type}/one?pageNumber=${pageNumber}`
      )

      dispatch({
        type: CONSTANT.GET_ONE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CONSTANT.GET_ONE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const getDetail = (questionId, type) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.GET_DETAIL_REQUEST })

    const {
      userLogin: { userSignIn },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userSignIn.token}`,
      },
    }

    const { data } = await axios.get(`/api/${type}/${questionId}`, config)

    dispatch({
      type: CONSTANT.GET_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.GET_DETAIL_FAIL,
      payload: message,
    })
  }
}

const updateQuestion = (type, question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.UPDATE_REQUEST,
    })

    const {
      userLogin: { userSignIn },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userSignIn.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/${type}/${question._id}`,
      question,
      config
    )

    dispatch({ type: CONSTANT.UPDATE_SUCCESS, payload: data })

    dispatch({ type: CONSTANT.GET_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.UPDATE_FAIL,
      payload: message,
    })
  }
}

const createQuestion = (type, question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.CREATE_REQUEST,
    })

    const {
      userLogin: { userSignIn },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userSignIn.token}`,
      },
    }

    const { data } = await axios.post(`/api/${type}`, question, config)

    dispatch({
      type: CONSTANT.CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.CREATE_FAIL,
      payload: message,
    })
  }
}

const deleteQuestion = (type, questionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.DELETE_REQUEST })

    const {
      userLogin: { userSignIn },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userSignIn.token}`,
      },
    }

    await axios.delete(`/api/${type}/${questionId}`, config)

    dispatch({ type: CONSTANT.DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.DELETE_FAIL,
      payload: message,
    })
  }
}

export const QuestionAction = {
  getList,
  getListAuthorize,
  getOne,
  getDetail,
  updateQuestion,
  createQuestion,
  deleteQuestion,
}
