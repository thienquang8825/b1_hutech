import { PART1_CONSTANT as CONSTANT } from '../constants/part1.constant'

const getList = (state = { exams: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { ...state, loading: true }
    case CONSTANT.GET_LIST_SUCCESS:
      return {
        loading: false,
        exams: action.payload,
      }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const calculateScore = (
  state = { scores: { questionIds: [], score: 0 } },
  action
) => {
  switch (action.type) {
    case CONSTANT.CALCULATE_SCORE_UPDATE:
      // console.log(action.payload)
      return { scores: action.payload }
    case CONSTANT.CALCULATE_SCORE_RESET:
      return { scores: { questionIds: [], score: 0 } }
    default:
      return state
  }
}

export const Part1Reducer = {
  getList,
  calculateScore,
}
