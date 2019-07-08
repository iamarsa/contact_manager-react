import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
const NavBar = props => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">Contact Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Button variant="danger" onClick={props.add}>
              Add contact
            </Button>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search by name "
              className="mr-sm-2"
              onChange={event => props.search(event, props.contacts)}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
