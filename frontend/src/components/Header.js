import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
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
            <Nav.Link href='#login'>
              <i className='fa fa-user'></i> Login
            </Nav.Link>
            <Nav.Link href='#register'>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
