import React, {useState} from 'react';

import {Heading, MainSection} from '../../atoms';
import {TopNavigation} from '../../organisms/TopNavigation';
import {Form, Button, Row, Col, Breadcrumb} from "react-bootstrap";
import {useHistory} from "react-router";
import {useAuth} from "../../utils/auth";
import {Footer} from "../../organisms/Footer";

export function Register() {
    const history = useHistory();
    const { user } = useAuth();

    if(user) {
        history.replace('/');
    }

    const [validated, setValidated] = useState(false);
    const [givenName, setGivenName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("")

    const onLogin = event => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        form.checkValidity();
        setValidated(true);
    };

    return (
        <div>
            <TopNavigation/>
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item active>Registrace</Breadcrumb.Item>
                </Breadcrumb>
                <Heading className="pageHeading mt-4">Registrace</Heading>
                <p className="text-center mb-5">Po dokončení registrace Vám bude zaslán potvrzovací e-mail. <br/>Po
                    potvrzení tohoto e-mailu se budete moci přihlásit do Vašeho vytvořeného účtu.</p>
                <Form validated={validated}>
                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="givenName">
                                <Form.Label>Jméno</Form.Label>
                                <Form.Control required type="text" name="givenName" value={givenName}
                                              onChange={e => setGivenName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">Vyplňte Vaše jméno.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Příjmení</Form.Label>
                                <Form.Control required type="text" name="lastName" value={lastName}
                                              onChange={e => setLastName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">Vyplňte Vaše příjmení.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control required type="email" name="email" value={email}
                                              onChange={e => setEmail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">Vyplňte Vaši e-mailovou
                                    adresu.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="nickname">
                                <Form.Label>Přezdívka</Form.Label>
                                <Form.Control required type="text" name="nickname" value={nickname}
                                              onChange={e => setNickname(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">Vyplňte Vaši přezdívku.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="password">
                                <Form.Label>Heslo</Form.Label>
                                <Form.Control minLength="6" required type="password" name="password" value={password}
                                              onChange={e => setPassword(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">Heslo musí obsahovat alespoň 6
                                    znaků.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="passwordValidation">
                                <Form.Label>Heslo znovu</Form.Label>
                                <Form.Control
                                    isValid={password === passwordValidation && passwordValidation.length >= 6}
                                    isInvalid={password !== passwordValidation}
                                    required type="password" name="passwordValidation" value={passwordValidation}
                                    onChange={e => setPasswordValidation(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">Hesla se musí shodovat.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xl={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                            <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="button"
                                    onClick={onLogin}>Vytvořit účet</Button>
                        </Col>
                    </Row>
                </Form>
            </MainSection>
            <Footer/>
        </div>
    );
}