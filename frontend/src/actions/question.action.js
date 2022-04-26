import axios from 'axios'
import { QUESTION_CONSTANT as CONSTANT } from '../constants/question.constant'

//syntax redux-thunk => allow to add a function within a fuction
const getListGrammar =
  (pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CONSTANT.GET_LIST_REQUEST })

      const { data } = await axios.get(`/api/grammar?pageNumber=${pageNumber}`)

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

export const QuestionAction = { getListGrammar }
