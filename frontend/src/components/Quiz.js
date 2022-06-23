import React from 'react'
import checkResult from '../utils/checkResult'

const Quiz = ({ question, show, number, type }) => {
  console.log(type)
  return (
    // <div key={question._id} className='row mb-3'>
    //   {type === 'signs' ? (
    //     <div>
    // {number}
    // {' - '}
    // <img
    //   src={question.question}
    //   alt={question.question}
    //   style={{ width: '25%' }}
    // />
    //     </div>
    //   ) : (
    //     <div>
    //       {number} - {question.question}
    //     </div>
    //   )}

    // {question.answers &&
    //   question.answers.map((answer) => (
    //     <div
    //       className={`form-check ps-5 my-2 ${
    //         type === 'reading' || type === 'signs'
    //           ? 'col-12'
    //           : 'col-md-3 col-sm-6'
    //       }`}
    //       key={answer._id}
    //     >
    //       <input
    //         className='form-check-input'
    //         type='radio'
    //         name={question._id}
    //         id={answer._id}
    //         defaultChecked={show && answer.isCorrect === true}
    //         disabled={show && !answer.isCorrect}
    //         onChange={(e) => checkResult(answer)}
    //       />

    //       <label
    //         className={`form-check-label ${
    //           show && answer.isCorrect && 'text-success'
    //         }`}
    //         htmlFor={answer._id}
    //       >
    //         {answer.answer}
    //         {show && answer.isCorrect && (
    //           <>
    //             {' '}
    //             <i className='fas fa-check'></i>
    //           </>
    //         )}
    //       </label>
    //     </div>
    //   ))}
    // </div>
    <div key={question._id} className='row mb-3'>
      {type === 'grammar' || type === 'reading' ? (
        <>
          <div>
            {number}. {question.question}{' '}
          </div>
          {question.answers &&
            question.answers.map((answer) => (
              <div
                className={`form-check ps-5 my-2 ${
                  type === 'reading' ? 'col-12' : 'col-md-3 col-sm-6'
                }`}
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
        </>
      ) : type === 'clozetext' || type === 'listening' ? (
        <>
          <div className='col-1 ps-5 my-2'>{number}.</div>
          {question.answers &&
            question.answers.map((answer) => (
              <div className='form-check ps-5 my-2 col' key={answer._id}>
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
        </>
      ) : (
        <>
          <div className='col-4'>
            {number}.{' '}
            <img
              src={question.question}
              alt={question.question}
              style={{ width: '90%' }}
            />
          </div>
          <div className='col ps-0 my-auto'>
            {question.answers &&
              question.answers.map((answer) => (
                <div className='form-check ps-5 my-2 col' key={answer._id}>
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
        </>
      )}
    </div>
  )
}

export default Quiz
