import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { QuestionAction } from '../../actions/question.action'
import Navigate from '../../components/Navigate'
import Aside from '../../components/Aside'

const TransformScreen = () => {
  const { pageNumber } = useParams()

  const type = 'transform'

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

  const checkTransform = (idInput, answer) => {
    const element = document.getElementById(idInput)

    if (element.value === answer) {
      element.style.color = '#73a839'
    } else {
      element.style.color = 'red'
    }
  }

  const changeColor = (idInput) => {
    const element = document.getElementById(idInput)

    element.style.color = 'black'
  }

  const clearTransform = (idInput) => {
    const element = document.getElementById(idInput)

    element.value = ''
  }

  const showTransform = (idInput, answer) => {
    const element = document.getElementById(idInput)

    element.value = answer
  }

  return (
    <>
      <h1 className='text-center m-3'>Vocabulary & Grammar</h1>
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
              <div key={question._id} className='row mb-3'>
                <div>
                  {++count} - {question.question}
                </div>
                <div className='row'>
                  <div className='col-9 d-flex'>
                    <strong className='lh-lg'>
                      <i className='fa fa-arrow-right'></i> {question.prefix}
                    </strong>
                    <input
                      className='input-focus rounded bg-secondary flex-grow-1 ms-2'
                      id={question._id}
                      onFocus={(e) => changeColor(question._id)}
                      defaultValue={show ? question.answer : ''}
                      readOnly={show}
                    ></input>
                  </div>
                  <div className='col-1 text-center'>
                    <button
                      className='border-0 rounded'
                      onClick={() =>
                        checkTransform(question._id, question.answer)
                      }
                    >
                      <i className='fa fa-check-square text-primary'></i>
                    </button>
                  </div>
                  <div className='col-1 text-center'>
                    <button
                      className='border-0 rounded'
                      onClick={() => clearTransform(question._id)}
                    >
                      <i className='fa fa-eraser text-primary'></i>
                    </button>
                  </div>
                  <div className='col-1 text-center'>
                    <button
                      className='border-0 rounded'
                      onClick={() =>
                        showTransform(question._id, question.answer)
                      }
                    >
                      <i className='fa fa-eye text-primary'></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Navigate page={page} pages={pages} type={type} />
          </div>
        )}
      </div>
    </>
  )
}

export default TransformScreen
