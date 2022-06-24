import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { UserAction } from '../actions/user.action'
import { Part1Action } from '../actions/part1.action'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userSignIn } = userLogin

  const part1GetList = useSelector((state) => state.part1GetList)
  const { exams } = part1GetList

  const logoutHandler = () => {
    dispatch(UserAction.logout())

    navigate('/')
  }

  const getListPart1 = () => {
    if (exams.length === 0) dispatch(Part1Action.getList())
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
              <LinkContainer to='/signs'>
                <NavDropdown.Item>Signs</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/reading'>
                <NavDropdown.Item>Reading Comprehension</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/clozetext'>
                <NavDropdown.Item>Cloze text</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title='Writing' id='basic-nav-dropdown'>
              <LinkContainer to='/transform'>
                <NavDropdown.Item>Sentence Transformation</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/writing'>
                <NavDropdown.Item>
                  Writing emails, letter, essays
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to='/listening'>
              <Nav.Link> Listening</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/speaking'>
              <Nav.Link> Speaking</Nav.Link>
            </LinkContainer>
            {/* <NavDropdown title='Mock Test' id='basic-nav-dropdown'>
              <LinkContainer to='/part1'>
                <NavDropdown.Item>
                  Reading - Writing (90 minutes)
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={() => navigate('/')}>
                Listening (30 minutes)
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>
                Speaking (15 minutes)
              </NavDropdown.Item>
            </NavDropdown> */}

            {userSignIn && (
              <NavDropdown
                title='Part 1'
                id='basic-nav-dropdown'
                onClick={getListPart1}
              >
                {exams &&
                  exams.map((exam) => (
                    <LinkContainer key={exam._id} to={`/part1/${exam._id}`}>
                      <NavDropdown.Item>Exam {exam.title}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
              </NavDropdown>
            )}
          </Nav>

          <Nav className='ms-auto'>
            {userSignIn ? (
              <NavDropdown title={userSignIn.name}>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/history'>
                  <NavDropdown.Item>History</NavDropdown.Item>
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

            {userSignIn && userSignIn.isAdmin && (
              <LinkContainer to='/admin/grammar'>
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
