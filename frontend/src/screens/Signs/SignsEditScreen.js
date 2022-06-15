import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Sidebar from '../../components/Sidebar'
import Message from '../../components/Message'
import { QUESTION_CONSTANT } from '../../constants/question.constant'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'

const SignsEditScreen = () => {
  const { id: questionId } = useParams()

  const type = 'signs'

  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const questionUpdate = useSelector((state) => state.questionUpdate)
  const {
    // loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate

  const questionCreate = useSelector((state) => state.questionCreate)
  const {
    // loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = questionCreate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_CONSTANT.UPDATE_RESET })
      window.alert('Question updated')
      navigate(`/admin/${type}`)
    } else if (successCreate) {
      dispatch({ type: QUESTION_CONSTANT.CREATE_RESET })
      window.alert('Question created')
      navigate(`/admin/${type}`)
    } else {
      if (questionId !== undefined) {
        if (!questionDetail || questionDetail._id !== questionId) {
          dispatch(QuestionAction.getDetail(questionId, type))
        } else {
          setImages(questionDetail.question)
          setAnswerA(questionDetail.answers[0])
          setAnswerB(questionDetail.answers[1])
          setAnswerC(questionDetail.answers[2])
          setAnswerD(questionDetail.answers[3])
        }
      }
    }
  }, [
    dispatch,
    navigate,
    questionDetail,
    questionId,
    successUpdate,
    successCreate,
  ])

  const styleUpload = {
    display: images ? 'block' : 'none',
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      if (!file) {
        return alert('File not exist')
      }
      if (file.size > 1024 * 1024) {
        return alert('Size too large')
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return alert('File format is incorrect')
      }
      let formData = new FormData()
      formData.append('file', file)
      setLoading(true)
      const res = await axios.post('/api/upload', formData)
      setLoading(false)
      setImages(res.data)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      setLoading(true)
      await axios.post('/api/upload/destroy', { public_id: images.public_id })
      setLoading(false)
      setImages(false)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const clearCorrect = () => {
    setAnswerA({ ...answerA, isCorrect: false })
    setAnswerB({ ...answerB, isCorrect: false })
    setAnswerC({ ...answerC, isCorrect: false })
    setAnswerD({ ...answerD, isCorrect: false })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (questionId !== undefined) {
      dispatch(
        QuestionAction.updateQuestion(type, {
          _id: questionId,
          question: images,
          answers: [answerA, answerB, answerC, answerD],
        })
      )
    } else {
      dispatch(
        QuestionAction.createQuestion(type, {
          question: images,
          answers: [answerA, answerB, answerC, answerD],
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
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {errorGetDetail ? (
            <Message variant='danger'>{errorGetDetail}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              {/* <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter question...'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div> */}
              <div className='create_product text-center'>
                <div className='upload'>
                  <input
                    type='file'
                    name='file'
                    id='file_up'
                    onChange={handleUpload}
                  ></input>
                  {loading ? (
                    <div id='file_img'>
                      <Loading></Loading>
                    </div>
                  ) : (
                    <div id='file_img' style={styleUpload}>
                      <img src={images ? images.url : ''} alt=''></img>
                      <span onClick={handleDestroy}>Delete</span>
                    </div>
                  )}
                </div>
              </div>
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
                  {questionId !== undefined ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default SignsEditScreen
