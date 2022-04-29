import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { QuestionAction } from '../actions/question.action'
import Paginate from '../components/Paginate'

const GrammarListScreen = () => {
  const { pageNumber } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userSignIn } = userLogin

  const questionGetList = useSelector((state) => state.questionGetList)
  const { questions, page, pages } = questionGetList

  const pageSize = 10
  let count = pageSize * (page - 1)

  useEffect(() => {
    if (userSignIn && userSignIn.isAdmin) {
      dispatch(QuestionAction.getList(pageNumber))
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, pageNumber, userSignIn])

  return (
    <>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <Sidebar />
        </div>
        <div className='col-md-9 border'>
          <table className='table table-bordered text-center mb-0 table-hover'>
            <thead className='bg-secondary text-dark'>
              <tr>
                <th className='' style={{ width: '5%' }}>
                  Or
                </th>
                <th>Vocabulary & Grammar</th>
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
                    <Link to={`/admin/grammar/${question._id}`}>
                      <button className='btn btn-sm btn-primary'>
                        <i className='fas fa-edit'></i>
                      </button>
                    </Link>
                  </td>
                  <td className='align-middle'>
                    <button className='btn btn-sm btn-danger'>
                      <i className='fa fa-times'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate page={page} pages={pages} />
        </div>
      </div>
    </>
  )
}

export default GrammarListScreen
