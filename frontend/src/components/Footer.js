import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Row className='bg-primary text-center'>
        <Col className='col-12 pt-4 pb-1'>
          <h3 className='m-0'>B1 - HUTECH</h3>
        </Col>
        <Col className='col-12 pb-4 text-light'>Copyright &copy; MyShop</Col>
      </Row>
    </footer>
  )
}

export default Footer
