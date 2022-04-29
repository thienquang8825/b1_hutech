import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Sidebar = () => {
  return (
    <Nav className='flex-column bg-secondary rounded'>
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
  )
}

export default Sidebar
