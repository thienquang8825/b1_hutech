import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { QuestionAction } from '../actions/question.action'

const GrammarScreen = () => {
  const { pageNumber } = useParams()

  const [clear, setClear] = useState(false)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const questionGetList = useSelector((state) => state.questionGetList)
  const { questions, page, pages, quantity } = questionGetList

  const pageSize = 5
  let count = pageSize * (page - 1)

  useEffect(() => {
    // if (questions.length === 0)
    dispatch(QuestionAction.getListGrammar(pageNumber))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, clear, show, pageNumber])

  const checkResult = (answer) => {
    const element = document.querySelector(`[for='${answer._id}']`)

    if (answer.isCorrect === true) {
      element.style.color = '#73a839'
      element.innerHTML = answer.answer + " <i class='fas fa-check'></i>"
    } else {
      element.style.color = 'red'
      element.innerHTML = answer.answer + " <i class='fas fa-times'></i>"
    }
  }

  return (
    <>
      <h1 className='text-center m-3'>Vocabulary & Grammar</h1>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <div className='row justify-content-evenly border'>
            <h5>Functions</h5>
            <button
              className='btn btn-primary col-sm-5 my-2'
              type='button'
              onClick={() => setShow(!show)}
            >
              {show ? 'Hidden' : 'Show'}
            </button>
            <button
              className='btn btn-primary col-sm-5 my-2'
              type='button'
              disabled={show}
              onClick={() => setClear(!clear)}
            >
              Clear
            </button>
            <hr></hr>

            <h5>List Questions</h5>
            {[...Array(pages).keys()].map((x) => (
              <Link
                to={`/grammar/page/${x + 1}`}
                key={x + 1}
                className='col-sm-5 my-2 px-0'
              >
                <button
                  className={`w-100 btn ${
                    page === x + 1 ? 'btn-success' : 'btn-primary'
                  }`}
                  type='button'
                >
                  {x * pageSize + 1} -{' '}
                  {(x + 1) * pageSize > quantity
                    ? quantity
                    : (x + 1) * pageSize}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <div className='col-md-9 border'>
          {questions.map((question, index) => (
            <div key={index} className='row mb-3'>
              <div>
                {++count} - {question.question}
              </div>
              {question.answers.map((answer) => (
                <div
                  className='form-check ps-5 col-md-3 col-sm-6 my-2'
                  key={answer._id}
                >
                  <input
                    className='form-check-input'
                    type='radio'
                    name={question._id}
                    id={answer._id}
                    value={answer.answer}
                    defaultChecked={show && answer.isCorrect === true}
                    disabled={show && !answer.isCorrect}
                    onChange={(e) => checkResult(answer)}
                  />
                  {show && answer.isCorrect ? (
                    <>
                      <label
                        className='form-check-label text-success'
                        htmlFor={answer._id}
                      >
                        {answer.answer}
                      </label>{' '}
                      <i className='fas fa-check text-success'></i>
                    </>
                  ) : (
                    <label className='form-check-label' htmlFor={answer._id}>
                      {answer.answer}
                    </label>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className='row justify-content-between'>
            <Link
              to={
                page === 1
                  ? `/grammar/page/${page}`
                  : `/grammar/page/${page - 1}`
              }
              className='col-sm-2 col-md-1 ms-5'
            >
              <button className='btn btn-primary w-100' disabled={page === 1}>
                <i className='fa fa-arrow-left'></i>
              </button>
            </Link>
            <Link
              to={
                page === pages
                  ? `/grammar/page/${page}`
                  : `/grammar/page/${page + 1}`
              }
              className='col-sm-2 col-md-1 me-5'
            >
              <button
                className='btn btn-primary w-100'
                disabled={page === pages}
              >
                <i className='fa fa-arrow-right'></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default GrammarScreen
