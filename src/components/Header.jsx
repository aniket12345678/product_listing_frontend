import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to={'/home'} className='nav-link'>Home</Link>
                    <Link to={'/'} className='nav-link'>Product</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
