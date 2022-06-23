import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Sidebar from '../../components/Sidebar'
import Message from '../../components/Message'
import { QUESTION_CONSTANT } from '../../constants/question.constant'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const SpeakingEditScreen = () => {
  const { id: questionId } = useParams()

  const type = 'speaking'

  const [topic, setTopic] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
          setTopic(questionDetail.topic)
          setTitle(questionDetail.title)
          setDescription(questionDetail.description)
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

  const submitHandler = (e) => {
    e.preventDefault()

    if (questionId !== undefined) {
      dispatch(
        QuestionAction.updateQuestion(type, {
          _id: questionId,
          topic,
          title,
          description,
        })
      )
    } else {
      dispatch(
        QuestionAction.createQuestion(type, {
          topic,
          title,
          description,
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
              <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter topic...'
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter title...'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                />
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

export default SpeakingEditScreen
