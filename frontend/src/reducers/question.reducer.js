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

const getOne = (state = { question: {} }, action) => {
  switch (action.type) {
    case CONSTANT.GET_ONE_REQUEST:
      return { ...state, loading: true }
    case CONSTANT.GET_ONE_SUCCESS:
      return {
        loading: false,
        question: action.payload.question[0],
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case CONSTANT.GET_ONE_FAIL:
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

const updateQuestion = (state = { question: {} }, action) => {
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

const createQuestion = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.CREATE_REQUEST:
      return { loading: true }
    case CONSTANT.CREATE_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case CONSTANT.CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.CREATE_RESET:
      return {}
    default:
      return state
  }
}

const deleteQuestion = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.DELETE_REQUEST:
      return { loading: true }
    case CONSTANT.DELETE_SUCCESS:
      return { loading: false, success: true }
    case CONSTANT.DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const QuestionReducer = {
  getList,
  getOne,
  getDetail,
  updateQuestion,
  createQuestion,
  deleteQuestion,
}
