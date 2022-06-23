import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Navigate from '../../components/Navigate'
import Aside from '../../components/Aside'

const SpeakingScreen = () => {
  const { pageNumber } = useParams()

  const type = 'speaking'

  const [clear, setClear] = useState(false)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const questionGetList = useSelector((state) => state.questionGetList)
  const { questions, page, pages, quantity } = questionGetList

  const pageSize = 10

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
      <h1 className='text-center m-3'>Speaking</h1>
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
              <React.Fragment key={question._id}>
                <div>
                  <strong>
                    Topic {question.topic}: {question.title}
                  </strong>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: question.description }}
                ></div>
              </React.Fragment>
            ))}
            <Navigate page={page} pages={pages} type={type} />
          </div>
        )}
      </div>
    </>
  )
}

export default SpeakingScreen
