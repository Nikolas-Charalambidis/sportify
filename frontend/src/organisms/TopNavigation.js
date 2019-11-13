import React, {useState} from 'react';

import {Navbar, Button} from "react-bootstrap";
import {NavLink as Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {useAuth} from '../utils/auth';
import {useHistory} from "react-router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"


function TopNavigationBase() {
    const {user, signout} = useAuth();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => (window.innerWidth <= 765) ? setIsOpen(!isOpen) : setIsOpen(true);

    return (


        <Navbar id="navigation" sticky="top" expand="md">
            <Link to="/">
                <Navbar.Brand/>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle}/>

            {user ? (
                <>
                    <div className="profileNavPanel">
                        <Link to="/administration/profile">
                            <Button className="btn d-inline d-md-none  mr-2" variant="primary" type="button">
                                <FontAwesomeIcon icon={Icons.faUserCircle} size="1x"/>
                            </Button>
                        </Link>
                        <Button className="btn d-inline d-md-none " variant="secondary" type="button"
                                onClick={() => {
                                    signout();
                                    history.push('/login');
                                }}>
                            <FontAwesomeIcon icon={Icons.faSignOutAlt} size="1x"/>
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="profileNavPanel">
                        <Link className="loginIcon" to="/login">
                            <Button className="d-inline d-md-none loginButtonMobile" variant="primary">
                                <FontAwesomeIcon icon={Icons.faSignInAlt} size="1x"/>
                            </Button>
                        </Link>
                    </div>
                </>
            )}
            <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
                <ul className="m-auto">
                    <li><Link className="nav-link" to="/teams" activeClassName="active" onClick={toggle}>Týmy</Link></li>
                    <li><Link className="nav-link" to="/leagues" activeClassName="active" onClick={toggle}>Soutěže</Link></li>
                    <li><Link className="nav-link" to="/matches" activeClassName="active" onClick={toggle}>Zápasy</Link></li>
                    <li><Link className="nav-link" to="/statistics" activeClassName="active" onClick={toggle}>Statistiky</Link></li>
                    <li><Link className="nav-link" to="/aboutus" activeClassName="active" onClick={toggle}>O nás</Link></li>
                    <li><Link className="nav-link" to="/contact" activeClassName="active" onClick={toggle}>Kontakt</Link></li>
                </ul>

                <div className="signUp d-none d-md-inline-block">
                    {user ? (
                        <>
                            <Link to="/administration">
                                <Button className="btn mr-2" variant="primary" type="button">
                                    <FontAwesomeIcon icon={Icons.faUserCircle} size="1x"/>
                                </Button>
                            </Link>
                            <Button className="btn" variant="secondary" type="button"
                                    onClick={() => {
                                        signout();
                                        history.push('/login');
                                    }}>
                                <FontAwesomeIcon icon={Icons.faSignOutAlt} size="1x"/>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="primary">
                                    <FontAwesomeIcon className="mr-0 mr-lg-2" icon={Icons.faSignInAlt} size="1x"/>
                                    <span className="d-none d-lg-inline ">Přihlásit se</span>
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export const TopNavigation = withRouter(TopNavigationBase);