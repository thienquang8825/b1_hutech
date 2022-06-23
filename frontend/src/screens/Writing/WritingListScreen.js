import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Sidebar from '../../components/Sidebar'
import Paginate from '../../components/Paginate'
import SearchBox from '../../components/SearchBox'

const WritingListScreen = () => {
  const { keyword, pageNumber } = useParams()

  const type = 'writing'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userSignIn } = userLogin

  const questionGetList = useSelector((state) => state.questionGetList)
  const { questions, page, pages } = questionGetList

  const questionDelete = useSelector((state) => state.questionDelete)
  const { success: successDelete } = questionDelete

  const pageSize = 10
  let count = pageSize * (page - 1)

  useEffect(() => {
    if (userSignIn && userSignIn.isAdmin) {
      dispatch(QuestionAction.getListAuthorize(type, keyword, pageNumber))
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, keyword, pageNumber, userSignIn, successDelete])

  const deleteHandler = (questionId) => {
    if (window.confirm('Are you sure???')) {
      dispatch(QuestionAction.deleteQuestion(type, questionId))
    }
  }

  const createHanlder = () => {
    navigate(`/admin/${type}/create`)
  }

  return (
    <>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <Sidebar />
        </div>
        <div className='col-md-9 border'>
          <div className='row justify-content-between'>
            <SearchBox type={type} />
            <div className='col-6 text-end'>
              <button className='btn btn-success my-3' onClick={createHanlder}>
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
                <th>Writing</th>
                <th style={{ width: '10%' }}>Edit</th>
                <th style={{ width: '10%' }}>Del</th>
              </tr>
            </thead>
            <tbody className='align-middle'>
              {questions.map((question) => (
                <tr key={question._id}>
                  <td className='align-middle'>{++count}</td>
                  <td className='align-middle'>Topic {question.topic}</td>
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
                      onClick={() => deleteHandler(question._id)}
                    >
                      <i className='fa fa-times'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate page={page} pages={pages} keyword={keyword} type={type} />
        </div>
      </div>
    </>
  )
}

export default WritingListScreen
