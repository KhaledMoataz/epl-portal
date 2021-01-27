import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Context } from '../Store';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    a,
    .navbar-brand,
    .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
`;

const NavigationBar = () => {
    const [, dispatch] = useContext(Context);
    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">EPL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link>
                                <Link
                                    to="/"
                                    onClick={() =>
                                        dispatch({ type: 'MY_MATCHES_ONLY', payload: false })
                                    }>
                                    Home
                                </Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link
                                    to="/"
                                    onClick={() =>
                                        dispatch({ type: 'MY_MATCHES_ONLY', payload: true })
                                    }>
                                    My Reservations
                                </Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/reservation">Reservation</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/signup">Signup</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/login">Login</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/profile">Profile</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
};

export default NavigationBar;
