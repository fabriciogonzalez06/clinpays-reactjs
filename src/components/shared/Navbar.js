import React from "react";
import {Navbar,Container} from 'react-bootstrap';
export const AppNavbar = () => {
  return (
    <Navbar  expand="lg" variant="dark" bg="dark" className="mb-4" >
      <Container>
        <Navbar.Brand >PhoneBook</Navbar.Brand>
      </Container>
    </Navbar>
  );
};


export default AppNavbar;
