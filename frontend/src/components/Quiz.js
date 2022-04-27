import React, { useState } from 'react'

const Quiz = ({ question }) => {
  const [checkA, setCheckA] = useState(0)

  return (
    <>
      <p>{question.question}</p>
      {question.answers.map((answer) => (
        <label className='text-scuccess' key={answer._id}>
          <input
            type='radio'
            name={question._id}
            id={answer._id}
            value={answer.answer}
            // defaultChecked={checkA === 0 ? false : true}
            onChange={(e) => (answer.isCorrect ? setCheckA(1) : setCheckA(2))}
          ></input>
          {answer.answer} {checkA === 1 && <i className='fas fa-check'></i>}{' '}
          {checkA === 2 && <i className='fas fa-times'></i>}
        </label>
      ))}
    </>
  )
}

export default Quiz
