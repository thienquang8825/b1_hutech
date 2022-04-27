import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { UserAction } from '../actions/user.action'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userSignIn } = userLogin

  const logoutHandler = () => {
    dispatch(UserAction.logout())
  }

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavDropdown title='Reading' id='basic-nav-dropdown'>
              <LinkContainer to='/grammar'>
                <NavDropdown.Item>Vocabulary & Grammar</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href='#action/3.2'>Signs</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>
                Reading Comprehension
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.4'>Cloze text</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Writing' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>
                Sentence Transformation
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>
                Writing emails, letter, essays
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#listening'>Listening</Nav.Link>
            <Nav.Link href='#speaking'>Speaking</Nav.Link>
            <NavDropdown title='Mock Test' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>
                Reading - Writing (90 minutes)
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>
                Listening (30 minutes)
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>
                Speaking (15 minutes)
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className='ms-auto'>
            {userSignIn ? (
              <NavDropdown title={userSignIn.name}>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fa fa-sign-in'></i> Login
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                  <Nav.Link>
                    <i className='fa fa-user-plus'></i> Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
