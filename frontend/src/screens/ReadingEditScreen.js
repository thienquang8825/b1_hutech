import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { QuestionAction } from '../actions/question.action'
import Message from '../components/Message'
import { QUESTION_CONSTANT } from '../constants/question.constant'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ReadingEditScreen = () => {
  const { id: questionId } = useParams()

  const type = 'reading'
  let count = 0

  const [title, setTitle] = useState('')
  const [require, setRequire] = useState('')
  const [paragrap, setParagrap] = useState('')
  const [questions, setQuestions] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const questionGetDetail = useSelector((state) => state.questionGetDetail)
  const {
    question: questionDetail,
    // loading: loadingGetDetail,
    error: errorGetDetail,
  } = questionGetDetail

  useEffect(() => {
    if (!questionDetail || questionDetail._id !== questionId) {
      dispatch(QuestionAction.getDetail(questionId, type))
    } else {
      setTitle(questionDetail.title)
      setRequire(questionDetail.require)
      setParagrap(questionDetail.paragrap)
      setQuestions(questionDetail.questions)
    }
  }, [dispatch, questionDetail, questionId])

  const submitHandler = (e) => {}

  return (
    <>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <Sidebar type={type} />
        </div>
        <div className='col-md-9 border'>
          {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
          {errorGetDetail ? (
            <Message variant='danger'>{errorGetDetail}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter question...'
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='form-group my-3'>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Enter question...'
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

              <div className='row justify-content-between'>
                <div className='col-12 text-end'>
                  <button
                    className='btn btn-success mb-3'
                    // onClick={createHanlder}
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
                      <td className='align-middle'>{question.question}</td>
                      <td className='align-middle'>
                        <Link to={`/admin/${type}/${question._id}`}>
                          <button className='btn btn-sm btn-primary'>
                            <i className='fas fa-edit'></i>
                          </button>
                        </Link>
                      </td>
                      <td className='align-middle'>
                        <button
                          className='btn btn-sm btn-danger'
                          // onClick={() => deleteHandler(question._id)}
                        >
                          <i className='fa fa-times'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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

export default ReadingEditScreen
