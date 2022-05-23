import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends React.Component {
    render(): React.ReactNode {
        return (
            <Navbar sticky="top" bg="primary" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Buddy Airline</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/flights">
                                <Nav.Link>Flights</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/bookings">
                                <Nav.Link>Bookings</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Passengers">
                                <Nav.Link>Passengers</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationBar;