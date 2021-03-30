import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";


export const Header1 = () => {
  return (
    <nav>
      <Navbar bg='transparent' variant='dark'>
        <Navbar.Brand href='/'>ChatBot</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'> <Link to='/contact'>
          Contact Us
        </Link></Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>

  );
};
