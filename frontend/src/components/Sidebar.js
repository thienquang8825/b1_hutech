import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Sidebar = () => {
  return (
    <Nav className='flex-column bg-secondary rounded'>
      <NavDropdown title='Reading' id='basic-nav-dropdown'>
        <LinkContainer to='/admin/grammar'>
          <NavDropdown.Item>Vocabulary & Grammar</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/signs'>
          <NavDropdown.Item>Signs</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/reading'>
          <NavDropdown.Item>Reading Comprehension</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/clozetext'>
          <NavDropdown.Item>Cloze text</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      <NavDropdown title='Writing' id='basic-nav-dropdown'>
        <LinkContainer to='/admin/transform'>
          <NavDropdown.Item>Sentence Transformation</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/writing'>
          <NavDropdown.Item>Writing emails, letter, essays</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      <LinkContainer to='/admin/listening'>
        <Nav.Link>Listening</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/speaking'>
        <Nav.Link>Speaking</Nav.Link>
      </LinkContainer>
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
