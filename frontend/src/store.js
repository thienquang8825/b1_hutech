import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { QuestionReducer } from './reducers/question.reducer'
import { UserReducer } from './reducers/user.reducer'

const reducer = combineReducers({
  questionGetList: QuestionReducer.getList,
  questionGetDetail: QuestionReducer.getDetail,
  questionUpdate: QuestionReducer.update,

  userLogin: UserReducer.login,
  userRegister: UserReducer.register,
})

const userLoginFromStorage = localStorage.getItem('userLogin')
  ? JSON.parse(localStorage.getItem('userLogin'))
  : null

const initialState = {
  userLogin: { userSignIn: userLoginFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
