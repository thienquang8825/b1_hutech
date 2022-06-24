import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Part1Action } from '../../actions/part1.action'
import Quiz from '../../components/Quiz'
import Aside from '../../components/Aside'

import { PART1_CONSTANT as CONSTANT } from '../../constants/part1.constant'

const Part1Screen = () => {
  const { id: examId } = useParams()

  const type = 'exam'

  // let scores = {
  //   questionIds: [],
  //   score: 0,
  // }

  // console.log(scores)

  let grammar = 0
  let signs = 0
  let reading = 0
  let clozetext = 0
  let transform = 0

  const dispatch = useDispatch()

  const part1GetList = useSelector((state) => state.part1GetList)
  const { exams } = part1GetList

  const part1CalculateScore = useSelector((state) => state.part1CalculateScore)
  const { scores } = part1CalculateScore

  console.log(scores)

  let exam
  if (exams) exam = exams.find((e) => e._id === examId)

  useEffect(() => {
    if (exams.length === 0) dispatch(Part1Action.getList())
  }, [dispatch, exams])

  const checkQuiz = (questionId, answer) => {
    if (scores.questionIds.find((element) => element === questionId)) {
      if (answer.isCorrect === false) {
        // scores.questionIds = scores.questionIds.filter(
        //   (element) => element !== questionId
        // )
        // scores.score--
        dispatch({
          type: CONSTANT.CALCULATE_SCORE_UPDATE,
          payload: {
            questionIds: scores.questionIds.filter(
              (element) => element !== questionId
            ),
            score: scores.score - 1,
          },
        })
      }
    } else {
      if (answer.isCorrect === true) {
        // scores.questionIds.push(questionId)
        // scores.score++
        // console.log(scores.questionIds.push(questionId))
        // console.log(scores.score++)
        scores.questionIds.push(questionId)
        dispatch({
          type: CONSTANT.CALCULATE_SCORE_UPDATE,
          payload: {
            questionIds: scores.questionIds,
            score: scores.score + 1,
          },
        })
      }
    }
    // console.log(scores)
  }

  const checkTransform = (e, question) => {
    if (scores.questionIds.find((element) => element === question._id)) {
      if (e.target.value.trim() !== question.answer) {
        // scores.questionIds = scores.questionIds.filter(
        //   (element) => element !== question._id
        // )
        // scores.score -= 2

        dispatch({
          type: CONSTANT.CALCULATE_SCORE_UPDATE,
          payload: {
            questionIds: scores.questionIds.filter(
              (element) => element !== question._id
            ),
            score: scores.score - 2,
          },
        })
      }
    } else {
      if (e.target.value.trim() === question.answer) {
        scores.questionIds.push(question._id)
        dispatch({
          type: CONSTANT.CALCULATE_SCORE_UPDATE,
          payload: {
            questionIds: scores.questionIds,
            score: scores.score + 2,
          },
        })
      }
    }
    // console.log(scores)
  }

  const submitHandler = () => {
    window.alert('Scores: ' + scores.score + '/40')
    dispatch({ type: CONSTANT.CALCULATE_SCORE_RESET })
  }

  return (
    <>
      {exam && (
        <>
          <h1 className='text-center m-3'>PART 1 - Exam {exam.title}</h1>
          <div className='row mt-3'>
            <div className='col-md-3 border'>
              <Aside type={type} />
            </div>
            <div className='col-md-9 border'>
              <div className='my-2'>
                <strong>1. Vocabulary & Grammar</strong>
              </div>

              <div className='my-2' id='grammar'>
                <strong>{exam.questions.grammar.require}</strong>
              </div>
              {exam.questions.grammar.grammars.map((question) => (
                <Quiz
                  key={question._id}
                  question={question}
                  number={(++grammar).toString()}
                  type='grammar'
                  exam='true'
                  checkQuiz={checkQuiz}
                />
              ))}
              <div className='my-2' id='signs'>
                <strong>{exam.questions.signs.require}</strong>
              </div>
              {exam.questions.signs.signs.map((question) => (
                <Quiz
                  key={question._id}
                  question={question}
                  number={(++signs).toString()}
                  type='signs'
                  exam='true'
                  checkQuiz={checkQuiz}
                />
              ))}

              <div className='my-2' id='reading'>
                <strong>2. Reading Comprehension</strong>
              </div>

              <div className='my-2'>
                <strong>{exam.questions.reading.require}</strong>
              </div>
              <div
                className='my-2'
                dangerouslySetInnerHTML={{
                  __html: exam.questions.reading.readings[0].paragrap,
                }}
              ></div>
              {exam.questions.reading.readings[0].questions.map((question) => (
                <Quiz
                  key={question._id}
                  question={question}
                  number={(++reading).toString()}
                  type='reading'
                  exam='true'
                  checkQuiz={checkQuiz}
                />
              ))}

              <div className='my-2' id='clozetext'>
                <strong>{exam.questions.clozetext.require}</strong>
              </div>
              <div
                className='my-2'
                dangerouslySetInnerHTML={{
                  __html: exam.questions.clozetext.clozetexts[0].paragrap,
                }}
              ></div>
              {exam.questions.clozetext.clozetexts[0].questions.map(
                (question) => (
                  <Quiz
                    key={question._id}
                    question={question}
                    number={(++clozetext).toString()}
                    type='clozetext'
                    exam='true'
                    checkQuiz={checkQuiz}
                  />
                )
              )}

              <div className='my-2' id='transform'>
                <strong>3. Transform Comprehension</strong>
              </div>

              <div className='my-2'>
                <strong>{exam.questions.transform.require}</strong>
              </div>
              {exam.questions.transform.transforms.map((question) => (
                <div key={question._id} className='row mb-3'>
                  <div>
                    {++transform} - {question.question}
                  </div>
                  <div className='row'>
                    <div className='d-flex'>
                      <strong className='lh-lg'>
                        <i className='fa fa-arrow-right'></i> {question.prefix}
                      </strong>
                      <input
                        className='input-focus rounded bg-secondary flex-grow-1 ms-2'
                        id={question._id}
                        onChange={(e) => checkTransform(e, question)}
                      ></input>
                    </div>
                  </div>
                </div>
              ))}
              <div className='my-4 text-center' id='submit'>
                <button className='btn btn-primary' onClick={submitHandler}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Part1Screen
