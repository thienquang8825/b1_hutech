import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <div className='col-12 pb-1 mt-4'>
        <nav aria-label='Page navigation'>
          <ul className='pagination justify-content-center mb-3'>
            {[...Array(pages).keys()].map((x) => (
              <li
                key={x + 1}
                className={`page-item ${x + 1 === page && 'active'}`}
              >
                <Link
                  className='page-link'
                  key={x + 1}
                  to={`/admin/grammar/page/${x + 1}`}
                >
                  {x + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  )
}

export default Paginate
