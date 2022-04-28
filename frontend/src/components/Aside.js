import React from 'react'
import { Link } from 'react-router-dom'

const Aside = ({
  show,
  setClear,
  setShow,
  page,
  pages,
  quantity,
  pageSize,
}) => {
  return (
    <div className='row justify-content-evenly border fixed'>
      <h5 className='mt-3 text-center'>Functions</h5>
      <button
        className='btn btn-primary col-sm-5 my-2'
        type='button'
        onClick={() => {
          setClear(true)
          setShow(!show)
        }}
      >
        {show ? 'Hidden' : 'Show'}
      </button>
      <button
        className='btn btn-primary col-sm-5 my-2'
        type='button'
        disabled={show}
        onClick={() => setClear(true)}
      >
        Clear
      </button>
      <hr></hr>
      <h5 className='text-center'>List Questions</h5>
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
            {(x + 1) * pageSize > quantity ? quantity : (x + 1) * pageSize}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Aside
