import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Message from '../../components/Message'
import Sidebar from '../../components/Sidebar'
import { QUESTION_CONSTANT } from '../../constants/question.constant'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'

const ListeningEditScreen = () => {
  const { id: listeningId } = useParams()

  const type = 'listening'
  let count = 0

  const [title, setTitle] = useState('')
  const [require, setRequire] = useState('')
  const [paragrap, setParagrap] = useState('')
  const [question, setQuestion] = useState('')
  const [public_id, setPublicId] = useState('')
  const [questions, setQuestions] = useState([])

  // ----------
  // const [audio, setAudio] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append('audio', file)
      setLoading(true)
      const res = await axios.post('/api/upload/audio', formData)
      setLoading(false)
      setQuestion(res.data.url)
      setPublicId(res.data.public_id)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  // ----------------

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
      if (listeningId !== undefined) {
        if (!questionDetail || questionDetail._id !== listeningId) {
          dispatch(QuestionAction.getDetail(listeningId, type))
        } else {
          setTitle(questionDetail.title)
          setRequire(questionDetail.require)
          setParagrap(questionDetail.paragrap)
          setQuestion(questionDetail.question)
          setPublicId(questionDetail.public_id)
          setQuestions(questionDetail.questions)
        }
      }
    }
  }, [
    dispatch,
    navigate,
    questionDetail,
    listeningId,
    successCreate,
    successUpdate,
  ])

  const createQuestionHanlder = () => {
    navigate(`/admin/${type}/${questionDetail._id}/question/create`)
  }

  const deleteQuestionHandler = (questionId) => {
    if (window.confirm('Are you sure???')) {
      dispatch(
        QuestionAction.updateQuestion(type, {
          ...questionDetail,
          questions: questionDetail.questions.filter(
            (x) => x._id !== questionId
          ),
        })
      )
    }
  }

  const createUpdateReadingHandler = () => {
    if (listeningId === undefined) {
      dispatch(
        QuestionAction.createQuestion(type, {
          title,
          require,
          paragrap,
          question,
          public_id,
          questions,
        })
      )
    } else {
      dispatch(
        QuestionAction.updateQuestion(type, {
          ...questionDetail,
          title,
          require,
          paragrap,
          question,
          public_id,
          questions,
        })
      )
    }
  }

  return (
    <>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <Sidebar type={type} />
        </div>
        <div className='col-md-9 border'>
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {errorGetDetail ? (
            <Message variant='danger'>{errorGetDetail}</Message>
          ) : (
            <>
              <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter title...'
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter require...'
                  value={require || ''}
                  onChange={(e) => setRequire(e.target.value)}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <CKEditor
                  editor={ClassicEditor}
                  data={paragrap}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setParagrap(data)
                  }}
                />
              </div>

              {/* ------------------------- */}
              <div>
                <input type='file' onChange={handleUpload}></input>
                {loading ? (
                  <Loading></Loading>
                ) : (
                  <div>
                    {question && (
                      <audio controls className='w-100 mb-3'>
                        <source src={question}></source>
                      </audio>
                    )}
                  </div>
                )}
              </div>

              {/* --------------------------------- */}
              {listeningId !== undefined && (
                <>
                  <div className='row justify-content-between'>
                    <div className='col-12 text-end'>
                      <button
                        className='btn btn-success mb-3'
                        onClick={createQuestionHanlder}
                      >
                        Create new
                      </button>
                    </div>
                  </div>
                  <table className='table table-bordered text-center mb-3 table-hover'>
                    <thead className='bg-secondary text-dark'>
                      <tr>
                        <th className='' style={{ width: '5%' }}>
                          Or
                        </th>
                        <th>Question</th>
                        <th style={{ width: '10%' }}>Edit</th>
                        <th style={{ width: '10%' }}>Del</th>
                      </tr>
                    </thead>
                    <tbody className='align-middle'>
                      {questions.map((question) => (
                        <tr key={question._id}>
                          <td className='align-middle'>{++count}</td>
                          <td className='align-middle'>question {count}</td>
                          <td className='align-middle'>
                            <Link
                              to={`/admin/${type}/${questionDetail._id}/question/${question._id}`}
                            >
                              <button className='btn btn-sm btn-primary'>
                                <i className='fas fa-edit'></i>
                              </button>
                            </Link>
                          </td>
                          <td className='align-middle'>
                            <button
                              className='btn btn-sm btn-danger'
                              onClick={() =>
                                deleteQuestionHandler(question._id)
                              }
                            >
                              <i className='fa fa-times'></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <div className='form-group my-3 text-center'>
                <button
                  type='submit'
                  className='btn btn-primary py-2 px-4'
                  onClick={createUpdateReadingHandler}
                >
                  {listeningId === undefined ? 'Create' : 'Update'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ListeningEditScreen
