import { QUESTION_CONSTANT as CONSTANT } from '../constants/question.constant'

const getList = (state = { questions: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      // return { loading: true, questions: [] }
      return { ...state, loading: true }
    case CONSTANT.GET_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload.grammars,
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

export const QuestionReducer = { getList }
