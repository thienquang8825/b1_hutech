import React from 'react'
import { Link } from 'react-router-dom'

const Navigate = ({ page, pages, type }) => {
  return (
    <div className='row justify-content-between mb-4'>
      <Link
        to={page === 1 ? `/${type}/page/${page}` : `/${type}/page/${page - 1}`}
        className='col-sm-2 col-md-1 ms-5'
      >
        <button className='btn btn-primary w-100' disabled={page === 1}>
          <i className='fa fa-arrow-left'></i>
        </button>
      </Link>
      <Link
        to={
          page === pages ? `/${type}/page/${page}` : `/${type}/page/${page + 1}`
        }
        className='col-sm-2 col-md-1 me-5'
      >
        <button className='btn btn-primary w-100' disabled={page === pages}>
          <i className='fa fa-arrow-right'></i>
        </button>
      </Link>
    </div>
  )
}

export default Navigate
