import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserAction } from '../actions/user.action'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userSignUp } = userRegister

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '/'

  useEffect(() => {
    if (userSignUp) {
      redirect === '/' ? navigate(redirect) : navigate(`/${redirect}`)
    }
  }, [navigate, redirect, userSignUp])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Confirm password wrong!')
    } else {
      dispatch(UserAction.register(name, email, password))
    }
  }

  return (
    <div className='container-fluid pt-5'>
      <div className='row px-xl-5 justify-content-center'>
        <div className='col-lg-4 col-md-8'>
          <div className='text-center mb-4'>
            <h2 className='section-title px-5'>
              <span className='px-2'>---Sign Up---</span>
            </h2>
          </div>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className='form-group my-3'>
              <label>Name</label>
              <input
                className='form-control bg-secondary mt-2'
                type='text'
                value={name}
                placeholder='Enter name...'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group my-3'>
              <label>Email</label>
              <input
                className='form-control bg-secondary mt-2'
                type='text'
                value={email}
                placeholder='Enter email...'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group my-3'>
              <label>Password</label>
              <input
                className='form-control bg-secondary mt-2'
                type='password'
                value={password}
                placeholder='Enter password...'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group my-3'>
              <label>Confrim password</label>
              <input
                className='form-control bg-secondary mt-2 '
                type='password'
                value={confirmPassword}
                placeholder='Confirm password...'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='form-group my-3'>
              <button className='btn btn-primary py-2 px-4' type='submit'>
                Sign up
              </button>
            </div>
            <div className='form-group'>
              Do you have an account?{' '}
              <Link
                to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
