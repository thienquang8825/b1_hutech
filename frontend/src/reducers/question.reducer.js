import { QUESTION_CONSTANT as CONSTANT } from '../constants/question.constant'

const getList = (state = { questions: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { ...state, loading: true }
    case CONSTANT.GET_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload.questions,
        page: action.payload.page,
        pages: action.payload.pages,
        quantity: action.payload.quantity,
      }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getDetail = (state = { question: {} }, action) => {
  switch (action.type) {
    case CONSTANT.GET_DETAIL_REQUEST:
      return { ...state, loading: true }
    case CONSTANT.GET_DETAIL_SUCCESS:
      return { loading: false, question: action.payload }
    case CONSTANT.GET_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const update = (state = { question: {} }, action) => {
  switch (action.type) {
    case CONSTANT.UPDATE_REQUEST:
      return { loading: true }
    case CONSTANT.UPDATE_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case CONSTANT.UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.UPDATE_RESET:
      return { question: {} }
    default:
      return state
  }
}

export const QuestionReducer = {
  getList,
  getDetail,
  update,
}
