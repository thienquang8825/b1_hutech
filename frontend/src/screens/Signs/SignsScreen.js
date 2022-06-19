import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Quiz from '../../components/Quiz'
import Navigate from '../../components/Navigate'
import Aside from '../../components/Aside'

const SignsScreen = () => {
  const { pageNumber } = useParams()

  const type = 'signs'

  const [clear, setClear] = useState(false)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const questionGetList = useSelector((state) => state.questionGetList)
  const { questions, page, pages, quantity } = questionGetList

  const pageSize = 10
  let count = pageSize * (page - 1)

  useEffect(() => {
    dispatch(QuestionAction.getList(type, '', pageNumber))
  }, [dispatch, pageNumber])

  useEffect(() => {
    if (clear === true) {
      setClear(false)
    }
  }, [clear])

  return (
    <>
      <h1 className='text-center m-3'>Signs</h1>
      <div className='row mt-3'>
        <div className='col-md-3 border'>
          <Aside
            show={show}
            setClear={setClear}
            setShow={setShow}
            page={page}
            pages={pages}
            quantity={quantity}
            pageSize={pageSize}
            type={type}
          />
        </div>
        {clear === false && (
          <div className='col-md-9 border'>
            {questions.map((question) => (
              <Quiz
                key={question._id}
                // question={{ ...question, question: question.question.url }}
                question={question}
                show={show}
                number={(++count).toString()}
                type={type}
              />
            ))}
            <Navigate page={page} pages={pages} type={type} />
          </div>
        )}
      </div>
    </>
  )
}

export default SignsScreen
