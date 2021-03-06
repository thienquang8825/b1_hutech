import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Quiz from '../../components/Quiz'
import Navigate from '../../components/Navigate'
import Aside from '../../components/Aside'
import ReactAudioPlayer from 'react-audio-player'

const ListeningScreen = () => {
  const { pageNumber } = useParams()

  const type = 'listening'

  const [clear, setClear] = useState(false)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const questionGetOne = useSelector((state) => state.questionGetOne)
  const { question: listening, page, pages } = questionGetOne

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
      <h1 className='text-center m-3'>Listening</h1>
      <div className='row mt-3'>
        <div className='col-md-3 border'>
          <Aside
            show={show}
            setClear={setClear}
            setShow={setShow}
            page={page}
            pages={pages}
            type={type}
          />
        </div>
        {clear === false && (
          <div className='col-md-9 border'>
            <p>
              <strong>
                {listening.title}: {listening.require}
              </strong>
            </p>

            <ReactAudioPlayer
              src={listening.question}
              controls
              className='w-100'
            />

            <div dangerouslySetInnerHTML={{ __html: listening.paragrap }}></div>
            {listening.questions &&
              listening.questions.map((question) => (
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

export default ListeningScreen
