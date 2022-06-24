import axios from 'axios'
import { PART1_CONSTANT as CONSTANT } from '../constants/part1.constant'
// import { UserAction } from './user.action'

const getList = () => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.GET_LIST_REQUEST })

    const { data } = await axios.get('/api/part1/list')

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

export const Part1Action = {
  getList,
}
