import React from 'react';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container} from "react-bootstrap";

function TopNavigationBase() {
	return (
		<Navbar sticky="top" bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">Sportify</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="m-auto">
						<Nav.Link>Týmy</Nav.Link>
						<Nav.Link href="/souteze">Soutěže</Nav.Link>
						<Nav.Link href="/zapasy">Zápasy</Nav.Link>
						<Nav.Link href="/statistiky">Statistiky</Nav.Link>
					</Nav>
					<Nav.Link href="/login">Přihlásit se</Nav.Link>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export const TopNavigation = withRouter(TopNavigationBase);
