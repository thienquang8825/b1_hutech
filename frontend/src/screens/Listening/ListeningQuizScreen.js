import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import { QUESTION_CONSTANT } from '../../constants/question.constant'
import Message from '../../components/Message'
import Sidebar from '../../components/Sidebar'

const ListeningQuizScreen = () => {
  const { listeningId, questionId } = useParams()

  const type = 'listening'

  // const [question, setQuestion] = useState('')
  const [answerA, setAnswerA] = useState({})
  const [answerB, setAnswerB] = useState({})
  const [answerC, setAnswerC] = useState({})
  const [answerD, setAnswerD] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const questionGetDetail = useSelector((state) => state.questionGetDetail)
  const {
    question: questionDetail,
    // loading: loadingGetDetail,
    error: errorGetDetail,
  } = questionGetDetail

  let quiz
  if (questionDetail.questions) {
    quiz = questionDetail.questions.find((q) => q._id === questionId)
  }

  const questionUpdate = useSelector((state) => state.questionUpdate)
  const {
    // loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_CONSTANT.UPDATE_RESET })
      window.alert('Question updated')
      navigate(`/admin/${type}/${listeningId}`)
    } else {
      if (!questionDetail || questionDetail._id !== listeningId) {
        dispatch(QuestionAction.getDetail(listeningId, type))
      }

      if (quiz) {
        // setQuestion(quiz.question)
        setAnswerA(quiz.answers[0])
        setAnswerB(quiz.answers[1])
        setAnswerC(quiz.answers[2])
        setAnswerD(quiz.answers[3])
      }
    }
  }, [
    dispatch,
    navigate,
    questionDetail,
    questionId,
    quiz,
    listeningId,
    successUpdate,
  ])

  const clearCorrect = () => {
    setAnswerA({ ...answerA, isCorrect: false })
    setAnswerB({ ...answerB, isCorrect: false })
    setAnswerC({ ...answerC, isCorrect: false })
    setAnswerD({ ...answerD, isCorrect: false })
  }

  const changeQuestions = () => {
    return questionDetail.questions.map((x) =>
      x._id === questionId
        ? { ...x, answers: [answerA, answerB, answerC, answerD] }
        : x
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (questionId === 'create') {
      questionDetail.questions.push({
        answers: [answerA, answerB, answerC, answerD],
      })
      dispatch(QuestionAction.updateQuestion(type, { ...questionDetail }))
    } else {
      dispatch(
        QuestionAction.updateQuestion(type, {
          ...questionDetail,
          questions: changeQuestions(),
        })
      )
    }
  }
  return (
    <>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <Sidebar />
        </div>
        <div className='col-md-9 border'>
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {errorGetDetail ? (
            <Message variant='danger'>{errorGetDetail}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className='form-group my-3'>
                <div className='row'>
                  <div className='col-1 text-center'>
                    <input
                      type='radio'
                      id={answerA._id || 'A'}
                      name={questionDetail._id || 'new'}
                      defaultChecked={answerA.isCorrect}
                      className='form-check-input'
                      onChange={(e) => {
                        clearCorrect()
                        setAnswerA({ ...answerA, isCorrect: e.target.checked })
                      }}
                      required
                    ></input>
                  </div>
                  <div className='col'>
                    <input
                      className='form-control bg-secondary'
                      type='text'
                      placeholder='Enter answer...'
                      value={answerA.answer || ''}
                      onChange={(e) =>
                        setAnswerA({ ...answerA, answer: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group my-3'>
                <div className='row'>
                  <div className='col-1 text-center'>
                    <input
                      type='radio'
                      id={answerB._id || 'B'}
                      name={questionDetail._id || 'new'}
                      defaultChecked={answerB.isCorrect}
                      className='form-check-input'
                      onChange={(e) => {
                        clearCorrect()
                        setAnswerB({ ...answerB, isCorrect: e.target.checked })
                      }}
                    ></input>
                  </div>
                  <div className='col'>
                    <input
                      className='form-control bg-secondary'
                      type='text'
                      placeholder='Enter answer...'
                      value={answerB.answer || ''}
                      onChange={(e) =>
                        setAnswerB({ ...answerB, answer: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group my-3'>
                <div className='row'>
                  <div className='col-1 text-center'>
                    <input
                      type='radio'
                      id={answerC._id || 'C'}
                      name={questionDetail._id || 'new'}
                      defaultChecked={answerC.isCorrect}
                      className='form-check-input'
                      onChange={(e) => {
                        clearCorrect()
                        setAnswerC({ ...answerC, isCorrect: e.target.checked })
                      }}
                    ></input>
                  </div>
                  <div className='col'>
                    <input
                      className='form-control bg-secondary'
                      type='text'
                      placeholder='Enter answer...'
                      value={answerC.answer || ''}
                      onChange={(e) =>
                        setAnswerC({ ...answerC, answer: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group my-3'>
                <div className='row'>
                  <div className='col-1 text-center'>
                    <input
                      type='radio'
                      id={answerD._id || 'D'}
                      name={questionDetail._id || 'new'}
                      defaultChecked={answerD.isCorrect}
                      className='form-check-input'
                      onChange={(e) => {
                        clearCorrect()
                        setAnswerD({ ...answerD, isCorrect: e.target.checked })
                      }}
                    ></input>
                  </div>
                  <div className='col'>
                    <input
                      className='form-control bg-secondary'
                      type='text'
                      placeholder='Enter answer...'
                      value={answerD.answer || ''}
                      onChange={(e) =>
                        setAnswerD({ ...answerD, answer: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='form-group my-3 text-center'>
                <button type='submit' className='btn btn-primary py-2 px-4'>
                  {questionId !== 'create' ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default ListeningQuizScreen
