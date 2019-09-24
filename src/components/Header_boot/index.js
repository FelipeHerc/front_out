import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';

class Header extends Component {
  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Navbar bg="primary" variant="dark" onClick={() => history.replace('/')}>
          <img
          src="http://localhost:3000/icons/feather.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
          />
          <Navbar.Brand className="ml-2 mr-2">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
      </React.Fragment>
    );
  }
};

Header.propTypes = {
  history: object,
};

export default withRouter(Header);
