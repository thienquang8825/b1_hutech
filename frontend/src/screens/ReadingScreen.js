import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { QuestionAction } from '../actions/question.action'
import Quiz from '../components/Quiz'
import Navigate from '../components/Navigate'
import Aside from '../components/Aside'

const ReadingScreen = () => {
  const { pageNumber } = useParams()

  const type = 'reading'

  const [clear, setClear] = useState(false)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const questionGetOne = useSelector((state) => state.questionGetOne)
  const { question: reading, page, pages } = questionGetOne

  let count = 0

  useEffect(() => {
    dispatch(QuestionAction.getOne(type, pageNumber))
  }, [dispatch, pageNumber])

  useEffect(() => {
    if (clear === true) {
      setClear(false)
    }
  }, [clear])

  return (
    <>
      <h1 className='text-center m-3'>Reading Comprehension</h1>
      <div className='row mt-3'>
        <div className='col-md-3 border'>
          <Aside
            show={show}
            setClear={setClear}
            setShow={setShow}
            page={page}
            pages={pages}
            type='reading'
          />
        </div>
        {clear === false && (
          <div className='col-md-9 border'>
            <p>
              <strong>
                {reading.title}: {reading.require}
              </strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: reading.paragrap }}></div>
            {reading.questions &&
              reading.questions.map((question) => (
                <Quiz
                  key={question._id}
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

export default ReadingScreen
