import React from 'react';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/index.css';
import {Navbar, Nav, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"

function TopNavigationBase() {
	return (
		<Navbar id="navigation" sticky="top" expand="md">
			<Navbar.Brand href="/">
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<FontAwesomeIcon  className="d-inline d-md-none white mr-3 searchButton" icon={Icons.faSearch} size="1x" />
			<Button className="d-inline d-md-none loginButtonMobile" variant="primary" href="/login"><FontAwesomeIcon icon={Icons.faUser} size="1x" /></Button>
			<Navbar.Collapse id="basic-navbar-nav">
				<ul className="m-auto">
					<li><Nav.Link href="/teams">Týmy</Nav.Link></li>
					<li><Nav.Link href="/souteze">Soutěže</Nav.Link></li>
					<li><Nav.Link href="/zapasy">Zápasy</Nav.Link></li>
					<li><Nav.Link href="/statistiky">Statistiky</Nav.Link></li>
					<li><Nav.Link href="/onas">O nás</Nav.Link></li>
					<li><Nav.Link href="/kontakt">Kontakt</Nav.Link></li>
				</ul>

				<div className="signUp d-none d-md-inline-block">
					<FontAwesomeIcon  className="hidden-lg mr-4 white" icon={Icons.faSearch} size="1x" />
					<Button className="d-none d-lg-inline-block d-xl-inline-block" variant="primary" href="/login"><FontAwesomeIcon  className="mr-2" icon={Icons.faUser} size="1x" />Přihlásit se</Button>
					<Button className="d-inline-block d-lg-none" variant="primary" href="/login"><FontAwesomeIcon icon={Icons.faUser} size="1x" /></Button>
				</div>
			</Navbar.Collapse>
		</Navbar>
	);
}

export const TopNavigation = withRouter(TopNavigationBase);