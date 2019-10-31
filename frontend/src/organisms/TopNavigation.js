import React from 'react';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/index.css';
import {Navbar, Nav, Button, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { useAuth } from '../utils/auth';
import {useHistory} from "react-router";

function TopNavigationBase(props) {
	const { location } = props;
	const { user, signout } = useAuth();
	const history = useHistory();
	return (
		<Navbar id="navigation" sticky="top" expand="md">
			<Navbar.Brand href="/">
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<FontAwesomeIcon  className="d-inline d-md-none white mr-3 searchButton" icon={Icons.faSearch} size="1x" />
			<Button className="d-inline d-md-none loginButtonMobile" variant="primary" href="/login"><FontAwesomeIcon icon={Icons.faUser} size="1x" /></Button>
			<Navbar.Collapse id="basic-navbar-nav">
				<ul className="m-auto">
					<Nav activeKey={location.pathname}>
					<li><Nav.Link href="/teams">Týmy</Nav.Link></li>
					<li><Nav.Link href="/leagues" >Soutěže</Nav.Link></li>
					<li><Nav.Link href="/matches">Zápasy</Nav.Link></li>
					<li><Nav.Link href="/statistics">Statistiky</Nav.Link></li>
					<li><Nav.Link href="/aboutus">O nás</Nav.Link></li>
					<li><Nav.Link href="/contact">Kontakt</Nav.Link></li>
					</Nav>
				</ul>

				<div className="signUp d-none d-md-inline-block">
					<FontAwesomeIcon  className="hidden-lg mr-4 white" icon={Icons.faSearch} size="1x" />
					{user ? (
						<>
							<a href={`/administration/profile`} >
								{user.email}
							</a>
							<Button className="btn" variant="primary" type="button"
									onClick={() => {
										signout();
										history.replace('/login');
										window.location.reload();
									}}>
								Odhlásit se
							</Button>
						</>
					) : (
						<Button className="d-none d-lg-inline-block d-xl-inline-block" variant="primary" href="/login">
							<FontAwesomeIcon  className="mr-2" icon={Icons.faUser} size="1x" />
							Přihlásit se
						</Button>
					)}
				</div>
			</Navbar.Collapse>
		</Navbar>
	);
}

export const TopNavigation = withRouter(TopNavigationBase);