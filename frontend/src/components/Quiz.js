import React from 'react'
import checkResult from '../utils/checkResult'

const Quiz = ({ question, show, number }) => {
  return (
    <div key={question._id} className='row mb-3'>
      <div>
        {number} - {question.question}
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
            defaultChecked={show && answer.isCorrect === true}
            disabled={show && !answer.isCorrect}
            onChange={(e) => checkResult(answer)}
          />

          <label
            className={`form-check-label ${
              show && answer.isCorrect && 'text-success'
            }`}
            htmlFor={answer._id}
          >
            {answer.answer}
            {show && answer.isCorrect && (
              <>
                {' '}
                <i className='fas fa-check'></i>
              </>
            )}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Quiz
