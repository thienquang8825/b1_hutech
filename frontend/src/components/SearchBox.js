import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBox = ({ type }) => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const searchHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/admin/${type}/search/${keyword}`)
    } else {
      navigate(`/admin/${type}`)
    }
  }

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      searchHandler(e)
    }
  }

  return (
    <div className='col-lg-6 col-6 text-left my-3'>
      <form action=''>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder={
              type === 'reading' || type === 'clozetext' || type === 'listening'
                ? 'Search by title...'
                : 'Search by question...'
            }
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={onKeyPressHandler}
          />
          <div className='input-group-append' onClick={searchHandler}>
            <span className='input-group-text bg-transparent text-primary d-block'>
              <i className='fa fa-search'></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
